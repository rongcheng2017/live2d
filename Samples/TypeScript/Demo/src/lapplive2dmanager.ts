/**
 * 版权(c) Live2D Inc. 保留所有权利。
 *
 * 使用此源代码受Live2D开放软件许可证的管理，
 * 可在 https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html 找到。
 */

import { CubismMatrix44 } from '@framework/math/cubismmatrix44';
import { ACubismMotion } from '@framework/motion/acubismmotion';
import { csmVector } from '@framework/type/csmvector';

import * as LAppDefine from './lappdefine';
import { canvas } from './lappdelegate';
import { LAppModel } from './lappmodel';
import { LAppPal } from './lapppal';

export let s_instance: LAppLive2DManager = null;

/**
 * 在示例应用程序中管理CubismModel的类
 * 执行模型的创建和销毁、处理触摸事件、切换模型等操作。
 */
export class LAppLive2DManager {
  /**
   * 返回类的实例（单例）。
   * 如果尚未创建实例，则在内部创建一个实例。
   *
   * @return 类的实例
   */
  public static getInstance(): LAppLive2DManager {
    if (s_instance == null) {
      s_instance = new LAppLive2DManager();
    }

    return s_instance;
  }

  /**
   * 释放类的实例（单例）。
   */
  public static releaseInstance(): void {
    if (s_instance != null) {
      s_instance = void 0;
    }

    s_instance = null;
  }

  /**
   * 返回当前场景中的模型。
   *
   * @param no 模型列表中的索引值
   * @return 返回模型的实例。如果索引值超出范围，则返回null。
   */
  public getModel(no: number): LAppModel {
    if (no < this._models.getSize()) {
      return this._models.at(no);
    }

    return null;
  }

  /**
   * 释放当前场景中的所有模型
   */
  public releaseAllModel(): void {
    for (let i = 0; i < this._models.getSize(); i++) {
      this._models.at(i).release();
      this._models.set(i, null);
    }

    this._models.clear();
  }

  /**
   * 处理拖拽屏幕事件
   *
   * @param x 屏幕的X坐标
   * @param y 屏幕的Y坐标
   */
  public onDrag(x: number, y: number): void {
    for (let i = 0; i < this._models.getSize(); i++) {
      const model: LAppModel = this.getModel(i);

      if (model) {
        model.setDragging(x, y);
      }
    }
  }

  /**
   * 处理点击屏幕事件
   *
   * @param x 屏幕的X坐标
   * @param y 屏幕的Y坐标
   */
  public onTap(x: number, y: number): void {
    if (LAppDefine.DebugLogEnable) {
      LAppPal.printMessage(
        `[APP]点击点: {x: ${x.toFixed(2)} y: ${y.toFixed(2)}}`
      );
    }

    for (let i = 0; i < this._models.getSize(); i++) {
      if (this._models.at(i).hitTest(LAppDefine.HitAreaNameHead, x, y)) {
        if (LAppDefine.DebugLogEnable) {
          LAppPal.printMessage(
            `[APP]点击区域: [${LAppDefine.HitAreaNameHead}]`
          );
        }
        this._models.at(i).setRandomExpression();
      } else if (this._models.at(i).hitTest(LAppDefine.HitAreaNameBody, x, y)) {
        if (LAppDefine.DebugLogEnable) {
          LAppPal.printMessage(
            `[APP]点击区域: [${LAppDefine.HitAreaNameBody}]`
          );
        }
        this._models
          .at(i)
          .startRandomMotion(
            LAppDefine.MotionGroupTapBody,
            LAppDefine.PriorityNormal,
            this._finishedMotion
          );
      }
    }
  }

  /**
   * 更新屏幕时的处理
   * 执行模型的更新和绘制操作
   */
  public onUpdate(): void {
    const { width, height } = canvas;

    const modelCount: number = this._models.getSize();

    for (let i = 0; i < modelCount; ++i) {
      const projection: CubismMatrix44 = new CubismMatrix44();
      const model: LAppModel = this.getModel(i);

      if (model.getModel()) {
        if (model.getModel().getCanvasWidth() > 1.0 && width < height) {
          // 在纵向窗口中显示横向较长的模型时，根据模型的宽度计算缩放比例
          model.getModelMatrix().setWidth(2.0);
          projection.scale(1.0, width / height);
        } else {
          projection.scale(height / width, 1.0);
        }

        // 如果需要，在此处执行矩阵乘法
        if (this._viewMatrix != null) {
          projection.multiplyByMatrix(this._viewMatrix);
        }
      }

      model.update();
      model.draw(projection); // 引用传递，因此projection会被修改。
    }
  }

  /**
   * 切换到下一个场景
   * 在示例应用程序中，执行模型集的切换。
   */
  public nextScene(): void {
    const no: number = (this._sceneIndex + 1) % LAppDefine.ModelDirSize;
    this.changeScene(no);
  }

  /**
   * 切换场景
   * 在示例应用程序中，执行模型集的切换。
   */
  public changeScene(index: number): void {
    this._sceneIndex = index;
    if (LAppDefine.DebugLogEnable) {
      LAppPal.printMessage(`[APP]模型索引: ${this._sceneIndex}`);
    }

    // 根据ModelDir[]中保存的目录名称确定model3.json的路径。
    // 请确保目录名称和model3.json的名称匹配。
    const model: string = LAppDefine.ModelDir[index];
    const modelPath: string = LAppDefine.ResourcesPath + model + '/';
    let modelJsonName: string = LAppDefine.ModelDir[index];
    modelJsonName += '.model3.json';

    this.releaseAllModel();
    this._models.pushBack(new LAppModel());
    this._models.at(0).loadAssets(modelPath, modelJsonName);
  }

  public setViewMatrix(m: CubismMatrix44) {
    for (let i = 0; i < 16; i++) {
      this._viewMatrix.getArray()[i] = m.getArray()[i];
    }
  }

  /**
   * 构造函数
   */
  constructor() {
    this._viewMatrix = new CubismMatrix44();
    this._models = new csmVector<LAppModel>();
    this._sceneIndex = 0;
    this.changeScene(this._sceneIndex);
  }

  _viewMatrix: CubismMatrix44; // 用于模型绘制的视图矩阵
  _models: csmVector<LAppModel>; // 模型实例的容器
  _sceneIndex: number; // 要显示的场景的索引值
  // 模型动作播放结束时的回调函数
  _finishedMotion = (self: ACubismMotion): void => {
    LAppPal.printMessage('动作结束:');
    console.log(self);
  };
}
