/**
 * 版权(c) Live2D Inc. 保留所有权利。
 *
 * 使用本源代码受Live2D开放软件许可证的约束，
 * 该许可证可在https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html找到。
 */

import { LAppDelegate } from './lappdelegate';
import * as LAppDefine from './lappdefine';

/**
 * 浏览器加载后的处理
 */
window.onload = (): void => {
  // 创建应用程序实例
  if (LAppDelegate.getInstance().initialize() == false) {
    return;
  }

  LAppDelegate.getInstance().run();
};

/**
 * 关闭窗口时的处理
 */
window.onbeforeunload = (): void => LAppDelegate.releaseInstance();

/**
 * 更改屏幕大小时的处理
 */
window.onresize = () => {
  if (LAppDefine.CanvasSize === 'auto') {
    LAppDelegate.getInstance().onResize();
  }
};
