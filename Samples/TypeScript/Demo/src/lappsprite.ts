/**
 * 版权(c) Live2D Inc. 保留所有权利。
 *
 * 使用此源代码受 Live2D 开放软件许可协议的约束，
 * 可在 https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html 找到。
 */

import { canvas, gl } from './lappdelegate';

/**
 * 实现精灵的类
 *
 * 管理纹理ID和矩形
 */
export class LAppSprite {
  /**
   * 构造函数
   * @param x            x坐标
   * @param y            y坐标
   * @param width        宽度
   * @param height       高度
   * @param textureId    纹理
   */
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    textureId: WebGLTexture
  ) {
    this._rect = new Rect();
    this._rect.left = x - width * 0.5;
    this._rect.right = x + width * 0.5;
    this._rect.up = y + height * 0.5;
    this._rect.down = y - height * 0.5;
    this._texture = textureId;
    this._vertexBuffer = null;
    this._uvBuffer = null;
    this._indexBuffer = null;

    this._positionLocation = null;
    this._uvLocation = null;
    this._textureLocation = null;

    this._positionArray = null;
    this._uvArray = null;
    this._indexArray = null;

    this._firstDraw = true;
  }

  /**
   * 释放资源。
   */
  public release(): void {
    this._rect = null;

    gl.deleteTexture(this._texture);
    this._texture = null;

    gl.deleteBuffer(this._uvBuffer);
    this._uvBuffer = null;

    gl.deleteBuffer(this._vertexBuffer);
    this._vertexBuffer = null;

    gl.deleteBuffer(this._indexBuffer);
    this._indexBuffer = null;
  }

  /**
   * 获取纹理。
   */
  public getTexture(): WebGLTexture {
    return this._texture;
  }

  /**
   * 渲染。
   * @param programId 着色器程序
   * @param canvas 画布信息
   */
  public render(programId: WebGLProgram): void {
    if (this._texture == null) {
      // 尚未加载完成
      return;
    }

    // 首次绘制
    if (this._firstDraw) {
      // 获取属性变量的位置
      this._positionLocation = gl.getAttribLocation(programId, 'position');
      gl.enableVertexAttribArray(this._positionLocation);

      this._uvLocation = gl.getAttribLocation(programId, 'uv');
      gl.enableVertexAttribArray(this._uvLocation);

      // 获取统一变量的位置
      this._textureLocation = gl.getUniformLocation(programId, 'texture');

      // 注册统一属性
      gl.uniform1i(this._textureLocation, 0);

      // 初始化UV缓冲区和坐标
      {
        this._uvArray = new Float32Array([
          1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0
        ]);

        // 创建UV缓冲区
        this._uvBuffer = gl.createBuffer();
      }

      // 初始化顶点缓冲区和坐标
      {
        const maxWidth = canvas.width;
        const maxHeight = canvas.height;

        // 顶点数据
        this._positionArray = new Float32Array([
          (this._rect.right - maxWidth * 0.5) / (maxWidth * 0.5),
          (this._rect.up - maxHeight * 0.5) / (maxHeight * 0.5),
          (this._rect.left - maxWidth * 0.5) / (maxWidth * 0.5),
          (this._rect.up - maxHeight * 0.5) / (maxHeight * 0.5),
          (this._rect.left - maxWidth * 0.5) / (maxWidth * 0.5),
          (this._rect.down - maxHeight * 0.5) / (maxHeight * 0.5),
          (this._rect.right - maxWidth * 0.5) / (maxWidth * 0.5),
          (this._rect.down - maxHeight * 0.5) / (maxHeight * 0.5)
        ]);

        // 创建顶点缓冲区
        this._vertexBuffer = gl.createBuffer();
      }

      // 初始化顶点索引缓冲区
      {
        // 索引数据
        this._indexArray = new Uint16Array([0, 1, 2, 3, 2, 0]);

        // 创建索引缓冲区
        this._indexBuffer = gl.createBuffer();
      }

      this._firstDraw = false;
    }

    // 注册UV坐标
    gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this._uvArray, gl.STATIC_DRAW);

    // 注册属性变量
    gl.vertexAttribPointer(this._uvLocation, 2, gl.FLOAT, false, 0, 0);

    // 注册顶点坐标
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this._positionArray, gl.STATIC_DRAW);

    // 注册属性变量
    gl.vertexAttribPointer(this._positionLocation, 2, gl.FLOAT, false, 0, 0);

    // 创建顶点索引
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._indexArray, gl.DYNAMIC_DRAW);

    // 绘制模型
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    gl.drawElements(
      gl.TRIANGLES,
      this._indexArray.length,
      gl.UNSIGNED_SHORT,
      0
    );
  }

  /**
   * 碰撞检测
   * @param pointX x坐标
   * @param pointY y坐标
   */
  public isHit(pointX: number, pointY: number): boolean {
    // 获取屏幕大小
    const { height } = canvas;

    // 需要转换Y坐标
    const y = height - pointY;

    return (
      pointX >= this._rect.left &&
      pointX <= this._rect.right &&
      y <= this._rect.up &&
      y >= this._rect.down
    );
  }

  _texture: WebGLTexture; // 纹理
  _vertexBuffer: WebGLBuffer; // 顶点缓冲区
  _uvBuffer: WebGLBuffer; // UV顶点缓冲区
  _indexBuffer: WebGLBuffer; // 顶点索引缓冲区
  _rect: Rect; // 矩形

  _positionLocation: number;
  _uvLocation: number;
  _textureLocation: WebGLUniformLocation;

  _positionArray: Float32Array;
  _uvArray: Float32Array;
  _indexArray: Uint16Array;

  _firstDraw: boolean;
}

export class Rect {
  public left: number; // 左边
  public right: number; // 右边
  public up: number; // 上边
  public down: number; // 下边
}
