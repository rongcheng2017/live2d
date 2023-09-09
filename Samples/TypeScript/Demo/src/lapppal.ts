/**
 * 版权(c) Live2D Inc. 版权所有。
 *
 * 使用此源代码受Live2D开放软件许可协议的约束，
 * 该许可协议可以在 https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html 找到。
 */

/**
 * Cubism平台抽象层，用于抽象化依赖于平台的功能。
 * 包括文件读取和获取时间等依赖于平台的函数。
 */
export class LAppPal {
  /**
   * 以字节数据加载文件
   *
   * @param filePath 要读取的文件路径
   * @return
   * {
   *      buffer,   读取的字节数据
   *      size        文件大小
   * }
   */
  public static loadFileAsBytes(
    filePath: string,
    callback: (arrayBuffer: ArrayBuffer, size: number) => void
  ): void {
    fetch(filePath)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => callback(arrayBuffer, arrayBuffer.byteLength));
  }

  /**
   * 获取时间差（与上一帧的差异）。
   * @return 时间差[毫秒]
   */
  public static getDeltaTime(): number {
    return this.s_deltaTime;
  }

  public static updateTime(): void {
    this.s_currentFrame = Date.now();
    this.s_deltaTime = (this.s_currentFrame - this.s_lastFrame) / 1000;
    this.s_lastFrame = this.s_currentFrame;
  }

  /**
   * 输出消息。
   * @param message 字符串
   */
  public static printMessage(message: string): void {
    console.log(message);
  }

  static lastUpdate = Date.now();

  static s_currentFrame = 0.0;
  static s_lastFrame = 0.0;
  static s_deltaTime = 0.0;
}
