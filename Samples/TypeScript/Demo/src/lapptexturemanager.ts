/**
 * 版权(c) Live2D Inc. 保留所有权利。
 *
 * 使用本源代码受Live2D开放软件许可证的约束，
 * 该许可证可在https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html找到。
 */

import { csmVector, iterator } from '@framework/type/csmvector';

import { gl } from './lappdelegate';

/**
 * 纹理管理类
 * 用于加载和管理图像的类。
 */
export class LAppTextureManager {
  /**
   * 构造函数
   */
  constructor() {
    this._textures = new csmVector<TextureInfo>();
  }

  /**
   * 释放资源。
   */
  public release(): void {
    for (
      let ite: iterator<TextureInfo> = this._textures.begin();
      ite.notEqual(this._textures.end());
      ite.preIncrement()
    ) {
      gl.deleteTexture(ite.ptr().id);
    }
    this._textures = null;
  }

  /**
   * 从PNG文件创建纹理
   *
   * @param fileName 要加载的图像文件路径名
   * @param usePremultiply 是否启用Premult处理
   * @return 图像信息，加载失败时返回null
   */
  public createTextureFromPngFile(
    fileName: string,
    usePremultiply: boolean,
    callback: (textureInfo: TextureInfo) => void
  ): void {
    // 查找已加载的纹理
    for (
      let ite: iterator<TextureInfo> = this._textures.begin();
      ite.notEqual(this._textures.end());
      ite.preIncrement()
    ) {
      if (
        ite.ptr().fileName == fileName &&
        ite.ptr().usePremultply == usePremultiply
      ) {
        // 第二次以后会使用缓存（无等待时间）
        // 在WebKit中，要再次调用相同图像的onload，需要重新实例化
        // 详细信息：https://stackoverflow.com/a/5024181
        ite.ptr().img = new Image();
        ite.ptr().img.onload = (): void => callback(ite.ptr());
        ite.ptr().img.src = fileName;
        return;
      }
    }

    // 触发数据加载
    const img = new Image();
    img.onload = (): void => {
      // 创建纹理对象
      const tex: WebGLTexture = gl.createTexture();

      // 选择纹理
      gl.bindTexture(gl.TEXTURE_2D, tex);

      // 设置纹理参数
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR_MIPMAP_LINEAR
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      // 执行Premult处理
      if (usePremultiply) {
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
      }

      // 写入纹理像素
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

      // 生成Mipmap
      gl.generateMipmap(gl.TEXTURE_2D);

      // 解绑纹理
      gl.bindTexture(gl.TEXTURE_2D, null);

      const textureInfo: TextureInfo = new TextureInfo();
      if (textureInfo != null) {
        textureInfo.fileName = fileName;
        textureInfo.width = img.width;
        textureInfo.height = img.height;
        textureInfo.id = tex;
        textureInfo.img = img;
        textureInfo.usePremultply = usePremultiply;
        this._textures.pushBack(textureInfo);
      }

      callback(textureInfo);
    };
    img.src = fileName;
  }

  /**
   * 释放纹理
   *
   * 释放数组中的所有纹理。
   */
  public releaseTextures(): void {
    for (let i = 0; i < this._textures.getSize(); i++) {
      this._textures.set(i, null);
    }

    this._textures.clear();
  }

  /**
   * 释放纹理
   *
   * 释放指定的纹理图像。
   * @param texture 要释放的纹理
   */
  public releaseTextureByTexture(texture: WebGLTexture): void {
    for (let i = 0; i < this._textures.getSize(); i++) {
      if (this._textures.at(i).id != texture) {
        continue;
      }

      this._textures.set(i, null);
      this._textures.remove(i);
      break;
    }
  }

  /**
   * 释放纹理
   *
   * 释放指定名称的纹理图像。
   * @param fileName 要释放的图像文件路径名
   */
  public releaseTextureByFilePath(fileName: string): void {
    for (let i = 0; i < this._textures.getSize(); i++) {
      if (this._textures.at(i).fileName == fileName) {
        this._textures.set(i, null);
        this._textures.remove(i);
        break;
      }
    }
  }

  _textures: csmVector<TextureInfo>;
}

/**
 * 图像信息结构体
 */
export class TextureInfo {
  img: HTMLImageElement; // 图像
  id: WebGLTexture = null; // 纹理
  width = 0; // 宽度
  height = 0; // 高度
  usePremultply: boolean; // 是否启用Premult处理
  fileName: string; // 文件名
}
