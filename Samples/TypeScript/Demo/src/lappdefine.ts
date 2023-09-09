/**
 * 版权(c) Live2D公司，保留所有权利。
 *
 * 使用此源代码受Live2D开放软件许可协议的约束，
 * 可在https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html找到。
 */

import { LogLevel } from '@framework/live2dcubismframework';

/**
 * 用于Sample App的常量
 */

// 画布的宽度和高度像素值，或动态屏幕大小（'auto'）。
export const CanvasSize: { width: number; height: number } | 'auto' = 'auto';

// 视图缩放
export const ViewScale = 1.0;
export const ViewMaxScale = 2.0;
export const ViewMinScale = 0.8;

export const ViewLogicalLeft = -1.0;
export const ViewLogicalRight = 1.0;
export const ViewLogicalBottom = -1.0;
export const ViewLogicalTop = 1.0;

export const ViewLogicalMaxLeft = -2.0;
export const ViewLogicalMaxRight = 2.0;
export const ViewLogicalMaxBottom = -2.0;
export const ViewLogicalMaxTop = 2.0;

// 相对路径
export const ResourcesPath = '../../Resources/';

// 模型背后的背景图像文件
export const BackImageName = 'back_class_normal.png';

// 齿轮
export const GearImageName = 'icon_gear.png';

// 关闭按钮
export const PowerImageName = 'CloseNormal.png';

// 模型定义---------------------------------------------
// 放置模型的目录名数组
// 目录名与model3.json的名称相匹配
export const ModelDir: string[] = [
  'Haru',
  'Hiyori',
  'Mark',
  'Natori',
  'Rice',
  'Mao'
];
export const ModelDirSize: number = ModelDir.length;

// 外部定义文件（json）匹配
export const MotionGroupIdle = 'Idle'; // 空闲
export const MotionGroupTapBody = 'TapBody'; // 点击身体

// 外部定义文件（json）匹配
export const HitAreaNameHead = 'Head';
export const HitAreaNameBody = 'Body';

// 动作的优先级常数
export const PriorityNone = 0;
export const PriorityIdle = 1;
export const PriorityNormal = 2;
export const PriorityForce = 3;

// MOC3的一致性验证选项
export const MOCConsistencyValidationEnable = true;

// 调试用日志显示选项
export const DebugLogEnable = true;
export const DebugTouchLogEnable = false;

// 框架输出的日志级别设置
export const CubismLoggingLevel: LogLevel = LogLevel.LogLevel_Verbose;

// 默认的渲染目标大小
export const RenderTargetWidth = 1900;
export const RenderTargetHeight = 1000;
