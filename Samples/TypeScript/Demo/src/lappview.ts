/**
 * 版权(c) Live2D公司，保留所有权利。
 *
 * 使用此源代码受Live2D开放软件许可协议的约束，
 * 可在https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html找到。
 */

import { CubismMatrix44 } from '@framework/math/cubismmatrix44';
import { CubismViewMatrix } from '@framework/math/cubismviewmatrix';

import * as LAppDefine from './lappdefine';
import { canvas, gl, LAppDelegate } from './lappdelegate';
import { LAppLive2DManager } from './lapplive2dmanager';
import { LAppPal } from './lapppal';
import { LAppSprite } from './lappsprite';
import { TextureInfo } from './lapptexturemanager';
import { TouchManager } from './touchmanager';

/**
 * 渲染类。
 */
export class LAppView {
  /**
   * 构造函数
   */
  constructor() {
    this._programId = null;
    this._back = null;
    this._gear = null;

    // 触摸相关事件管理
    this._touchManager = new TouchManager();

    // 用于将设备坐标转换为屏幕坐标的矩阵
    this._deviceToScreen = new CubismMatrix44();

    // 用于进行屏幕上的缩放和移动转换的矩阵
    this._viewMatrix = new CubismViewMatrix();
  }

  /**
   * 初始化
   */
  public initialize(): void {
    const { width, height } = canvas;

    const ratio: number = width / height;
    const left: number = -ratio;
    const right: number = ratio;
    const bottom: number = LAppDefine.ViewLogicalLeft;
    const top: number = LAppDefine.ViewLogicalRight;

    this._viewMatrix.setScreenRect(left, right, bottom, top); // 设备对应的屏幕范围。X的左端、X的右端、Y的下端、Y的上端
    this._viewMatrix.scale(LAppDefine.ViewScale, LAppDefine.ViewScale);

    this._deviceToScreen.loadIdentity();
    if (width > height) {
      const screenW: number = Math.abs(right - left);
      this._deviceToScreen.scaleRelative(screenW / width, -screenW / width);
    } else {
      const screenH: number = Math.abs(top - bottom);
      this._deviceToScreen.scaleRelative(screenH / height, -screenH / height);
    }
    this._deviceToScreen.translateRelative(-width * 0.5, -height * 0.5);

    // 设置显示范围
    this._viewMatrix.setMaxScale(LAppDefine.ViewMaxScale); // 最大放大倍率
    this._viewMatrix.setMinScale(LAppDefine.ViewMinScale); // 最小缩小倍率

    // 可以显示的最大范围
    this._viewMatrix.setMaxScreenRect(
      LAppDefine.ViewLogicalMaxLeft,
      LAppDefine.ViewLogicalMaxRight,
      LAppDefine.ViewLogicalMaxBottom,
      LAppDefine.ViewLogicalMaxTop
    );
  }

  /**
   * 释放资源
   */
  public release(): void {
    this._viewMatrix = null;
    this._touchManager = null;
    this._deviceToScreen = null;

    this._gear.release();
    this._gear = null;

    this._back.release();
    this._back = null;

    gl.deleteProgram(this._programId);
    this._programId = null;
  }

  /**
   * 渲染
   */
  public render(): void {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // 清除颜色缓冲区和深度缓冲区

    gl.useProgram(this._programId);
    gl.useProgram(this._programId);

    if (this._back) {
      this._back.render(this._programId);
    }
    if (this._gear) {
      this._gear.render(this._programId);
    }

    gl.flush();

    const live2DManager: LAppLive2DManager = LAppLive2DManager.getInstance();

    live2DManager.setViewMatrix(this._viewMatrix);

    live2DManager.onUpdate();
  }

  /**
   * 初始化图像
   */
  public initializeSprite(): void {
    const width: number = canvas.width;
    const height: number = canvas.height;

    const textureManager = LAppDelegate.getInstance().getTextureManager();
    const resourcesPath = LAppDefine.ResourcesPath;

    let imageName = '';

    // 初始化背景图像
    imageName = LAppDefine.BackImageName;

    // 异步加载，因此创建回调函数
    const initBackGroundTexture = (textureInfo: TextureInfo): void => {
      const x: number = width * 0.5;
      const y: number = height * 0.5;

      const fwidth = textureInfo.width * 2.0;
      const fheight = height * 0.95;
      this._back = new LAppSprite(x, y, fwidth, fheight, textureInfo.id);
    };

    textureManager.createTextureFromPngFile(
      resourcesPath + imageName,
      false,
      initBackGroundTexture
    );

    // 初始化齿轮图像
    imageName = LAppDefine.GearImageName;
    const initGearTexture = (textureInfo: TextureInfo): void => {
      const x = width - textureInfo.width * 0.5;
      const y = height - textureInfo.height * 0.5;
      const fwidth = textureInfo.width;
      const fheight = textureInfo.height;
      this._gear = new LAppSprite(x, y, fwidth, fheight, textureInfo.id);
    };

    textureManager.createTextureFromPngFile(
      resourcesPath + imageName,
      false,
      initGearTexture
    );

    // 创建着色器程序
    if (this._programId == null) {
      this._programId = LAppDelegate.getInstance().createShader();
    }
  }

  /**
   * 当触摸开始时调用。
   *
   * @param pointX 屏幕X坐标
   * @param pointY 屏幕Y坐标
   */
  public onTouchesBegan(pointX: number, pointY: number): void {
    this._touchManager.touchesBegan(pointX, pointY);
  }

  /**
   * 当触摸移动时调用。
   *
   * @param pointX 屏幕X坐标
   * @param pointY 屏幕Y坐标
   */
  public onTouchesMoved(pointX: number, pointY: number): void {
    const viewX: number = this.transformViewX(this._touchManager.getX());
    const viewY: number = this.transformViewY(this._touchManager.getY());

    this._touchManager.touchesMoved(pointX, pointY);

    const live2DManager: LAppLive2DManager = LAppLive2DManager.getInstance();
    live2DManager.onDrag(viewX, viewY);
  }

  /**
   * 当触摸结束时调用。
   *
   * @param pointX 屏幕X坐标
   * @param pointY 屏幕Y坐标
   */
  public onTouchesEnded(pointX: number, pointY: number): void {
    // 触摸结束
    const live2DManager: LAppLive2DManager = LAppLive2DManager.getInstance();
    live2DManager.onDrag(0.0, 0.0);

    {
      // 单击
      const x: number = this._deviceToScreen.transformX(
        this._touchManager.getX()
      ); // 获取转换后的逻辑坐标。
      const y: number = this._deviceToScreen.transformY(
        this._touchManager.getY()
      ); // 获取转换后的逻辑坐标。

      if (LAppDefine.DebugTouchLogEnable) {
        LAppPal.printMessage(`[APP]touchesEnded x: ${x} y: ${y}`);
      }
      live2DManager.onTap(x, y);

      // 是否点击到了齿轮
      if (this._gear.isHit(pointX, pointY)) {
        live2DManager.nextScene();
      }
    }
  }

  /**
   * 将X坐标转换为View坐标。
   *
   * @param deviceX 设备X坐标
   */
  public transformViewX(deviceX: number): number {
    const screenX: number = this._deviceToScreen.transformX(deviceX); // 获取转换后的逻辑坐标。
    return this._viewMatrix.invertTransformX(screenX); // 放大、缩小、移动后的值。
  }

  /**
   * 将Y坐标转换为View坐标。
   *
   * @param deviceY 设备Y坐标
   */
  public transformViewY(deviceY: number): number {
    const screenY: number = this._deviceToScreen.transformY(deviceY); // 获取转换后的逻辑坐标。
    return this._viewMatrix.invertTransformY(screenY);
  }

  /**
   * 将X坐标转换为Screen坐标。
   * @param deviceX 设备X坐标
   */
  public transformScreenX(deviceX: number): number {
    return this._deviceToScreen.transformX(deviceX);
  }

  /**
   * 将Y坐标转换为Screen坐标。
   *
   * @param deviceY 设备Y坐标
   */
  public transformScreenY(deviceY: number): number {
    return this._deviceToScreen.transformY(deviceY);
  }

  _touchManager: TouchManager; // 触摸管理器
  _deviceToScreen: CubismMatrix44; // 从设备到屏幕的矩阵
  _viewMatrix: CubismViewMatrix; // viewMatrix
  _programId: WebGLProgram; // 着色器ID
  _back: LAppSprite; // 背景图像
  _gear: LAppSprite; // 齿轮图像
  _changeModel: boolean; // 模型切换标志
  _isClick: boolean; // 点击中
}
