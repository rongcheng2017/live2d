/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import 'whatwg-fetch';

import { CubismDefaultParameterId } from '@framework/cubismdefaultparameterid';
import { CubismModelSettingJson } from '@framework/cubismmodelsettingjson';
import {
  BreathParameterData,
  CubismBreath
} from '@framework/effect/cubismbreath';
import { CubismEyeBlink } from '@framework/effect/cubismeyeblink';
import { ICubismModelSetting } from '@framework/icubismmodelsetting';
import { CubismIdHandle } from '@framework/id/cubismid';
import { CubismFramework } from '@framework/live2dcubismframework';
import { CubismMatrix44 } from '@framework/math/cubismmatrix44';
import { CubismUserModel } from '@framework/model/cubismusermodel';
import {
  ACubismMotion,
  FinishedMotionCallback
} from '@framework/motion/acubismmotion';
import { CubismMotion } from '@framework/motion/cubismmotion';
import {
  CubismMotionQueueEntryHandle,
  InvalidMotionQueueEntryHandleValue
} from '@framework/motion/cubismmotionqueuemanager';
import { csmMap } from '@framework/type/csmmap';
import { csmRect } from '@framework/type/csmrectf';
import { csmString } from '@framework/type/csmstring';
import { csmVector } from '@framework/type/csmvector';
import {
  CSM_ASSERT,
  CubismLogError,
  CubismLogInfo
} from '@framework/utils/cubismdebug';

import * as LAppDefine from './lappdefine';
import { canvas, frameBuffer, gl, LAppDelegate } from './lappdelegate';
import { LAppPal } from './lapppal';
import { TextureInfo } from './lapptexturemanager';
import { LAppWavFileHandler } from './lappwavfilehandler';
import { CubismMoc } from '@framework/model/cubismmoc';

enum LoadStep {
  LoadAssets,
  LoadModel,
  WaitLoadModel,
  LoadExpression,
  WaitLoadExpression,
  LoadPhysics,
  WaitLoadPhysics,
  LoadPose,
  WaitLoadPose,
  SetupEyeBlink,
  SetupBreath,
  LoadUserData,
  WaitLoadUserData,
  SetupEyeBlinkIds,
  SetupLipSyncIds,
  SetupLayout,
  LoadMotion,
  WaitLoadMotion,
  CompleteInitialize,
  CompleteSetupModel,
  LoadTexture,
  WaitLoadTexture,
  CompleteSetup
}

/**
 * ユーザーが実際に使用するモデルの実装クラス<br>
 * モデル生成、機能コンポーネント生成、更新処理とレンダリングの呼び出しを行う。
 */
export class LAppModel extends CubismUserModel {
 
  /**
 * 根据给定的目录和文件名加载模型
 * @param dir 目录路径
 * @param fileName 文件名
 */
public loadAssets(dir: string, fileName: string): void {
  this._modelHomeDir = dir;

  fetch(`${this._modelHomeDir}${fileName}`)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => {
      const setting: ICubismModelSetting = new CubismModelSettingJson(
        arrayBuffer,
        arrayBuffer.byteLength
      );

      // 更新状态
      this._state = LoadStep.LoadModel;

      // 保存结果
      this.setupModel(setting);
    });
}

/**
 * 根据model3.json文件生成模型。
 * 根据model3.json的描述生成模型，运动，物理计算等组件。
 *
 * @param setting ICubismModelSetting 实例
 */
private setupModel(setting: ICubismModelSetting): void {
  this._updating = true;
  this._initialized = false;

  this._modelSetting = setting;

  // CubismModel
  if (this._modelSetting.getModelFileName() != '') {
    const modelFileName = this._modelSetting.getModelFileName();

    fetch(`${this._modelHomeDir}${modelFileName}`)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        this.loadModel(arrayBuffer, this._mocConsistency);
        this._state = LoadStep.LoadExpression;

        // 回调函数
        loadCubismExpression();
      });

    this._state = LoadStep.WaitLoadModel;
  } else {
    LAppPal.printMessage('模型数据不存在。');
  }

  // 表情
  const loadCubismExpression = (): void => {
    if (this._modelSetting.getExpressionCount() > 0) {
      const count: number = this._modelSetting.getExpressionCount();

      for (let i = 0; i < count; i++) {
        const expressionName = this._modelSetting.getExpressionName(i);
        const expressionFileName =
          this._modelSetting.getExpressionFileName(i);

        fetch(`${this._modelHomeDir}${expressionFileName}`)
          .then(response => response.arrayBuffer())
          .then(arrayBuffer => {
            const motion: ACubismMotion = this.loadExpression(
              arrayBuffer,
              arrayBuffer.byteLength,
              expressionName
            );

            if (this._expressions.getValue(expressionName) != null) {
              ACubismMotion.delete(
                this._expressions.getValue(expressionName)
              );
              this._expressions.setValue(expressionName, null);
            }

            this._expressions.setValue(expressionName, motion);

            this._expressionCount++;

            if (this._expressionCount >= count) {
              this._state = LoadStep.LoadPhysics;

              // 回调函数
              loadCubismPhysics();
            }
          });
      }
      this._state = LoadStep.WaitLoadExpression;
    } else {
      this._state = LoadStep.LoadPhysics;

      // 回调函数
      loadCubismPhysics();
    }
  };

  // 物理
  const loadCubismPhysics = (): void => {
    if (this._modelSetting.getPhysicsFileName() != '') {
      const physicsFileName = this._modelSetting.getPhysicsFileName();

      fetch(`${this._modelHomeDir}${physicsFileName}`)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
          this.loadPhysics(arrayBuffer, arrayBuffer.byteLength);

          this._state = LoadStep.LoadPose;

          // 回调函数
          loadCubismPose();
        });

      this._state = LoadStep.WaitLoadPhysics;
    } else {
      this._state = LoadStep.LoadPose;

      // 回调函数
      loadCubismPose();
    }
  };

  // 姿势
  const loadCubismPose = (): void => {
    if (this._modelSetting.getPoseFileName() != '') {
      const poseFileName = this._modelSetting.getPoseFileName();

      fetch(`${this._modelHomeDir}${poseFileName}`)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
          this.loadPose(arrayBuffer, arrayBuffer.byteLength);

          this._state = LoadStep.SetupEyeBlink;

          // 回调函数
          setupEyeBlink();
        });

      this._state = LoadStep.WaitLoadPose;
    } else {
      this._state = LoadStep.SetupEyeBlink;

      // 回调函数
      setupEyeBlink();
    }
  };

  // 眨眼
  const setupEyeBlink = (): void => {
    if (this._modelSetting.getEyeBlinkParameterCount() > 0) {
      this._eyeBlink = CubismEyeBlink.create(this._modelSetting);
      this._state = LoadStep.SetupBreath;
    }

    // 回调函数
    setupBreath();
  };

  // 呼吸
  const setupBreath = (): void => {
    this._breath = CubismBreath.create();

    const breathParameters: csmVector<BreathParameterData> = new csmVector();
    breathParameters.pushBack(
      new BreathParameterData(this._idParamAngleX, 0.0, 15.0, 6.5345, 0.5)
    );
    breathParameters.pushBack(
      new BreathParameterData(this._idParamAngleY, 0.0, 8.0, 3.5345, 0.5)
    );
    breathParameters.pushBack(
      new BreathParameterData(this._idParamAngleZ, 0.0, 10.0, 5.5345, 0.5)
    );
    breathParameters.pushBack(
      new BreathParameterData(this._idParamBodyAngleX, 0.0, 4.0, 15.5345, 0.5)
    );
    breathParameters.pushBack(
      new BreathParameterData(
        CubismFramework.getIdManager().getId(
          CubismDefaultParameterId.ParamBreath
        ),
        0.5,
        0.5,
        3.2345,
        1
      )
    );

    this._breath.setParameters(breathParameters);
    this._state = LoadStep.LoadUserData;

    // 回调函数
    loadUserData();
  };

  // 用户数据
  const loadUserData = (): void => {
    if (this._modelSetting.getUserDataFile() != '') {
      const userDataFile = this._modelSetting.getUserDataFile();

      fetch(`${this._modelHomeDir}${userDataFile}`)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
          this.loadUserData(arrayBuffer, arrayBuffer.byteLength);

          this._state = LoadStep.SetupEyeBlinkIds;

          // 回调函数
          setupEyeBlinkIds();
        });

      this._state = LoadStep.WaitLoadUserData;
    } else {
      this._state = LoadStep.SetupEyeBlinkIds;

      // 回调函数
      setupEyeBlinkIds();
    }
  };

  // 眨眼标识
  const setupEyeBlinkIds = (): void => {
    const eyeBlinkIdCount: number =
      this._modelSetting.getEyeBlinkParameterCount();

    for (let i = 0; i < eyeBlinkIdCount; ++i) {
      this._eyeBlinkIds.pushBack(
        this._modelSetting.getEyeBlinkParameterId(i)
      );
    }

    this._state = LoadStep.SetupLipSyncIds;

    // 回调函数
    setupLipSyncIds();
  };

  // 唇同步标识
  const setupLipSyncIds = (): void => {
    const lipSyncIdCount = this._modelSetting.getLipSyncParameterCount();

    for (let i = 0; i < lipSyncIdCount; ++i) {
      this._lipSyncIds.pushBack(this._modelSetting.getLipSyncParameterId(i));
    }
    this._state = LoadStep.SetupLayout;

    // 回调函数
    setupLayout();
  };

  // 布局
  const setupLayout = (): void => {
    const layout: csmMap<string, number> = new csmMap<string, number>();

    if (this._modelSetting == null || this._modelMatrix == null) {
      CubismLogError('设置布局失败。');
      return;
    }

    this._modelSetting.getLayoutMap(layout);
    this._modelMatrix.setupFromLayout(layout);
    this._state = LoadStep.LoadMotion;

    // 回调函数
    loadCubismMotion();
  };

  // 运动
  const loadCubismMotion = (): void => {
    this._state = LoadStep.WaitLoadMotion;
    this._model.saveParameters();
    this._allMotionCount = 0;
    this._motionCount = 0;
    const group: string[] = [];

    const motionGroupCount: number = this._modelSetting.getMotionGroupCount();

    // 计算运动的总数
    for (let i = 0; i < motionGroupCount; i++) {
      group[i] = this._modelSetting.getMotionGroupName(i);
      this._allMotionCount += this._modelSetting.getMotionCount(group[i]);
    }

    // 加载运动
    for (let i = 0; i < motionGroupCount; i++) {
      this.preLoadMotionGroup(group[i]);
    }

    // 如果没有运动
    if (motionGroupCount == 0) {
      this._state = LoadStep.LoadTexture;

      // 停止所有运动
      this._motionManager.stopAllMotions();

      this._updating = false;
      this._initialized = true;

      this.createRenderer();
      this.setupTextures();
      this.getRenderer().startUp(gl);
    }
  };
}

/**
 * 将纹理加载到纹理单元
 */
private setupTextures(): void {
  // 为了在iPhone上提高Alpha质量，Typescript中采用premultipliedAlpha
  const usePremultiply = true;

  if (this._state == LoadStep.LoadTexture) {
    // 纹理数量
    const textureCount: number = this._modelSetting.getTextureCount();

    for (
      let modelTextureNumber = 0;
      modelTextureNumber < textureCount;
      modelTextureNumber++
    ) {
      // 如果纹理名称为空，则跳过加载和绑定处理
      if (this._modelSetting.getTextureFileName(modelTextureNumber) == '') {
        console.log('getTextureFileName 为空');
        continue;
      }

      // 纹理路径
      let texturePath =
        this._modelSetting.getTextureFileName(modelTextureNumber);
      texturePath = this._modelHomeDir + texturePath;

      // 加载完成后调用回调函数
      const onLoad = (textureInfo: TextureInfo): void => {
        this.getRenderer().bindTexture(modelTextureNumber, textureInfo.id);

        this._textureCount++;

        if (this._textureCount >= textureCount) {
          // 加载完成
          this._state = LoadStep.CompleteSetup;
        }
      };

      // 读取
      LAppDelegate.getInstance()
        .getTextureManager()
        .createTextureFromPngFile(texturePath, usePremultiply, onLoad);
      this.getRenderer().setIsPremultipliedAlpha(usePremultiply);
    }

    this._state = LoadStep.WaitLoadTexture;
  }
}

 /**
 * 重新加载渲染器
 */
public reloadRenderer(): void {
  this.deleteRenderer(); // 删除渲染器
  this.createRenderer(); // 创建渲染器
  this.setupTextures(); // 设置纹理
}

/**
 * 更新函数
 */
public update(): void {
  if (this._state != LoadStep.CompleteSetup) return; // 如果状态不是CompleteSetup，直接返回

  const deltaTimeSeconds: number = LAppPal.getDeltaTime(); // 获取时间增量
  this._userTimeSeconds += deltaTimeSeconds; // 用户时间增量

  this._dragManager.update(deltaTimeSeconds); // 更新拖拽管理器
  this._dragX = this._dragManager.getX(); // 获取X轴拖拽值
  this._dragY = this._dragManager.getY(); // 获取Y轴拖拽值

  // 用于标记是否有通过动作更新参数
  let motionUpdated = false;

  //--------------------------------------------------------------------------
  this._model.loadParameters(); // 加载上一次保存的参数状态
  if (this._motionManager.isFinished()) {
    // 如果没有正在播放的动作，从待机动作中随机播放一个
    this.startRandomMotion(
      LAppDefine.MotionGroupIdle,
      LAppDefine.PriorityIdle
    );
  } else {
    // 更新正在播放的动作
    motionUpdated = this._motionManager.updateMotion(
      this._model,
      deltaTimeSeconds
    );
  }
  this._model.saveParameters(); // 保存参数状态
  //--------------------------------------------------------------------------

  // 处理眨眼动作
  if (!motionUpdated) {
    if (this._eyeBlink != null) {
      // 如果没有主要动作更新
      this._eyeBlink.updateParameters(this._model, deltaTimeSeconds); // 更新眨眼
    }
  }

  if (this._expressionManager != null) {
    this._expressionManager.updateMotion(this._model, deltaTimeSeconds); // 通过表情更新参数（相对变化）
  }

  // 根据拖拽调整参数
  // 调整脸部朝向
  this._model.addParameterValueById(this._idParamAngleX, this._dragX * 30); // 在-30到30之间添加值
  this._model.addParameterValueById(this._idParamAngleY, this._dragY * 30);
  this._model.addParameterValueById(
    this._idParamAngleZ,
    this._dragX * this._dragY * -30
  );

  // 调整身体朝向
  this._model.addParameterValueById(
    this._idParamBodyAngleX,
    this._dragX * 10
  ); // 在-10到10之间添加值

  // 调整眼睛朝向
  this._model.addParameterValueById(this._idParamEyeBallX, this._dragX); // 在-1到1之间添加值
  this._model.addParameterValueById(this._idParamEyeBallY, this._dragY);

  // 处理呼吸等动作
  if (this._breath != null) {
    this._breath.updateParameters(this._model, deltaTimeSeconds);
  }

  // 处理物理运算设置
  if (this._physics != null) {
    this._physics.evaluate(this._model, deltaTimeSeconds);
  }

  // 处理唇同步设置
  if (this._lipsync) {
    let value = 0.0;
    // 在实时唇同步模式下，从系统获取音量值，范围在0到1之间
    this._wavFileHandler.update(deltaTimeSeconds);
    value = this._wavFileHandler.getRms();

    for (let i = 0; i < this._lipSyncIds.getSize(); ++i) {
      this._model.addParameterValueById(this._lipSyncIds.at(i), value, 0.8);
    }
  }

  // 处理姿势设置
  if (this._pose != null) {
    this._pose.updateParameters(this._model, deltaTimeSeconds);
  }

  this._model.update(); // 更新模型
}

/**
 * 开始指定组和号码的动作播放
 * @param group 动作组名
 * @param no 动作号码
 * @param priority 优先级
 * @param onFinishedMotionHandler 动作播放完成时的回调函数
 * @return 返回动作句柄，用于检查单个动作是否完成播放
 */
public startMotion(
  group: string,
  no: number,
  priority: number,
  onFinishedMotionHandler?: FinishedMotionCallback
): CubismMotionQueueEntryHandle {
  if (priority == LAppDefine.PriorityForce) {
    this._motionManager.setReservePriority(priority);
  } else if (!this._motionManager.reserveMotion(priority)) {
    if (this._debugMode) {
      LAppPal.printMessage("[APP]无法开始动作。");
    }
    return InvalidMotionQueueEntryHandleValue;
  }

  const motionFileName = this._modelSetting.getMotionFileName(group, no);

  // 例如：idle_0
  const name = `${group}_${no}`;
  let motion: CubismMotion = this._motions.getValue(name) as CubismMotion;
  let autoDelete = false;

  if (motion == null) {
    fetch(`${this._modelHomeDir}${motionFileName}`)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        motion = this.loadMotion(
          arrayBuffer,
          arrayBuffer.byteLength,
          null,
          onFinishedMotionHandler
        );
        let fadeTime: number = this._modelSetting.getMotionFadeInTimeValue(
          group,
          no
        );

        if (fadeTime >= 0.0) {
          motion.setFadeInTime(fadeTime);
        }

        fadeTime = this._modelSetting.getMotionFadeOutTimeValue(group, no);
        if (fadeTime >= 0.0) {
          motion.setFadeOutTime(fadeTime);
        }

        motion.setEffectIds(this._eyeBlinkIds, this._lipSyncIds);
        autoDelete = true; // 播放完成后自动从内存中删除
      });
  } else {
    motion.setFinishedMotionHandler(onFinishedMotionHandler);
  }

  // 声音文件处理
  const voice = this._modelSetting.getMotionSoundFileName(group, no);
  if (voice.localeCompare('') != 0) {
    let path = voice;
    path = this._modelHomeDir + path;
    this._wavFileHandler.start(path);
  }

  if (this._debugMode) {
    LAppPal.printMessage(`[APP]开始动作：[${group}_${no}`);
  }
  return this._motionManager.startMotionPriority(
    motion,
    autoDelete,
    priority
  );
}

/**
 * 开始随机播放指定组的动作
 * @param group 动作组名
 * @param priority 优先级
 * @param onFinishedMotionHandler 动作播放完成时的回调函数
 * @return 返回动作句柄，用于检查单个动作是否完成播放
 */
public startRandomMotion(
  group: string,
  priority: number,
  onFinishedMotionHandler?: FinishedMotionCallback
): CubismMotionQueueEntryHandle {
  if (this._modelSetting.getMotionCount(group) == 0) {
    return InvalidMotionQueueEntryHandleValue;
  }

  const no: number = Math.floor(
    Math.random() * this._modelSetting.getMotionCount(group)
  );

  return this.startMotion(group, no, priority, onFinishedMotionHandler);
}

/**
 * 设置指定表情动作
 * @param expressionId 表情动作的ID
 */
public setExpression(expressionId: string): void {
  const motion: ACubismMotion = this._expressions.getValue(expressionId);

  if (this._debugMode) {
    LAppPal.printMessage(`[APP]表情：[${expressionId}]`);
  }

  if (motion != null) {
    this._expressionManager.startMotionPriority(
      motion,
      false,
      LAppDefine.PriorityForce
    );
  } else {
    if (this._debugMode) {
      LAppPal.printMessage(`[APP]表情[${expressionId}]为空`);
    }
  }
}

/**
 * 随机选择并设置表情动作
 */
public setRandomExpression(): void {
  if (this._expressions.getSize() == 0) {
    return;
  }

  const no: number = Math.floor(Math.random() * this._expressions.getSize());

  for (let i = 0; i < this._expressions.getSize(); i++) {
    if (i == no) {
      const name: string = this._expressions._keyValues[i].first;
      this.setExpression(name);
      return;
    }
  }
}

/**
 * 处理动作事件触发
 * @param eventValue 事件值
 */
public motionEventFired(eventValue: csmString): void {
  CubismLogInfo('{0} 在 LAppModel 上触发了事件!!', eventValue.s);
}

/**
 * 进行碰撞测试
 * 从指定ID的顶点列表计算矩形，然后检查坐标是否在矩形范围内。
 * @param hitArenaName 要测试碰撞的ID
 * @param x X坐标
 * @param y Y坐标
 */
public hitTest(hitArenaName: string, x: number, y: number): boolean {
  // 当透明度小于1时没有碰撞检测
  if (this._opacity < 1) {
    return false;
  }

  const count: number = this._modelSetting.getHitAreasCount();

  for (let i = 0; i < count; i++) {
    if (this._modelSetting.getHitAreaName(i) == hitArenaName) {
      const drawId: CubismIdHandle = this._modelSetting.getHitAreaId(i);
      return this.isHit(drawId, x, y);
    }
  }

  return false;
}

/**
 * 预加载指定动作组的所有动作数据
 * 动作数据的名称从ModelSetting中获取。
 * @param group 动作数据组的名称
 */
public preLoadMotionGroup(group: string): void {
  for (let i = 0; i < this._modelSetting.getMotionCount(group); i++) {
    const motionFileName = this._modelSetting.getMotionFileName(group, i);

    // 例如：idle_0
    const name = `${group}_${i}`;
    if (this._debugMode) {
      LAppPal.printMessage(
        `[APP]加载动作：${motionFileName} => [${name}]`
      );
    }

    fetch(`${this._modelHomeDir}${motionFileName}`)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        const tmpMotion: CubismMotion = this.loadMotion(
          arrayBuffer,
          arrayBuffer.byteLength,
          name
        );

        let fadeTime = this._modelSetting.getMotionFadeInTimeValue(group, i);
        if (fadeTime >= 0.0) {
          tmpMotion.setFadeInTime(fadeTime);
        }

        fadeTime = this._modelSetting.getMotionFadeOutTimeValue(group, i);
        if (fadeTime >= 0.0) {
          tmpMotion.setFadeOutTime(fadeTime);
        }
        tmpMotion.setEffectIds(this._eyeBlinkIds, this._lipSyncIds);

        if (this._motions.getValue(name) != null) {
          ACubismMotion.delete(this._motions.getValue(name));
        }

        this._motions.setValue(name, tmpMotion);

        this._motionCount++;
        if (this._motionCount >= this._allMotionCount) {
          this._state = LoadStep.LoadTexture;

          // 停止所有动作
          this._motionManager.stopAllMotions();

          this._updating = false;
          this._initialized = true;

          this.createRenderer();
          this.setupTextures();
          this.getRenderer().startUp(gl);
        }
      });
  }
}

/**
 * 释放所有动作数据。
 */
public releaseMotions(): void {
  this._motions.clear();
}

/**
 * 释放所有表情数据。
 */
public releaseExpressions(): void {
  this._expressions.clear();
}

/**
 * 绘制模型。传递模型在视图-投影矩阵下的位置。
 */
public doDraw(): void {
  if (this._model == null) return;

  // 传递画布大小
  const viewport: number[] = [0, 0, canvas.width, canvas.height];

  this.getRenderer().setRenderState(frameBuffer, viewport);
  this.getRenderer().drawModel();
}

/**
 * 绘制模型。传递模型在视图-投影矩阵下的位置。
 */
public draw(matrix: CubismMatrix44): void {
  if (this._model == null) {
    return;
  }

  // 处理各种加载完毕后
  if (this._state == LoadStep.CompleteSetup) {
    matrix.multiplyByMatrix(this._modelMatrix);

    this.getRenderer().setMvpMatrix(matrix);

    this.doDraw();
  }
}

/**
 * 检查模型的一致性
 * @return 返回MOC是否一致
 */
public async hasMocConsistencyFromFile() {
  CSM_ASSERT(this._modelSetting.getModelFileName().localeCompare(``));

  // CubismModel
  if (this._modelSetting.getModelFileName() != '') {
    const modelFileName = this._modelSetting.getModelFileName();

    const response = await fetch(`${this._modelHomeDir}${modelFileName}`);
    const arrayBuffer = await response.arrayBuffer();

    this._consistency = CubismMoc.hasMocConsistency(arrayBuffer);

    if (!this._consistency) {
      CubismLogInfo('不一致的MOC3。');
    } else {
      CubismLogInfo('一致的MOC3。');
    }

    return this._consistency;
  } else {
    LAppPal.printMessage('模型数据不存在。');
  }
}

/**
 * 构造函数
 */
public constructor() {
  super();

  this._modelSetting = null;
  this._modelHomeDir = null;
  this._userTimeSeconds = 0.0;

  this._eyeBlinkIds = new csmVector<CubismIdHandle>();
  this._lipSyncIds = new csmVector<CubismIdHandle>();

  this._motions = new csmMap<string, ACubismMotion>();
  this._expressions = new csmMap<string, ACubismMotion>();

  this._hitArea = new csmVector<csmRect>();
  this._userArea = new csmVector<csmRect>();

  this._idParamAngleX = CubismFramework.getIdManager().getId(
    CubismDefaultParameterId.ParamAngleX
  );
  this._idParamAngleY = CubismFramework.getIdManager().getId(
    CubismDefaultParameterId.ParamAngleY
  );
  this._idParamAngleZ = CubismFramework.getIdManager().getId(
    CubismDefaultParameterId.ParamAngleZ
  );
  this._idParamEyeBallX = CubismFramework.getIdManager().getId(
    CubismDefaultParameterId.ParamEyeBallX
  );
  this._idParamEyeBallY = CubismFramework.getIdManager().getId(
    CubismDefaultParameterId.ParamEyeBallY
  );
  this._idParamBodyAngleX = CubismFramework.getIdManager().getId(
    CubismDefaultParameterId.ParamBodyAngleX
  );

  if (LAppDefine.MOCConsistencyValidationEnable) {
    this._mocConsistency = true;
  }

  this._state = LoadStep.LoadAssets;
  this._expressionCount = 0;
  this._textureCount = 0;
  this._motionCount = 0;
  this._allMotionCount = 0;
  this._wavFileHandler = new LAppWavFileHandler();
  this._consistency = false;
}
_modelSetting: ICubismModelSetting; // 模型设置信息
_modelHomeDir: string; // 模型设置所在目录
_userTimeSeconds: number; // 用户时间累积值[秒]

_eyeBlinkIds: csmVector<CubismIdHandle>; // 模型中配置的眨眼功能参数ID
_lipSyncIds: csmVector<CubismIdHandle>; // 模型中配置的嘴唇同步功能参数ID

_motions: csmMap<string, ACubismMotion>; // 已加载的动作列表
_expressions: csmMap<string, ACubismMotion>; // 已加载的表情列表

_hitArea: csmVector<csmRect>; // 点击区域
_userArea: csmVector<csmRect>; // 用户区域

_idParamAngleX: CubismIdHandle; // 参数ID：ParamAngleX
_idParamAngleY: CubismIdHandle; // 参数ID：ParamAngleY
_idParamAngleZ: CubismIdHandle; // 参数ID：ParamAngleZ
_idParamEyeBallX: CubismIdHandle; // 参数ID：ParamEyeBallX
_idParamEyeBallY: CubismIdHandle; // 参数ID：ParamEyeBallY
_idParamBodyAngleX: CubismIdHandle; // 参数ID：ParamBodyAngleX

_state: number; // 当前状态管理
_expressionCount: number; // 表情数据计数
_textureCount: number; // 纹理计数
_motionCount: number; // 动作数据计数
_allMotionCount: number; // 总动作数
_wavFileHandler: LAppWavFileHandler; // wav文件处理器
_consistency: boolean; // MOC3一致性检查管理

}
