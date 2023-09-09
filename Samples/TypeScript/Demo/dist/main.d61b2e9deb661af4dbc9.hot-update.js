"use strict";
self["webpackHotUpdate"]("main",{

/***/ "../../../Framework/src/math/cubismviewmatrix.ts":
/*!*******************************************************!*\
  !*** ../../../Framework/src/math/cubismviewmatrix.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Live2DCubismFramework = exports.CubismViewMatrix = void 0;
var cubismmatrix44_1 = __webpack_require__(/*! ./cubismmatrix44 */ "../../../Framework/src/math/cubismmatrix44.ts");
var CubismViewMatrix = (function (_super) {
    __extends(CubismViewMatrix, _super);
    function CubismViewMatrix() {
        var _this = _super.call(this) || this;
        _this._screenLeft = 0.0;
        _this._screenRight = 0.0;
        _this._screenTop = 0.0;
        _this._screenBottom = 0.0;
        _this._maxLeft = 0.0;
        _this._maxRight = 0.0;
        _this._maxTop = 0.0;
        _this._maxBottom = 0.0;
        _this._maxScale = 0.0;
        _this._minScale = 0.0;
        return _this;
    }
    CubismViewMatrix.prototype.adjustTranslate = function (x, y) {
        if (this._tr[0] * this._maxLeft + (this._tr[12] + x) > this._screenLeft) {
            x = this._screenLeft - this._tr[0] * this._maxLeft - this._tr[12];
        }
        if (this._tr[0] * this._maxRight + (this._tr[12] + x) < this._screenRight) {
            x = this._screenRight - this._tr[0] * this._maxRight - this._tr[12];
        }
        if (this._tr[5] * this._maxTop + (this._tr[13] + y) < this._screenTop) {
            y = this._screenTop - this._tr[5] * this._maxTop - this._tr[13];
        }
        if (this._tr[5] * this._maxBottom + (this._tr[13] + y) >
            this._screenBottom) {
            y = this._screenBottom - this._tr[5] * this._maxBottom - this._tr[13];
        }
        var tr1 = new Float32Array([
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            x,
            y,
            0.0,
            1.0,
        ]);
        cubismmatrix44_1.CubismMatrix44.multiply(tr1, this._tr, this._tr);
    };
    CubismViewMatrix.prototype.adjustScale = function (cx, cy, scale) {
        var maxScale = this.getMaxScale();
        var minScale = this.getMinScale();
        var targetScale = scale * this._tr[0];
        if (targetScale < minScale) {
            if (this._tr[0] > 0.0) {
                scale = minScale / this._tr[0];
            }
        }
        else if (targetScale > maxScale) {
            if (this._tr[0] > 0.0) {
                scale = maxScale / this._tr[0];
            }
        }
        var tr1 = new Float32Array([
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            cx,
            cy,
            0.0,
            1.0,
        ]);
        var tr2 = new Float32Array([
            scale,
            0.0,
            0.0,
            0.0,
            0.0,
            scale,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
        ]);
        var tr3 = new Float32Array([
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            -cx,
            -cy,
            0.0,
            1.0,
        ]);
        cubismmatrix44_1.CubismMatrix44.multiply(tr3, this._tr, this._tr);
        cubismmatrix44_1.CubismMatrix44.multiply(tr2, this._tr, this._tr);
        cubismmatrix44_1.CubismMatrix44.multiply(tr1, this._tr, this._tr);
    };
    CubismViewMatrix.prototype.setScreenRect = function (left, right, bottom, top) {
        this._screenLeft = left;
        this._screenRight = right;
        this._screenBottom = bottom;
        this._screenTop = top;
    };
    CubismViewMatrix.prototype.setMaxScreenRect = function (left, right, bottom, top) {
        this._maxLeft = left;
        this._maxRight = right;
        this._maxTop = top;
        this._maxBottom = bottom;
    };
    CubismViewMatrix.prototype.setMaxScale = function (maxScale) {
        this._maxScale = maxScale;
    };
    CubismViewMatrix.prototype.setMinScale = function (minScale) {
        this._minScale = minScale;
    };
    CubismViewMatrix.prototype.getMaxScale = function () {
        return this._maxScale;
    };
    CubismViewMatrix.prototype.getMinScale = function () {
        return this._minScale;
    };
    CubismViewMatrix.prototype.isMaxScale = function () {
        return this.getScaleX() >= this._maxScale;
    };
    CubismViewMatrix.prototype.isMinScale = function () {
        return this.getScaleX() <= this._minScale;
    };
    CubismViewMatrix.prototype.getScreenLeft = function () {
        return this._screenLeft;
    };
    CubismViewMatrix.prototype.getScreenRight = function () {
        return this._screenRight;
    };
    CubismViewMatrix.prototype.getScreenBottom = function () {
        return this._screenBottom;
    };
    CubismViewMatrix.prototype.getScreenTop = function () {
        return this._screenTop;
    };
    CubismViewMatrix.prototype.getMaxLeft = function () {
        return this._maxLeft;
    };
    CubismViewMatrix.prototype.getMaxRight = function () {
        return this._maxRight;
    };
    CubismViewMatrix.prototype.getMaxBottom = function () {
        return this._maxBottom;
    };
    CubismViewMatrix.prototype.getMaxTop = function () {
        return this._maxTop;
    };
    return CubismViewMatrix;
}(cubismmatrix44_1.CubismMatrix44));
exports.CubismViewMatrix = CubismViewMatrix;
var $ = __importStar(__webpack_require__(/*! ./cubismviewmatrix */ "../../../Framework/src/math/cubismviewmatrix.ts"));
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    Live2DCubismFramework.CubismViewMatrix = $.CubismViewMatrix;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));


/***/ }),

/***/ "./src/lappdefine.ts":
/*!***************************!*\
  !*** ./src/lappdefine.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RenderTargetHeight = exports.RenderTargetWidth = exports.CubismLoggingLevel = exports.DebugTouchLogEnable = exports.DebugLogEnable = exports.MOCConsistencyValidationEnable = exports.PriorityForce = exports.PriorityNormal = exports.PriorityIdle = exports.PriorityNone = exports.HitAreaNameBody = exports.HitAreaNameHead = exports.MotionGroupTapBody = exports.MotionGroupIdle = exports.ModelDirSize = exports.ModelDir = exports.PowerImageName = exports.GearImageName = exports.BackImageName = exports.ResourcesPath = exports.ViewLogicalMaxTop = exports.ViewLogicalMaxBottom = exports.ViewLogicalMaxRight = exports.ViewLogicalMaxLeft = exports.ViewLogicalTop = exports.ViewLogicalBottom = exports.ViewLogicalRight = exports.ViewLogicalLeft = exports.ViewMinScale = exports.ViewMaxScale = exports.ViewScale = exports.CanvasSize = void 0;
var live2dcubismframework_1 = __webpack_require__(/*! @framework/live2dcubismframework */ "../../../Framework/src/live2dcubismframework.ts");
exports.CanvasSize = 'auto';
exports.ViewScale = 1.0;
exports.ViewMaxScale = 2.0;
exports.ViewMinScale = 0.8;
exports.ViewLogicalLeft = -1.0;
exports.ViewLogicalRight = 1.0;
exports.ViewLogicalBottom = -1.0;
exports.ViewLogicalTop = 1.0;
exports.ViewLogicalMaxLeft = -2.0;
exports.ViewLogicalMaxRight = 2.0;
exports.ViewLogicalMaxBottom = -2.0;
exports.ViewLogicalMaxTop = 2.0;
exports.ResourcesPath = '../../Resources/';
exports.BackImageName = 'back_class_normal.png';
exports.GearImageName = 'icon_gear.png';
exports.PowerImageName = 'CloseNormal.png';
exports.ModelDir = [
    'Haru',
    'Hiyori',
    'Mark',
    'Natori',
    'Rice',
    'Mao'
];
exports.ModelDirSize = exports.ModelDir.length;
exports.MotionGroupIdle = 'Idle';
exports.MotionGroupTapBody = 'TapBody';
exports.HitAreaNameHead = 'Head';
exports.HitAreaNameBody = 'Body';
exports.PriorityNone = 0;
exports.PriorityIdle = 1;
exports.PriorityNormal = 2;
exports.PriorityForce = 3;
exports.MOCConsistencyValidationEnable = true;
exports.DebugLogEnable = true;
exports.DebugTouchLogEnable = false;
exports.CubismLoggingLevel = live2dcubismframework_1.LogLevel.LogLevel_Verbose;
exports.RenderTargetWidth = 1900;
exports.RenderTargetHeight = 1000;


/***/ }),

/***/ "./src/lappdelegate.ts":
/*!*****************************!*\
  !*** ./src/lappdelegate.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LAppDelegate = exports.frameBuffer = exports.gl = exports.s_instance = exports.canvas = void 0;
var live2dcubismframework_1 = __webpack_require__(/*! @framework/live2dcubismframework */ "../../../Framework/src/live2dcubismframework.ts");
var LAppDefine = __importStar(__webpack_require__(/*! ./lappdefine */ "./src/lappdefine.ts"));
var lapplive2dmanager_1 = __webpack_require__(/*! ./lapplive2dmanager */ "./src/lapplive2dmanager.ts");
var lapppal_1 = __webpack_require__(/*! ./lapppal */ "./src/lapppal.ts");
var lapptexturemanager_1 = __webpack_require__(/*! ./lapptexturemanager */ "./src/lapptexturemanager.ts");
var lappview_1 = __webpack_require__(/*! ./lappview */ "./src/lappview.ts");
exports.canvas = null;
exports.s_instance = null;
exports.gl = null;
exports.frameBuffer = null;
var LAppDelegate = (function () {
    function LAppDelegate() {
        this._captured = false;
        this._mouseX = 0.0;
        this._mouseY = 0.0;
        this._isEnd = false;
        this._cubismOption = new live2dcubismframework_1.Option();
        this._view = new lappview_1.LAppView();
        this._textureManager = new lapptexturemanager_1.LAppTextureManager();
    }
    LAppDelegate.getInstance = function () {
        if (exports.s_instance == null) {
            exports.s_instance = new LAppDelegate();
        }
        return exports.s_instance;
    };
    LAppDelegate.releaseInstance = function () {
        if (exports.s_instance != null) {
            exports.s_instance.release();
        }
        exports.s_instance = null;
    };
    LAppDelegate.prototype.initialize = function () {
        exports.canvas = document.createElement('canvas');
        if (LAppDefine.CanvasSize === 'auto') {
            this._resizeCanvas();
        }
        else {
            exports.canvas.width = LAppDefine.CanvasSize.width;
            exports.canvas.height = LAppDefine.CanvasSize.height;
        }
        exports.gl = exports.canvas.getContext('webgl') || exports.canvas.getContext('experimental-webgl');
        if (!exports.gl) {
            alert('Cannot initialize WebGL. This browser does not support.');
            exports.gl = null;
            document.body.innerHTML =
                'This browser does not support the <code>&lt;canvas&gt;</code> element.';
            return false;
        }
        document.body.appendChild(exports.canvas);
        if (!exports.frameBuffer) {
            exports.frameBuffer = exports.gl.getParameter(exports.gl.FRAMEBUFFER_BINDING);
        }
        exports.gl.enable(exports.gl.BLEND);
        exports.gl.blendFunc(exports.gl.SRC_ALPHA, exports.gl.ONE_MINUS_SRC_ALPHA);
        var supportTouch = 'ontouchend' in exports.canvas;
        if (supportTouch) {
            exports.canvas.ontouchstart = onTouchBegan;
            exports.canvas.ontouchmove = onTouchMoved;
            exports.canvas.ontouchend = onTouchEnded;
            exports.canvas.ontouchcancel = onTouchCancel;
        }
        else {
            exports.canvas.onmousedown = onClickBegan;
            exports.canvas.onmousemove = onMouseMoved;
            exports.canvas.onmouseup = onClickEnded;
        }
        this._view.initialize();
        this.initializeCubism();
        return true;
    };
    LAppDelegate.prototype.onResize = function () {
        this._resizeCanvas();
        this._view.initialize();
        this._view.initializeSprite();
        var viewport = [0, 0, exports.canvas.width, exports.canvas.height];
        exports.gl.viewport(viewport[0], viewport[1], viewport[2], viewport[3]);
    };
    LAppDelegate.prototype.release = function () {
        this._textureManager.release();
        this._textureManager = null;
        this._view.release();
        this._view = null;
        lapplive2dmanager_1.LAppLive2DManager.releaseInstance();
        live2dcubismframework_1.CubismFramework.dispose();
    };
    LAppDelegate.prototype.run = function () {
        var _this = this;
        var loop = function () {
            if (exports.s_instance == null) {
                return;
            }
            lapppal_1.LAppPal.updateTime();
            exports.gl.clearColor(0.0, 0.0, 0.0, 1.0);
            exports.gl.enable(exports.gl.DEPTH_TEST);
            exports.gl.depthFunc(exports.gl.LEQUAL);
            exports.gl.clear(exports.gl.COLOR_BUFFER_BIT | exports.gl.DEPTH_BUFFER_BIT);
            exports.gl.clearDepth(1.0);
            exports.gl.enable(exports.gl.BLEND);
            exports.gl.blendFunc(exports.gl.SRC_ALPHA, exports.gl.ONE_MINUS_SRC_ALPHA);
            _this._view.render();
            requestAnimationFrame(loop);
        };
        loop();
    };
    LAppDelegate.prototype.createShader = function () {
        var vertexShaderId = exports.gl.createShader(exports.gl.VERTEX_SHADER);
        if (vertexShaderId == null) {
            lapppal_1.LAppPal.printMessage('failed to create vertexShader');
            return null;
        }
        var vertexShader = 'precision mediump float;' +
            'attribute vec3 position;' +
            'attribute vec2 uv;' +
            'varying vec2 vuv;' +
            'void main(void)' +
            '{' +
            '   gl_Position = vec4(position, 1.0);' +
            '   vuv = uv;' +
            '}';
        exports.gl.shaderSource(vertexShaderId, vertexShader);
        exports.gl.compileShader(vertexShaderId);
        var fragmentShaderId = exports.gl.createShader(exports.gl.FRAGMENT_SHADER);
        if (fragmentShaderId == null) {
            lapppal_1.LAppPal.printMessage('failed to create fragmentShader');
            return null;
        }
        var fragmentShader = 'precision mediump float;' +
            'varying vec2 vuv;' +
            'uniform sampler2D texture;' +
            'void main(void)' +
            '{' +
            '   gl_FragColor = texture2D(texture, vuv);' +
            '}';
        exports.gl.shaderSource(fragmentShaderId, fragmentShader);
        exports.gl.compileShader(fragmentShaderId);
        var programId = exports.gl.createProgram();
        exports.gl.attachShader(programId, vertexShaderId);
        exports.gl.attachShader(programId, fragmentShaderId);
        exports.gl.deleteShader(vertexShaderId);
        exports.gl.deleteShader(fragmentShaderId);
        exports.gl.linkProgram(programId);
        exports.gl.useProgram(programId);
        return programId;
    };
    LAppDelegate.prototype.getView = function () {
        return this._view;
    };
    LAppDelegate.prototype.getTextureManager = function () {
        return this._textureManager;
    };
    LAppDelegate.prototype.initializeCubism = function () {
        this._cubismOption.logFunction = lapppal_1.LAppPal.printMessage;
        this._cubismOption.loggingLevel = LAppDefine.CubismLoggingLevel;
        live2dcubismframework_1.CubismFramework.startUp(this._cubismOption);
        live2dcubismframework_1.CubismFramework.initialize();
        lapplive2dmanager_1.LAppLive2DManager.getInstance();
        lapppal_1.LAppPal.updateTime();
        this._view.initializeSprite();
    };
    LAppDelegate.prototype._resizeCanvas = function () {
        exports.canvas.width = window.innerWidth;
        exports.canvas.height = window.innerHeight;
    };
    return LAppDelegate;
}());
exports.LAppDelegate = LAppDelegate;
function onClickBegan(e) {
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    LAppDelegate.getInstance()._captured = true;
    var posX = e.pageX;
    var posY = e.pageY;
    LAppDelegate.getInstance()._view.onTouchesBegan(posX, posY);
}
function onMouseMoved(e) {
    if (!LAppDelegate.getInstance()._captured) {
        return;
    }
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.clientX - rect.left;
    var posY = e.clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesMoved(posX, posY);
}
function onClickEnded(e) {
    LAppDelegate.getInstance()._captured = false;
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.clientX - rect.left;
    var posY = e.clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}
function onTouchBegan(e) {
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    LAppDelegate.getInstance()._captured = true;
    var posX = e.changedTouches[0].pageX;
    var posY = e.changedTouches[0].pageY;
    LAppDelegate.getInstance()._view.onTouchesBegan(posX, posY);
}
function onTouchMoved(e) {
    if (!LAppDelegate.getInstance()._captured) {
        return;
    }
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.changedTouches[0].clientX - rect.left;
    var posY = e.changedTouches[0].clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesMoved(posX, posY);
}
function onTouchEnded(e) {
    LAppDelegate.getInstance()._captured = false;
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.changedTouches[0].clientX - rect.left;
    var posY = e.changedTouches[0].clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}
function onTouchCancel(e) {
    LAppDelegate.getInstance()._captured = false;
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.changedTouches[0].clientX - rect.left;
    var posY = e.changedTouches[0].clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}


/***/ }),

/***/ "./src/lappsprite.ts":
/*!***************************!*\
  !*** ./src/lappsprite.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rect = exports.LAppSprite = void 0;
var lappdelegate_1 = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
var LAppSprite = (function () {
    function LAppSprite(x, y, width, height, textureId) {
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
    LAppSprite.prototype.release = function () {
        this._rect = null;
        lappdelegate_1.gl.deleteTexture(this._texture);
        this._texture = null;
        lappdelegate_1.gl.deleteBuffer(this._uvBuffer);
        this._uvBuffer = null;
        lappdelegate_1.gl.deleteBuffer(this._vertexBuffer);
        this._vertexBuffer = null;
        lappdelegate_1.gl.deleteBuffer(this._indexBuffer);
        this._indexBuffer = null;
    };
    LAppSprite.prototype.getTexture = function () {
        return this._texture;
    };
    LAppSprite.prototype.render = function (programId) {
        if (this._texture == null) {
            return;
        }
        if (this._firstDraw) {
            this._positionLocation = lappdelegate_1.gl.getAttribLocation(programId, 'position');
            lappdelegate_1.gl.enableVertexAttribArray(this._positionLocation);
            this._uvLocation = lappdelegate_1.gl.getAttribLocation(programId, 'uv');
            lappdelegate_1.gl.enableVertexAttribArray(this._uvLocation);
            this._textureLocation = lappdelegate_1.gl.getUniformLocation(programId, 'texture');
            lappdelegate_1.gl.uniform1i(this._textureLocation, 0);
            {
                this._uvArray = new Float32Array([
                    1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0
                ]);
                this._uvBuffer = lappdelegate_1.gl.createBuffer();
            }
            {
                var maxWidth = lappdelegate_1.canvas.width;
                var maxHeight = lappdelegate_1.canvas.height;
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
                this._vertexBuffer = lappdelegate_1.gl.createBuffer();
            }
            {
                this._indexArray = new Uint16Array([0, 1, 2, 3, 2, 0]);
                this._indexBuffer = lappdelegate_1.gl.createBuffer();
            }
            this._firstDraw = false;
        }
        lappdelegate_1.gl.bindBuffer(lappdelegate_1.gl.ARRAY_BUFFER, this._uvBuffer);
        lappdelegate_1.gl.bufferData(lappdelegate_1.gl.ARRAY_BUFFER, this._uvArray, lappdelegate_1.gl.STATIC_DRAW);
        lappdelegate_1.gl.vertexAttribPointer(this._uvLocation, 2, lappdelegate_1.gl.FLOAT, false, 0, 0);
        lappdelegate_1.gl.bindBuffer(lappdelegate_1.gl.ARRAY_BUFFER, this._vertexBuffer);
        lappdelegate_1.gl.bufferData(lappdelegate_1.gl.ARRAY_BUFFER, this._positionArray, lappdelegate_1.gl.STATIC_DRAW);
        lappdelegate_1.gl.vertexAttribPointer(this._positionLocation, 2, lappdelegate_1.gl.FLOAT, false, 0, 0);
        lappdelegate_1.gl.bindBuffer(lappdelegate_1.gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
        lappdelegate_1.gl.bufferData(lappdelegate_1.gl.ELEMENT_ARRAY_BUFFER, this._indexArray, lappdelegate_1.gl.DYNAMIC_DRAW);
        lappdelegate_1.gl.bindTexture(lappdelegate_1.gl.TEXTURE_2D, this._texture);
        lappdelegate_1.gl.drawElements(lappdelegate_1.gl.TRIANGLES, this._indexArray.length, lappdelegate_1.gl.UNSIGNED_SHORT, 0);
    };
    LAppSprite.prototype.isHit = function (pointX, pointY) {
        var height = lappdelegate_1.canvas.height;
        var y = height - pointY;
        return (pointX >= this._rect.left &&
            pointX <= this._rect.right &&
            y <= this._rect.up &&
            y >= this._rect.down);
    };
    return LAppSprite;
}());
exports.LAppSprite = LAppSprite;
var Rect = (function () {
    function Rect() {
    }
    return Rect;
}());
exports.Rect = Rect;


/***/ }),

/***/ "./src/lapptexturemanager.ts":
/*!***********************************!*\
  !*** ./src/lapptexturemanager.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TextureInfo = exports.LAppTextureManager = void 0;
var csmvector_1 = __webpack_require__(/*! @framework/type/csmvector */ "../../../Framework/src/type/csmvector.ts");
var lappdelegate_1 = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
var LAppTextureManager = (function () {
    function LAppTextureManager() {
        this._textures = new csmvector_1.csmVector();
    }
    LAppTextureManager.prototype.release = function () {
        for (var ite = this._textures.begin(); ite.notEqual(this._textures.end()); ite.preIncrement()) {
            lappdelegate_1.gl.deleteTexture(ite.ptr().id);
        }
        this._textures = null;
    };
    LAppTextureManager.prototype.createTextureFromPngFile = function (fileName, usePremultiply, callback) {
        var _this = this;
        var _loop_1 = function (ite) {
            if (ite.ptr().fileName == fileName &&
                ite.ptr().usePremultply == usePremultiply) {
                ite.ptr().img = new Image();
                ite.ptr().img.onload = function () { return callback(ite.ptr()); };
                ite.ptr().img.src = fileName;
                return { value: void 0 };
            }
        };
        for (var ite = this._textures.begin(); ite.notEqual(this._textures.end()); ite.preIncrement()) {
            var state_1 = _loop_1(ite);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        var img = new Image();
        img.onload = function () {
            var tex = lappdelegate_1.gl.createTexture();
            lappdelegate_1.gl.bindTexture(lappdelegate_1.gl.TEXTURE_2D, tex);
            lappdelegate_1.gl.texParameteri(lappdelegate_1.gl.TEXTURE_2D, lappdelegate_1.gl.TEXTURE_MIN_FILTER, lappdelegate_1.gl.LINEAR_MIPMAP_LINEAR);
            lappdelegate_1.gl.texParameteri(lappdelegate_1.gl.TEXTURE_2D, lappdelegate_1.gl.TEXTURE_MAG_FILTER, lappdelegate_1.gl.LINEAR);
            if (usePremultiply) {
                lappdelegate_1.gl.pixelStorei(lappdelegate_1.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
            }
            lappdelegate_1.gl.texImage2D(lappdelegate_1.gl.TEXTURE_2D, 0, lappdelegate_1.gl.RGBA, lappdelegate_1.gl.RGBA, lappdelegate_1.gl.UNSIGNED_BYTE, img);
            lappdelegate_1.gl.generateMipmap(lappdelegate_1.gl.TEXTURE_2D);
            lappdelegate_1.gl.bindTexture(lappdelegate_1.gl.TEXTURE_2D, null);
            var textureInfo = new TextureInfo();
            if (textureInfo != null) {
                textureInfo.fileName = fileName;
                textureInfo.width = img.width;
                textureInfo.height = img.height;
                textureInfo.id = tex;
                textureInfo.img = img;
                textureInfo.usePremultply = usePremultiply;
                _this._textures.pushBack(textureInfo);
            }
            callback(textureInfo);
        };
        img.src = fileName;
    };
    LAppTextureManager.prototype.releaseTextures = function () {
        for (var i = 0; i < this._textures.getSize(); i++) {
            this._textures.set(i, null);
        }
        this._textures.clear();
    };
    LAppTextureManager.prototype.releaseTextureByTexture = function (texture) {
        for (var i = 0; i < this._textures.getSize(); i++) {
            if (this._textures.at(i).id != texture) {
                continue;
            }
            this._textures.set(i, null);
            this._textures.remove(i);
            break;
        }
    };
    LAppTextureManager.prototype.releaseTextureByFilePath = function (fileName) {
        for (var i = 0; i < this._textures.getSize(); i++) {
            if (this._textures.at(i).fileName == fileName) {
                this._textures.set(i, null);
                this._textures.remove(i);
                break;
            }
        }
    };
    return LAppTextureManager;
}());
exports.LAppTextureManager = LAppTextureManager;
var TextureInfo = (function () {
    function TextureInfo() {
        this.id = null;
        this.width = 0;
        this.height = 0;
    }
    return TextureInfo;
}());
exports.TextureInfo = TextureInfo;


/***/ }),

/***/ "./src/lappview.ts":
/*!*************************!*\
  !*** ./src/lappview.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LAppView = void 0;
var cubismmatrix44_1 = __webpack_require__(/*! @framework/math/cubismmatrix44 */ "../../../Framework/src/math/cubismmatrix44.ts");
var cubismviewmatrix_1 = __webpack_require__(/*! @framework/math/cubismviewmatrix */ "../../../Framework/src/math/cubismviewmatrix.ts");
var LAppDefine = __importStar(__webpack_require__(/*! ./lappdefine */ "./src/lappdefine.ts"));
var lappdelegate_1 = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
var lapplive2dmanager_1 = __webpack_require__(/*! ./lapplive2dmanager */ "./src/lapplive2dmanager.ts");
var lapppal_1 = __webpack_require__(/*! ./lapppal */ "./src/lapppal.ts");
var lappsprite_1 = __webpack_require__(/*! ./lappsprite */ "./src/lappsprite.ts");
var touchmanager_1 = __webpack_require__(/*! ./touchmanager */ "./src/touchmanager.ts");
var LAppView = (function () {
    function LAppView() {
        this._programId = null;
        this._back = null;
        this._gear = null;
        this._touchManager = new touchmanager_1.TouchManager();
        this._deviceToScreen = new cubismmatrix44_1.CubismMatrix44();
        this._viewMatrix = new cubismviewmatrix_1.CubismViewMatrix();
    }
    LAppView.prototype.initialize = function () {
        var width = lappdelegate_1.canvas.width, height = lappdelegate_1.canvas.height;
        var ratio = width / height;
        var left = -ratio;
        var right = ratio;
        var bottom = LAppDefine.ViewLogicalLeft;
        var top = LAppDefine.ViewLogicalRight;
        this._viewMatrix.setScreenRect(left, right, bottom, top);
        this._viewMatrix.scale(LAppDefine.ViewScale, LAppDefine.ViewScale);
        this._deviceToScreen.loadIdentity();
        if (width > height) {
            var screenW = Math.abs(right - left);
            this._deviceToScreen.scaleRelative(screenW / width, -screenW / width);
        }
        else {
            var screenH = Math.abs(top - bottom);
            this._deviceToScreen.scaleRelative(screenH / height, -screenH / height);
        }
        this._deviceToScreen.translateRelative(-width * 0.5, -height * 0.5);
        this._viewMatrix.setMaxScale(LAppDefine.ViewMaxScale);
        this._viewMatrix.setMinScale(LAppDefine.ViewMinScale);
        this._viewMatrix.setMaxScreenRect(LAppDefine.ViewLogicalMaxLeft, LAppDefine.ViewLogicalMaxRight, LAppDefine.ViewLogicalMaxBottom, LAppDefine.ViewLogicalMaxTop);
    };
    LAppView.prototype.release = function () {
        this._viewMatrix = null;
        this._touchManager = null;
        this._deviceToScreen = null;
        this._gear.release();
        this._gear = null;
        this._back.release();
        this._back = null;
        lappdelegate_1.gl.deleteProgram(this._programId);
        this._programId = null;
    };
    LAppView.prototype.render = function () {
        lappdelegate_1.gl.useProgram(this._programId);
        if (this._back) {
            this._back.render(this._programId);
        }
        if (this._gear) {
            this._gear.render(this._programId);
        }
        lappdelegate_1.gl.flush();
        var live2DManager = lapplive2dmanager_1.LAppLive2DManager.getInstance();
        live2DManager.setViewMatrix(this._viewMatrix);
        live2DManager.onUpdate();
    };
    LAppView.prototype.initializeSprite = function () {
        var _this = this;
        var width = lappdelegate_1.canvas.width;
        var height = lappdelegate_1.canvas.height;
        var textureManager = lappdelegate_1.LAppDelegate.getInstance().getTextureManager();
        var resourcesPath = LAppDefine.ResourcesPath;
        var imageName = '';
        imageName = LAppDefine.BackImageName;
        var initBackGroundTexture = function (textureInfo) {
            var x = width * 0.5;
            var y = height * 0.5;
            var fwidth = textureInfo.width * 2.0;
            var fheight = height * 0.95;
            _this._back = new lappsprite_1.LAppSprite(x, y, fwidth, fheight, textureInfo.id);
        };
        textureManager.createTextureFromPngFile(resourcesPath + imageName, false, initBackGroundTexture);
        imageName = LAppDefine.GearImageName;
        var initGearTexture = function (textureInfo) {
            var x = width - textureInfo.width * 0.5;
            var y = height - textureInfo.height * 0.5;
            var fwidth = textureInfo.width;
            var fheight = textureInfo.height;
            _this._gear = new lappsprite_1.LAppSprite(x, y, fwidth, fheight, textureInfo.id);
        };
        textureManager.createTextureFromPngFile(resourcesPath + imageName, false, initGearTexture);
        if (this._programId == null) {
            this._programId = lappdelegate_1.LAppDelegate.getInstance().createShader();
        }
    };
    LAppView.prototype.onTouchesBegan = function (pointX, pointY) {
        this._touchManager.touchesBegan(pointX, pointY);
    };
    LAppView.prototype.onTouchesMoved = function (pointX, pointY) {
        var viewX = this.transformViewX(this._touchManager.getX());
        var viewY = this.transformViewY(this._touchManager.getY());
        this._touchManager.touchesMoved(pointX, pointY);
        var live2DManager = lapplive2dmanager_1.LAppLive2DManager.getInstance();
        live2DManager.onDrag(viewX, viewY);
    };
    LAppView.prototype.onTouchesEnded = function (pointX, pointY) {
        var live2DManager = lapplive2dmanager_1.LAppLive2DManager.getInstance();
        live2DManager.onDrag(0.0, 0.0);
        {
            var x = this._deviceToScreen.transformX(this._touchManager.getX());
            var y = this._deviceToScreen.transformY(this._touchManager.getY());
            if (LAppDefine.DebugTouchLogEnable) {
                lapppal_1.LAppPal.printMessage("[APP]touchesEnded x: ".concat(x, " y: ").concat(y));
            }
            live2DManager.onTap(x, y);
            if (this._gear.isHit(pointX, pointY)) {
                live2DManager.nextScene();
            }
        }
    };
    LAppView.prototype.transformViewX = function (deviceX) {
        var screenX = this._deviceToScreen.transformX(deviceX);
        return this._viewMatrix.invertTransformX(screenX);
    };
    LAppView.prototype.transformViewY = function (deviceY) {
        var screenY = this._deviceToScreen.transformY(deviceY);
        return this._viewMatrix.invertTransformY(screenY);
    };
    LAppView.prototype.transformScreenX = function (deviceX) {
        return this._deviceToScreen.transformX(deviceX);
    };
    LAppView.prototype.transformScreenY = function (deviceY) {
        return this._deviceToScreen.transformY(deviceY);
    };
    return LAppView;
}());
exports.LAppView = LAppView;


/***/ }),

/***/ "./src/touchmanager.ts":
/*!*****************************!*\
  !*** ./src/touchmanager.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TouchManager = void 0;
var TouchManager = (function () {
    function TouchManager() {
        this._startX = 0.0;
        this._startY = 0.0;
        this._lastX = 0.0;
        this._lastY = 0.0;
        this._lastX1 = 0.0;
        this._lastY1 = 0.0;
        this._lastX2 = 0.0;
        this._lastY2 = 0.0;
        this._lastTouchDistance = 0.0;
        this._deltaX = 0.0;
        this._deltaY = 0.0;
        this._scale = 1.0;
        this._touchSingle = false;
        this._flipAvailable = false;
    }
    TouchManager.prototype.getCenterX = function () {
        return this._lastX;
    };
    TouchManager.prototype.getCenterY = function () {
        return this._lastY;
    };
    TouchManager.prototype.getDeltaX = function () {
        return this._deltaX;
    };
    TouchManager.prototype.getDeltaY = function () {
        return this._deltaY;
    };
    TouchManager.prototype.getStartX = function () {
        return this._startX;
    };
    TouchManager.prototype.getStartY = function () {
        return this._startY;
    };
    TouchManager.prototype.getScale = function () {
        return this._scale;
    };
    TouchManager.prototype.getX = function () {
        return this._lastX;
    };
    TouchManager.prototype.getY = function () {
        return this._lastY;
    };
    TouchManager.prototype.getX1 = function () {
        return this._lastX1;
    };
    TouchManager.prototype.getY1 = function () {
        return this._lastY1;
    };
    TouchManager.prototype.getX2 = function () {
        return this._lastX2;
    };
    TouchManager.prototype.getY2 = function () {
        return this._lastY2;
    };
    TouchManager.prototype.isSingleTouch = function () {
        return this._touchSingle;
    };
    TouchManager.prototype.isFlickAvailable = function () {
        return this._flipAvailable;
    };
    TouchManager.prototype.disableFlick = function () {
        this._flipAvailable = false;
    };
    TouchManager.prototype.touchesBegan = function (deviceX, deviceY) {
        this._lastX = deviceX;
        this._lastY = deviceY;
        this._startX = deviceX;
        this._startY = deviceY;
        this._lastTouchDistance = -1.0;
        this._flipAvailable = true;
        this._touchSingle = true;
    };
    TouchManager.prototype.touchesMoved = function (deviceX, deviceY) {
        this._lastX = deviceX;
        this._lastY = deviceY;
        this._lastTouchDistance = -1.0;
        this._touchSingle = true;
    };
    TouchManager.prototype.getFlickDistance = function () {
        return this.calculateDistance(this._startX, this._startY, this._lastX, this._lastY);
    };
    TouchManager.prototype.calculateDistance = function (x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    };
    TouchManager.prototype.calculateMovingAmount = function (v1, v2) {
        if (v1 > 0.0 != v2 > 0.0) {
            return 0.0;
        }
        var sign = v1 > 0.0 ? 1.0 : -1.0;
        var absoluteValue1 = Math.abs(v1);
        var absoluteValue2 = Math.abs(v2);
        return (sign * (absoluteValue1 < absoluteValue2 ? absoluteValue1 : absoluteValue2));
    };
    return TouchManager;
}());
exports.TouchManager = TouchManager;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "bd10ea3f092833cbc73b"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5kNjFiMmU5ZGViNjYxYWY0ZGJjOS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0Esb0hBQWtEO0FBT2xEO0lBQXNDLG9DQUFjO0lBSWxEO1FBQUEsWUFDRSxpQkFBTyxTQVdSO1FBVkMsS0FBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDdkIsS0FBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFDeEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFDdEIsS0FBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7UUFDekIsS0FBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDcEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDckIsS0FBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsS0FBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFDdEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDckIsS0FBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7O0lBQ3ZCLENBQUM7SUFRTSwwQ0FBZSxHQUF0QixVQUF1QixDQUFTLEVBQUUsQ0FBUztRQUN6QyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN2RSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNuRTtRQUVELElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENB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QUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsT0FBTyxDQUNMLElBQUksR0FBRyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQzNFLENBQUM7SUFDSixDQUFDO0lBZ0JILG1CQUFDO0FBQUQsQ0FBQztBQWxMWSxvQ0FBWTs7Ozs7Ozs7O1VDUHpCLHFDQUFxQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uLi8uLi8uLi9GcmFtZXdvcmsvc3JjL21hdGgvY3ViaXNtdmlld21hdHJpeC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFwcGRlZmluZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGFwcGRlbGVnYXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9sYXBwc3ByaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9sYXBwdGV4dHVyZW1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xhcHB2aWV3LnRzIiwid2VicGFjazovLy8uL3NyYy90b3VjaG1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cbiAqL1xuXG5pbXBvcnQgeyBDdWJpc21NYXRyaXg0NCB9IGZyb20gJy4vY3ViaXNtbWF0cml4NDQnO1xuXG4vKipcbiAqIOOCq+ODoeODqeOBruS9jee9ruWkieabtOOBq+S9v+OBhuOBqOS+v+WIqeOBqjR4NOihjOWIl1xuICpcbiAqIOOCq+ODoeODqeOBruS9jee9ruWkieabtOOBq+S9v+OBhuOBqOS+v+WIqeOBqjR4NOihjOWIl+OBruOCr+ODqeOCueOAglxuICovXG5leHBvcnQgY2xhc3MgQ3ViaXNtVmlld01hdHJpeCBleHRlbmRzIEN1YmlzbU1hdHJpeDQ0IHtcbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv1xuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fc2NyZWVuTGVmdCA9IDAuMDtcbiAgICB0aGlzLl9zY3JlZW5SaWdodCA9IDAuMDtcbiAgICB0aGlzLl9zY3JlZW5Ub3AgPSAwLjA7XG4gICAgdGhpcy5fc2NyZWVuQm90dG9tID0gMC4wO1xuICAgIHRoaXMuX21heExlZnQgPSAwLjA7XG4gICAgdGhpcy5fbWF4UmlnaHQgPSAwLjA7XG4gICAgdGhpcy5fbWF4VG9wID0gMC4wO1xuICAgIHRoaXMuX21heEJvdHRvbSA9IDAuMDtcbiAgICB0aGlzLl9tYXhTY2FsZSA9IDAuMDtcbiAgICB0aGlzLl9taW5TY2FsZSA9IDAuMDtcbiAgfVxuXG4gIC8qKlxuICAgKiDnp7vli5XjgpLoqr/mlbRcbiAgICpcbiAgICogQHBhcmFtIHggWOi7uOOBruenu+WLlemHj1xuICAgKiBAcGFyYW0geSBZ6Lu444Gu56e75YuV6YePXG4gICAqL1xuICBwdWJsaWMgYWRqdXN0VHJhbnNsYXRlKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3RyWzBdICogdGhpcy5fbWF4TGVmdCArICh0aGlzLl90clsxMl0gKyB4KSA+IHRoaXMuX3NjcmVlbkxlZnQpIHtcbiAgICAgIHggPSB0aGlzLl9zY3JlZW5MZWZ0IC0gdGhpcy5fdHJbMF0gKiB0aGlzLl9tYXhMZWZ0IC0gdGhpcy5fdHJbMTJdO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl90clswXSAqIHRoaXMuX21heFJpZ2h0ICsgKHRoaXMuX3RyWzEyXSArIHgpIDwgdGhpcy5fc2NyZWVuUmlnaHQpIHtcbiAgICAgIHggPSB0aGlzLl9zY3JlZW5SaWdodCAtIHRoaXMuX3RyWzBdICogdGhpcy5fbWF4UmlnaHQgLSB0aGlzLl90clsxMl07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3RyWzVdICogdGhpcy5fbWF4VG9wICsgKHRoaXMuX3RyWzEzXSArIHkpIDwgdGhpcy5fc2NyZWVuVG9wKSB7XG4gICAgICB5ID0gdGhpcy5fc2NyZWVuVG9wIC0gdGhpcy5fdHJbNV0gKiB0aGlzLl9tYXhUb3AgLSB0aGlzLl90clsxM107XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5fdHJbNV0gKiB0aGlzLl9tYXhCb3R0b20gKyAodGhpcy5fdHJbMTNdICsgeSkgPlxuICAgICAgdGhpcy5fc2NyZWVuQm90dG9tXG4gICAgKSB7XG4gICAgICB5ID0gdGhpcy5fc2NyZWVuQm90dG9tIC0gdGhpcy5fdHJbNV0gKiB0aGlzLl9tYXhCb3R0b20gLSB0aGlzLl90clsxM107XG4gICAgfVxuXG4gICAgY29uc3QgdHIxOiBGbG9hdDMyQXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAgIDEuMCxcbiAgICAgIDAuMCxcbiAgICAgIDAuMCxcbiAgICAgIDAuMCxcbiAgICAgIDAuMCxcbiAgICAgIDEuMCxcbiAgICAgIDAuMCxcbiAgICAgIDAuMCxcbiAgICAgIDAuMCxcbiAgICAgIDAuMCxcbiAgICAgIDEuMCxcbiAgICAgIDAuMCxcbiAgICAgIHgsXG4gICAgICB5LFxuICAgICAgMC4wLFxuICAgICAgMS4wLFxuICAgIF0pO1xuXG4gICAgQ3ViaXNtTWF0cml4NDQubXVsdGlwbHkodHIxLCB0aGlzLl90ciwgdGhpcy5fdHIpO1xuICB9XG5cbiAgLyoqXG4gICAqIOaLoeWkp+eOh+OCkuiqv+aVtFxuICAgKlxuICAgKiBAcGFyYW0gY3gg5ouh5aSn44KS6KGM44GGWOi7uOOBruS4reW/g+S9jee9rlxuICAgKiBAcGFyYW0gY3kg5ouh5aSn44KS6KGM44GGWei7uOOBruS4reW/g+S9jee9rlxuICAgKiBAcGFyYW0gc2NhbGUg5ouh5aSn546HXG4gICAqL1xuICBwdWJsaWMgYWRqdXN0U2NhbGUoY3g6IG51bWJlciwgY3k6IG51bWJlciwgc2NhbGU6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IG1heFNjYWxlOiBudW1iZXIgPSB0aGlzLmdldE1heFNjYWxlKCk7XG4gICAgY29uc3QgbWluU2NhbGU6IG51bWJlciA9IHRoaXMuZ2V0TWluU2NhbGUoKTtcblxuICAgIGNvbnN0IHRhcmdldFNjYWxlID0gc2NhbGUgKiB0aGlzLl90clswXTtcblxuICAgIGlmICh0YXJnZXRTY2FsZSA8IG1pblNjYWxlKSB7XG4gICAgICBpZiAodGhpcy5fdHJbMF0gPiAwLjApIHtcbiAgICAgICAgc2NhbGUgPSBtaW5TY2FsZSAvIHRoaXMuX3RyWzBdO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGFyZ2V0U2NhbGUgPiBtYXhTY2FsZSkge1xuICAgICAgaWYgKHRoaXMuX3RyWzBdID4gMC4wKSB7XG4gICAgICAgIHNjYWxlID0gbWF4U2NhbGUgLyB0aGlzLl90clswXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB0cjE6IEZsb2F0MzJBcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkoW1xuICAgICAgMS4wLFxuICAgICAgMC4wLFxuICAgICAgMC4wLFxuICAgICAgMC4wLFxuICAgICAgMC4wLFxuICAgICAgMS4wLFxuICAgICAgMC4wLFxuICAgICAgMC4wLFxuICAgICAgMC4wLFxuICAgICAgMC4wLFxuICAgICAgMS4wLFxuICAgICAgMC4wLFxuICAgICAgY3gsXG4gICAgICBjeSxcbiAgICAgIDAuMCxcbiAgICAgIDEuMCxcbiAgICBdKTtcblxuICAgIGNvbnN0IHRyMjogRmxvYXQzMkFycmF5ID0gbmV3IEZsb2F0MzJBcnJheShbXG4gICAgICBzY2FsZSxcbiAgICAgIDAuMCxcbiAgICAgIDAuMCxcbiAgICAgIDAuMCxcbiAgICAgIDAuMCxcbiAgICAgIHNjYWxlLFxuICAgICAgMC4wLFxuICAgICAgMC4wLFxuICAgICAgMC4wLFxuICAgICAgMC4wLFxuICAgICAgMS4wLFxuICAgICAgMC4wLFxuICAgICAgMC4wLFxuICAgICAgMC4wLFxuICAgICAgMC4wLFxuICAgICAgMS4wLFxuICAgIF0pO1xuXG4gICAgY29uc3QgdHIzOiBGbG9hdDMyQXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAgIDEuMCxcbiAgICAgIDAuMCxcbiAgICAgIDAuMCxcbiAgICAgIDAuMCxcbiAgICAgIDAuMCxcbiAgICAgIDEuMCxcbiAgICAgIDAuMCxcbiAgICAgIDAuMCxcbiAgICAgIDAuMCxcbiAgICAgIDAuMCxcbiAgICAgIDEuMCxcbiAgICAgIDAuMCxcbiAgICAgIC1jeCxcbiAgICAgIC1jeSxcbiAgICAgIDAuMCxcbiAgICAgIDEuMCxcbiAgICBdKTtcblxuICAgIEN1YmlzbU1hdHJpeDQ0Lm11bHRpcGx5KHRyMywgdGhpcy5fdHIsIHRoaXMuX3RyKTtcbiAgICBDdWJpc21NYXRyaXg0NC5tdWx0aXBseSh0cjIsIHRoaXMuX3RyLCB0aGlzLl90cik7XG4gICAgQ3ViaXNtTWF0cml4NDQubXVsdGlwbHkodHIxLCB0aGlzLl90ciwgdGhpcy5fdHIpO1xuICB9XG5cbiAgLyoqXG4gICAqIOODh+ODkOOCpOOCueOBq+WvvuW/nOOBmeOCi+irlueQhuW6p+mkiueUn+OBruevhOWbsuOBruioreWumlxuICAgKlxuICAgKiBAcGFyYW0gbGVmdCAgICAgIOW3pui+uuOBrljou7jjga7kvY3nva5cbiAgICogQHBhcmFtIHJpZ2h0ICAgICDlj7Povrrjga5Y6Lu444Gu5L2N572uXG4gICAqIEBwYXJhbSBib3R0b20gICAg5LiL6L6644GuWei7uOOBruS9jee9rlxuICAgKiBAcGFyYW0gdG9wICAgICAgIOS4iui+uuOBrlnou7jjga7kvY3nva5cbiAgICovXG4gIHB1YmxpYyBzZXRTY3JlZW5SZWN0KFxuICAgIGxlZnQ6IG51bWJlcixcbiAgICByaWdodDogbnVtYmVyLFxuICAgIGJvdHRvbTogbnVtYmVyLFxuICAgIHRvcDogbnVtYmVyXG4gICk6IHZvaWQge1xuICAgIHRoaXMuX3NjcmVlbkxlZnQgPSBsZWZ0O1xuICAgIHRoaXMuX3NjcmVlblJpZ2h0ID0gcmlnaHQ7XG4gICAgdGhpcy5fc2NyZWVuQm90dG9tID0gYm90dG9tO1xuICAgIHRoaXMuX3NjcmVlblRvcCA9IHRvcDtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg4fjg5DjgqTjgrnjgavlr77lv5zjgZnjgovoq5bnkIbluqfmqJnkuIrjga7np7vli5Xlj6/og73nr4Tlm7Ljga7oqK3lrppcbiAgICogQHBhcmFtIGxlZnQgICAgICDlt6bovrrjga5Y6Lu444Gu5L2N572uXG4gICAqIEBwYXJhbSByaWdodCAgICAg5Y+z6L6644GuWOi7uOOBruS9jee9rlxuICAgKiBAcGFyYW0gYm90dG9tICAgIOS4i+i+uuOBrlnou7jjga7kvY3nva5cbiAgICogQHBhcmFtIHRvcCAgICAgICDkuIrovrrjga5Z6Lu444Gu5L2N572uXG4gICAqL1xuICBwdWJsaWMgc2V0TWF4U2NyZWVuUmVjdChcbiAgICBsZWZ0OiBudW1iZXIsXG4gICAgcmlnaHQ6IG51bWJlcixcbiAgICBib3R0b206IG51bWJlcixcbiAgICB0b3A6IG51bWJlclxuICApOiB2b2lkIHtcbiAgICB0aGlzLl9tYXhMZWZ0ID0gbGVmdDtcbiAgICB0aGlzLl9tYXhSaWdodCA9IHJpZ2h0O1xuICAgIHRoaXMuX21heFRvcCA9IHRvcDtcbiAgICB0aGlzLl9tYXhCb3R0b20gPSBib3R0b207XG4gIH1cblxuICAvKipcbiAgICog5pyA5aSn5ouh5aSn546H44Gu6Kit5a6aXG4gICAqIEBwYXJhbSBtYXhTY2FsZSDmnIDlpKfmi6HlpKfnjodcbiAgICovXG4gIHB1YmxpYyBzZXRNYXhTY2FsZShtYXhTY2FsZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fbWF4U2NhbGUgPSBtYXhTY2FsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmnIDlsI/mi6HlpKfnjofjga7oqK3lrppcbiAgICogQHBhcmFtIG1pblNjYWxlIOacgOWwj+aLoeWkp+eOh1xuICAgKi9cbiAgcHVibGljIHNldE1pblNjYWxlKG1pblNjYWxlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9taW5TY2FsZSA9IG1pblNjYWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIOacgOWkp+aLoeWkp+eOh+OBruWPluW+l1xuICAgKiBAcmV0dXJuIOacgOWkp+aLoeWkp+eOh1xuICAgKi9cbiAgcHVibGljIGdldE1heFNjYWxlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21heFNjYWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIOacgOWwj+aLoeWkp+eOh+OBruWPluW+l1xuICAgKiBAcmV0dXJuIOacgOWwj+aLoeWkp+eOh1xuICAgKi9cbiAgcHVibGljIGdldE1pblNjYWxlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21pblNjYWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIOaLoeWkp+eOh+OBjOacgOWkp+OBq+OBquOBo+OBpuOBhOOCi+OBi+OCkueiuuiqjeOBmeOCi1xuICAgKlxuICAgKiBAcmV0dXJuIHRydWUg5ouh5aSn546H44Gv5pyA5aSnXG4gICAqIEByZXR1cm4gZmFsc2Ug5ouh5aSn546H44Gv5pyA5aSn44Gn44Gv44Gq44GEXG4gICAqL1xuICBwdWJsaWMgaXNNYXhTY2FsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXRTY2FsZVgoKSA+PSB0aGlzLl9tYXhTY2FsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmi6HlpKfnjofjgYzmnIDlsI/jgavjgarjgaPjgabjgYTjgovjgYvjgpLnorroqo3jgZnjgotcbiAgICpcbiAgICogQHJldHVybiB0cnVlIOaLoeWkp+eOh+OBr+acgOWwj1xuICAgKiBAcmV0dXJuIGZhbHNlIOaLoeWkp+eOh+OBr+acgOWwj+OBp+OBr+OBquOBhFxuICAgKi9cbiAgcHVibGljIGlzTWluU2NhbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U2NhbGVYKCkgPD0gdGhpcy5fbWluU2NhbGU7XG4gIH1cblxuICAvKipcbiAgICog44OH44OQ44Kk44K544Gr5a++5b+c44GZ44KL6KuW55CG5bqn5qiZ44Gu5bem6L6644Gu77y46Lu45L2N572u44KS5Y+W5b6X44GZ44KLXG4gICAqIEByZXR1cm4g44OH44OQ44Kk44K544Gr5a++5b+c44GZ44KL6KuW55CG5bqn5qiZ44Gu5bem6L6644GuWOi7uOS9jee9rlxuICAgKi9cbiAgcHVibGljIGdldFNjcmVlbkxlZnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2NyZWVuTGVmdDtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg4fjg5DjgqTjgrnjgavlr77lv5zjgZnjgovoq5bnkIbluqfmqJnjga7lj7Povrrjga7vvLjou7jkvY3nva7jgpLlj5blvpfjgZnjgotcbiAgICogQHJldHVybiDjg4fjg5DjgqTjgrnjgavlr77lv5zjgZnjgovoq5bnkIbluqfmqJnjga7lj7Povrrjga5Y6Lu45L2N572uXG4gICAqL1xuICBwdWJsaWMgZ2V0U2NyZWVuUmlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2NyZWVuUmlnaHQ7XG4gIH1cblxuICAvKipcbiAgICog44OH44OQ44Kk44K544Gr5a++5b+c44GZ44KL6KuW55CG5bqn5qiZ44Gu5LiL6L6644GuWei7uOS9jee9ruOCkuWPluW+l+OBmeOCi1xuICAgKiBAcmV0dXJuIOODh+ODkOOCpOOCueOBq+WvvuW/nOOBmeOCi+irlueQhuW6p+aomeOBruS4i+i+uuOBrlnou7jkvY3nva5cbiAgICovXG4gIHB1YmxpYyBnZXRTY3JlZW5Cb3R0b20oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2NyZWVuQm90dG9tO1xuICB9XG5cbiAgLyoqXG4gICAqIOODh+ODkOOCpOOCueOBq+WvvuW/nOOBmeOCi+irlueQhuW6p+aomeOBruS4iui+uuOBrlnou7jkvY3nva7jgpLlj5blvpfjgZnjgotcbiAgICogQHJldHVybiDjg4fjg5DjgqTjgrnjgavlr77lv5zjgZnjgovoq5bnkIbluqfmqJnjga7kuIrovrrjga5Z6Lu45L2N572uXG4gICAqL1xuICBwdWJsaWMgZ2V0U2NyZWVuVG9wKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3NjcmVlblRvcDtcbiAgfVxuXG4gIC8qKlxuICAgKiDlt6bovrrjga5Y6Lu45L2N572u44Gu5pyA5aSn5YCk44Gu5Y+W5b6XXG4gICAqIEByZXR1cm4g5bem6L6644GuWOi7uOS9jee9ruOBruacgOWkp+WApFxuICAgKi9cbiAgcHVibGljIGdldE1heExlZnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4TGVmdDtcbiAgfVxuXG4gIC8qKlxuICAgKiDlj7Povrrjga5Y6Lu45L2N572u44Gu5pyA5aSn5YCk44Gu5Y+W5b6XXG4gICAqIEByZXR1cm4g5Y+z6L6644GuWOi7uOS9jee9ruOBruacgOWkp+WApFxuICAgKi9cbiAgcHVibGljIGdldE1heFJpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21heFJpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIOS4i+i+uuOBrlnou7jkvY3nva7jga7mnIDlpKflgKTjga7lj5blvpdcbiAgICogQHJldHVybiDkuIvovrrjga5Z6Lu45L2N572u44Gu5pyA5aSn5YCkXG4gICAqL1xuICBwdWJsaWMgZ2V0TWF4Qm90dG9tKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21heEJvdHRvbTtcbiAgfVxuXG4gIC8qKlxuICAgKiDkuIrovrrjga5Z6Lu45L2N572u44Gu5pyA5aSn5YCk44Gu5Y+W5b6XXG4gICAqIEByZXR1cm4g5LiK6L6644GuWei7uOS9jee9ruOBruacgOWkp+WApFxuICAgKi9cbiAgcHVibGljIGdldE1heFRvcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9tYXhUb3A7XG4gIH1cblxuICBwcml2YXRlIF9zY3JlZW5MZWZ0OiBudW1iZXI7IC8vIOODh+ODkOOCpOOCueOBq+WvvuW/nOOBmeOCi+irlueQhuW6p+aomeS4iuOBruevhOWbsu+8iOW3pui+uljou7jkvY3nva7vvIlcbiAgcHJpdmF0ZSBfc2NyZWVuUmlnaHQ6IG51bWJlcjsgLy8g44OH44OQ44Kk44K544Gr5a++5b+c44GZ44KL6KuW55CG5bqn5qiZ5LiK44Gu56+E5Zuy77yI5Y+z6L66WOi7uOS9jee9ru+8iVxuICBwcml2YXRlIF9zY3JlZW5Ub3A6IG51bWJlcjsgLy8g44OH44OQ44Kk44K544Gr5a++5b+c44GZ44KL6KuW55CG5bqn5qiZ5LiK44Gu56+E5Zuy77yI5LiK6L66Wei7uOS9jee9ru+8iVxuICBwcml2YXRlIF9zY3JlZW5Cb3R0b206IG51bWJlcjsgLy8g44OH44OQ44Kk44K544Gr5a++5b+c44GZ44KL6KuW55CG5bqn5qiZ5LiK44Gu56+E5Zuy77yI5LiL6L66Wei7uOS9jee9ru+8iVxuICBwcml2YXRlIF9tYXhMZWZ0OiBudW1iZXI7IC8vIOirlueQhuW6p+aomeS4iuOBruenu+WLleWPr+iDveevhOWbsu+8iOW3pui+uljou7jkvY3nva7vvIlcbiAgcHJpdmF0ZSBfbWF4UmlnaHQ6IG51bWJlcjsgLy8g6KuW55CG5bqn5qiZ5LiK44Gu56e75YuV5Y+v6IO956+E5Zuy77yI5Y+z6L66WOi7uOS9jee9ru+8iVxuICBwcml2YXRlIF9tYXhUb3A6IG51bWJlcjsgLy8g6KuW55CG5bqn5qiZ5LiK44Gu56e75YuV5Y+v6IO956+E5Zuy77yI5LiK6L66Wei7uOS9jee9ru+8iVxuICBwcml2YXRlIF9tYXhCb3R0b206IG51bWJlcjsgLy8g6KuW55CG5bqn5qiZ5LiK44Gu56e75YuV5Y+v6IO956+E5Zuy77yI5LiL6L66Wei7uOS9jee9ru+8iVxuICBwcml2YXRlIF9tYXhTY2FsZTogbnVtYmVyOyAvLyDmi6HlpKfnjofjga7mnIDlpKflgKRcbiAgcHJpdmF0ZSBfbWluU2NhbGU6IG51bWJlcjsgLy8g5ouh5aSn546H44Gu5pyA5bCP5YCkXG59XG5cbi8vIE5hbWVzcGFjZSBkZWZpbml0aW9uIGZvciBjb21wYXRpYmlsaXR5LlxuaW1wb3J0ICogYXMgJCBmcm9tICcuL2N1YmlzbXZpZXdtYXRyaXgnO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcbmV4cG9ydCBuYW1lc3BhY2UgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIHtcbiAgZXhwb3J0IGNvbnN0IEN1YmlzbVZpZXdNYXRyaXggPSAkLkN1YmlzbVZpZXdNYXRyaXg7XG4gIGV4cG9ydCB0eXBlIEN1YmlzbVZpZXdNYXRyaXggPSAkLkN1YmlzbVZpZXdNYXRyaXg7XG59XG4iLCIvKipcclxuICogQ29weXJpZ2h0KGMpIExpdmUyRCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXHJcbiAqIHRoYXQgY2FuIGJlIGZvdW5kIGF0IGh0dHBzOi8vd3d3LmxpdmUyZC5jb20vZXVsYS9saXZlMmQtb3Blbi1zb2Z0d2FyZS1saWNlbnNlLWFncmVlbWVudF9lbi5odG1sLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IExvZ0xldmVsIH0gZnJvbSAnQGZyYW1ld29yay9saXZlMmRjdWJpc21mcmFtZXdvcmsnO1xyXG5cclxuLyoqXHJcbiAqIFNhbXBsZSBBcHDjgafkvb/nlKjjgZnjgovlrprmlbBcclxuICovXHJcblxyXG4vLyBDYW52YXMgd2lkdGggYW5kIGhlaWdodCBwaXhlbCB2YWx1ZXMsIG9yIGR5bmFtaWMgc2NyZWVuIHNpemUgKCdhdXRvJykuXHJcbmV4cG9ydCBjb25zdCBDYW52YXNTaXplOiB7IHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyIH0gfCAnYXV0bycgPSAnYXV0byc7XHJcblxyXG4vLyDnlLvpnaJcclxuZXhwb3J0IGNvbnN0IFZpZXdTY2FsZSA9IDEuMDtcclxuZXhwb3J0IGNvbnN0IFZpZXdNYXhTY2FsZSA9IDIuMDtcclxuZXhwb3J0IGNvbnN0IFZpZXdNaW5TY2FsZSA9IDAuODtcclxuXHJcbmV4cG9ydCBjb25zdCBWaWV3TG9naWNhbExlZnQgPSAtMS4wO1xyXG5leHBvcnQgY29uc3QgVmlld0xvZ2ljYWxSaWdodCA9IDEuMDtcclxuZXhwb3J0IGNvbnN0IFZpZXdMb2dpY2FsQm90dG9tID0gLTEuMDtcclxuZXhwb3J0IGNvbnN0IFZpZXdMb2dpY2FsVG9wID0gMS4wO1xyXG5cclxuZXhwb3J0IGNvbnN0IFZpZXdMb2dpY2FsTWF4TGVmdCA9IC0yLjA7XHJcbmV4cG9ydCBjb25zdCBWaWV3TG9naWNhbE1heFJpZ2h0ID0gMi4wO1xyXG5leHBvcnQgY29uc3QgVmlld0xvZ2ljYWxNYXhCb3R0b20gPSAtMi4wO1xyXG5leHBvcnQgY29uc3QgVmlld0xvZ2ljYWxNYXhUb3AgPSAyLjA7XHJcblxyXG4vLyDnm7jlr77jg5HjgrlcclxuZXhwb3J0IGNvbnN0IFJlc291cmNlc1BhdGggPSAnLi4vLi4vUmVzb3VyY2VzLyc7XHJcblxyXG4vLyDjg6Ljg4fjg6vjga7lvozjgo3jgavjgYLjgovog4zmma/jga7nlLvlg4/jg5XjgqHjgqTjg6tcclxuZXhwb3J0IGNvbnN0IEJhY2tJbWFnZU5hbWUgPSAnYmFja19jbGFzc19ub3JtYWwucG5nJztcclxuXHJcbi8vIOatr+i7ilxyXG5leHBvcnQgY29uc3QgR2VhckltYWdlTmFtZSA9ICdpY29uX2dlYXIucG5nJztcclxuXHJcbi8vIOe1guS6huODnOOCv+ODs1xyXG5leHBvcnQgY29uc3QgUG93ZXJJbWFnZU5hbWUgPSAnQ2xvc2VOb3JtYWwucG5nJztcclxuXHJcbi8vIOODouODh+ODq+Wumue+qS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyDjg6Ljg4fjg6vjgpLphY3nva7jgZfjgZ/jg4fjgqPjg6zjgq/jg4jjg6rlkI3jga7phY3liJdcclxuLy8g44OH44Kj44Os44Kv44OI44Oq5ZCN44GobW9kZWwzLmpzb27jga7lkI3liY3jgpLkuIDoh7TjgZXjgZvjgabjgYrjgY/jgZPjgahcclxuZXhwb3J0IGNvbnN0IE1vZGVsRGlyOiBzdHJpbmdbXSA9IFtcclxuICAnSGFydScsXHJcbiAgJ0hpeW9yaScsXHJcbiAgJ01hcmsnLFxyXG4gICdOYXRvcmknLFxyXG4gICdSaWNlJyxcclxuICAnTWFvJ1xyXG5dO1xyXG5leHBvcnQgY29uc3QgTW9kZWxEaXJTaXplOiBudW1iZXIgPSBNb2RlbERpci5sZW5ndGg7XHJcblxyXG4vLyDlpJbpg6jlrprnvqnjg5XjgqHjgqTjg6vvvIhqc29u77yJ44Go5ZCI44KP44Gb44KLXHJcbmV4cG9ydCBjb25zdCBNb3Rpb25Hcm91cElkbGUgPSAnSWRsZSc7IC8vIOOCouOCpOODieODquODs+OCsFxyXG5leHBvcnQgY29uc3QgTW90aW9uR3JvdXBUYXBCb2R5ID0gJ1RhcEJvZHknOyAvLyDkvZPjgpLjgr/jg4Pjg5fjgZfjgZ/jgajjgY1cclxuXHJcbi8vIOWklumDqOWumue+qeODleOCoeOCpOODq++8iGpzb27vvInjgajlkIjjgo/jgZvjgotcclxuZXhwb3J0IGNvbnN0IEhpdEFyZWFOYW1lSGVhZCA9ICdIZWFkJztcclxuZXhwb3J0IGNvbnN0IEhpdEFyZWFOYW1lQm9keSA9ICdCb2R5JztcclxuXHJcbi8vIOODouODvOOCt+ODp+ODs+OBruWEquWFiOW6puWumuaVsFxyXG5leHBvcnQgY29uc3QgUHJpb3JpdHlOb25lID0gMDtcclxuZXhwb3J0IGNvbnN0IFByaW9yaXR5SWRsZSA9IDE7XHJcbmV4cG9ydCBjb25zdCBQcmlvcml0eU5vcm1hbCA9IDI7XHJcbmV4cG9ydCBjb25zdCBQcmlvcml0eUZvcmNlID0gMztcclxuXHJcbi8vIE1PQzPjga7kuIDosqvmgKfmpJzoqLzjgqrjg5fjgrfjg6fjg7NcclxuZXhwb3J0IGNvbnN0IE1PQ0NvbnNpc3RlbmN5VmFsaWRhdGlvbkVuYWJsZSA9IHRydWU7XHJcblxyXG4vLyDjg4fjg5Djg4PjgrDnlKjjg63jgrDjga7ooajnpLrjgqrjg5fjgrfjg6fjg7NcclxuZXhwb3J0IGNvbnN0IERlYnVnTG9nRW5hYmxlID0gdHJ1ZTtcclxuZXhwb3J0IGNvbnN0IERlYnVnVG91Y2hMb2dFbmFibGUgPSBmYWxzZTtcclxuXHJcbi8vIEZyYW1ld29ya+OBi+OCieWHuuWKm+OBmeOCi+ODreOCsOOBruODrOODmeODq+ioreWumlxyXG5leHBvcnQgY29uc3QgQ3ViaXNtTG9nZ2luZ0xldmVsOiBMb2dMZXZlbCA9IExvZ0xldmVsLkxvZ0xldmVsX1ZlcmJvc2U7XHJcblxyXG4vLyDjg4fjg5Xjgqnjg6vjg4jjga7jg6zjg7Pjg4Djg7zjgr/jg7zjgrLjg4Pjg4jjgrXjgqTjgrpcclxuZXhwb3J0IGNvbnN0IFJlbmRlclRhcmdldFdpZHRoID0gMTkwMDtcclxuZXhwb3J0IGNvbnN0IFJlbmRlclRhcmdldEhlaWdodCA9IDEwMDA7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgdGhlIExpdmUyRCBPcGVuIFNvZnR3YXJlIGxpY2Vuc2VcclxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgQ3ViaXNtRnJhbWV3b3JrLCBPcHRpb24gfSBmcm9tICdAZnJhbWV3b3JrL2xpdmUyZGN1YmlzbWZyYW1ld29yayc7XHJcblxyXG5pbXBvcnQgKiBhcyBMQXBwRGVmaW5lIGZyb20gJy4vbGFwcGRlZmluZSc7XHJcbmltcG9ydCB7IExBcHBMaXZlMkRNYW5hZ2VyIH0gZnJvbSAnLi9sYXBwbGl2ZTJkbWFuYWdlcic7XHJcbmltcG9ydCB7IExBcHBQYWwgfSBmcm9tICcuL2xhcHBwYWwnO1xyXG5pbXBvcnQgeyBMQXBwVGV4dHVyZU1hbmFnZXIgfSBmcm9tICcuL2xhcHB0ZXh0dXJlbWFuYWdlcic7XHJcbmltcG9ydCB7IExBcHBWaWV3IH0gZnJvbSAnLi9sYXBwdmlldyc7XHJcblxyXG5leHBvcnQgbGV0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBudWxsO1xyXG5leHBvcnQgbGV0IHNfaW5zdGFuY2U6IExBcHBEZWxlZ2F0ZSA9IG51bGw7XHJcbmV4cG9ydCBsZXQgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCA9IG51bGw7XHJcbmV4cG9ydCBsZXQgZnJhbWVCdWZmZXI6IFdlYkdMRnJhbWVidWZmZXIgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIOOCouODl+ODquOCseODvOOCt+ODp+ODs+OCr+ODqeOCueOAglxyXG4gKiBDdWJpc20gU0RL44Gu566h55CG44KS6KGM44GG44CCXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTEFwcERlbGVnYXRlIHtcclxuICAvKipcclxuICAgKiDjgq/jg6njgrnjga7jgqTjg7Pjgrnjgr/jg7PjgrnvvIjjgrfjg7PjgrDjg6vjg4jjg7PvvInjgpLov5TjgZnjgIJcclxuICAgKiDjgqTjg7Pjgrnjgr/jg7PjgrnjgYznlJ/miJDjgZXjgozjgabjgYTjgarjgYTloLTlkIjjga/lhoXpg6jjgafjgqTjg7Pjgrnjgr/jg7PjgrnjgpLnlJ/miJDjgZnjgovjgIJcclxuICAgKlxyXG4gICAqIEByZXR1cm4g44Kv44Op44K544Gu44Kk44Oz44K544K/44Oz44K5XHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBMQXBwRGVsZWdhdGUge1xyXG4gICAgaWYgKHNfaW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICBzX2luc3RhbmNlID0gbmV3IExBcHBEZWxlZ2F0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzX2luc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44Kv44Op44K544Gu44Kk44Oz44K544K/44Oz44K577yI44K344Oz44Kw44Or44OI44Oz77yJ44KS6Kej5pS+44GZ44KL44CCXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyByZWxlYXNlSW5zdGFuY2UoKTogdm9pZCB7XHJcbiAgICBpZiAoc19pbnN0YW5jZSAhPSBudWxsKSB7XHJcbiAgICAgIHNfaW5zdGFuY2UucmVsZWFzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNfaW5zdGFuY2UgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQVBQ44Gr5b+F6KaB44Gq54mp44KS5Yid5pyf5YyW44GZ44KL44CCXHJcbiAgICovXHJcbiAgcHVibGljIGluaXRpYWxpemUoKTogYm9vbGVhbiB7XHJcbiAgICAvLyDjgq3jg6Pjg7Pjg5Djgrnjga7kvZzmiJBcclxuICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgaWYgKExBcHBEZWZpbmUuQ2FudmFzU2l6ZSA9PT0gJ2F1dG8nKSB7XHJcbiAgICAgIHRoaXMuX3Jlc2l6ZUNhbnZhcygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2FudmFzLndpZHRoID0gTEFwcERlZmluZS5DYW52YXNTaXplLndpZHRoO1xyXG4gICAgICBjYW52YXMuaGVpZ2h0ID0gTEFwcERlZmluZS5DYW52YXNTaXplLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnbOOCs+ODs+ODhuOCreOCueODiOOCkuWIneacn+WMllxyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnKSB8fCBjYW52YXMuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJyk7XHJcblxyXG4gICAgaWYgKCFnbCkge1xyXG4gICAgICBhbGVydCgnQ2Fubm90IGluaXRpYWxpemUgV2ViR0wuIFRoaXMgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0LicpO1xyXG4gICAgICBnbCA9IG51bGw7XHJcblxyXG4gICAgICBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9XHJcbiAgICAgICAgJ1RoaXMgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSA8Y29kZT4mbHQ7Y2FudmFzJmd0OzwvY29kZT4gZWxlbWVudC4nO1xyXG5cclxuICAgICAgLy8gZ2zliJ3mnJ/ljJblpLHmlZdcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOOCreODo+ODs+ODkOOCueOCkiBET00g44Gr6L+95YqgXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XHJcblxyXG4gICAgaWYgKCFmcmFtZUJ1ZmZlcikge1xyXG4gICAgICBmcmFtZUJ1ZmZlciA9IGdsLmdldFBhcmFtZXRlcihnbC5GUkFNRUJVRkZFUl9CSU5ESU5HKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDpgI/pgY7oqK3lrppcclxuICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XHJcbiAgICBnbC5ibGVuZEZ1bmMoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcclxuXHJcbiAgICBjb25zdCBzdXBwb3J0VG91Y2g6IGJvb2xlYW4gPSAnb250b3VjaGVuZCcgaW4gY2FudmFzO1xyXG5cclxuICAgIGlmIChzdXBwb3J0VG91Y2gpIHtcclxuICAgICAgLy8g44K/44OD44OB6Zai6YCj44Kz44O844Or44OQ44OD44Kv6Zai5pWw55m76YyyXHJcbiAgICAgIGNhbnZhcy5vbnRvdWNoc3RhcnQgPSBvblRvdWNoQmVnYW47XHJcbiAgICAgIGNhbnZhcy5vbnRvdWNobW92ZSA9IG9uVG91Y2hNb3ZlZDtcclxuICAgICAgY2FudmFzLm9udG91Y2hlbmQgPSBvblRvdWNoRW5kZWQ7XHJcbiAgICAgIGNhbnZhcy5vbnRvdWNoY2FuY2VsID0gb25Ub3VjaENhbmNlbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIOODnuOCpuOCuemWoumAo+OCs+ODvOODq+ODkOODg+OCr+mWouaVsOeZu+mMslxyXG4gICAgICBjYW52YXMub25tb3VzZWRvd24gPSBvbkNsaWNrQmVnYW47XHJcbiAgICAgIGNhbnZhcy5vbm1vdXNlbW92ZSA9IG9uTW91c2VNb3ZlZDtcclxuICAgICAgY2FudmFzLm9ubW91c2V1cCA9IG9uQ2xpY2tFbmRlZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBcHBWaWV344Gu5Yid5pyf5YyWXHJcbiAgICB0aGlzLl92aWV3LmluaXRpYWxpemUoKTtcclxuXHJcbiAgICAvLyBDdWJpc20gU0RL44Gu5Yid5pyf5YyWXHJcbiAgICB0aGlzLmluaXRpYWxpemVDdWJpc20oKTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2l6ZSBjYW52YXMgYW5kIHJlLWluaXRpYWxpemUgdmlldy5cclxuICAgKi9cclxuICBwdWJsaWMgb25SZXNpemUoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9yZXNpemVDYW52YXMoKTtcclxuICAgIHRoaXMuX3ZpZXcuaW5pdGlhbGl6ZSgpO1xyXG4gICAgdGhpcy5fdmlldy5pbml0aWFsaXplU3ByaXRlKCk7XHJcblxyXG4gICAgLy8g44Kt44Oj44Oz44OQ44K544K144Kk44K644KS5rih44GZXHJcbiAgICBjb25zdCB2aWV3cG9ydDogbnVtYmVyW10gPSBbMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0XTtcclxuXHJcbiAgICBnbC52aWV3cG9ydCh2aWV3cG9ydFswXSwgdmlld3BvcnRbMV0sIHZpZXdwb3J0WzJdLCB2aWV3cG9ydFszXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDop6PmlL7jgZnjgovjgIJcclxuICAgKi9cclxuICBwdWJsaWMgcmVsZWFzZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX3RleHR1cmVNYW5hZ2VyLnJlbGVhc2UoKTtcclxuICAgIHRoaXMuX3RleHR1cmVNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLl92aWV3LnJlbGVhc2UoKTtcclxuICAgIHRoaXMuX3ZpZXcgPSBudWxsO1xyXG5cclxuICAgIC8vIOODquOCveODvOOCueOCkuino+aUvlxyXG4gICAgTEFwcExpdmUyRE1hbmFnZXIucmVsZWFzZUluc3RhbmNlKCk7XHJcblxyXG4gICAgLy8gQ3ViaXNtIFNES+OBruino+aUvlxyXG4gICAgQ3ViaXNtRnJhbWV3b3JrLmRpc3Bvc2UoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWun+ihjOWHpueQhuOAglxyXG4gICAqL1xyXG4gIHB1YmxpYyBydW4oKTogdm9pZCB7XHJcbiAgICAvLyDjg6HjgqTjg7Pjg6vjg7zjg5dcclxuICAgIGNvbnN0IGxvb3AgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgIC8vIOOCpOODs+OCueOCv+ODs+OCueOBruacieeEoeOBrueiuuiqjVxyXG4gICAgICBpZiAoc19pbnN0YW5jZSA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyDmmYLplpPmm7TmlrBcclxuICAgICAgTEFwcFBhbC51cGRhdGVUaW1lKCk7XHJcblxyXG4gICAgICAvLyDnlLvpnaLjga7liJ3mnJ/ljJZcclxuICAgICAgZ2wuY2xlYXJDb2xvcigwLjAsIDAuMCwgMC4wLCAxLjApO1xyXG5cclxuICAgICAgLy8g5rex5bqm44OG44K544OI44KS5pyJ5Yq55YyWXHJcbiAgICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcclxuXHJcbiAgICAgIC8vIOi/keOBj+OBq+OBguOCi+eJqeS9k+OBr+OAgemBoOOBj+OBq+OBguOCi+eJqeS9k+OCkuimhuOBhOmaoOOBmVxyXG4gICAgICBnbC5kZXB0aEZ1bmMoZ2wuTEVRVUFMKTtcclxuXHJcbiAgICAgIC8vIOOCq+ODqeODvOODkOODg+ODleOCoeOChOa3seW6puODkOODg+ODleOCoeOCkuOCr+ODquOCouOBmeOCi1xyXG4gICAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XHJcblxyXG4gICAgICBnbC5jbGVhckRlcHRoKDEuMCk7XHJcblxyXG4gICAgICAvLyDpgI/pgY7oqK3lrppcclxuICAgICAgZ2wuZW5hYmxlKGdsLkJMRU5EKTtcclxuICAgICAgZ2wuYmxlbmRGdW5jKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XHJcblxyXG4gICAgICAvLyDmj4/nlLvmm7TmlrBcclxuICAgICAgdGhpcy5fdmlldy5yZW5kZXIoKTtcclxuXHJcbiAgICAgIC8vIOODq+ODvOODl+OBruOBn+OCgeOBq+WGjeW4sOWRvOOBs+WHuuOBl1xyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcbiAgICB9O1xyXG4gICAgbG9vcCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K344Kn44O844OA44O844KS55m76Yyy44GZ44KL44CCXHJcbiAgICovXHJcbiAgcHVibGljIGNyZWF0ZVNoYWRlcigpOiBXZWJHTFByb2dyYW0ge1xyXG4gICAgLy8g44OQ44O844OG44OD44Kv44K544K344Kn44O844OA44O844Gu44Kz44Oz44OR44Kk44OrXHJcbiAgICBjb25zdCB2ZXJ0ZXhTaGFkZXJJZCA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcclxuXHJcbiAgICBpZiAodmVydGV4U2hhZGVySWQgPT0gbnVsbCkge1xyXG4gICAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgnZmFpbGVkIHRvIGNyZWF0ZSB2ZXJ0ZXhTaGFkZXInKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmVydGV4U2hhZGVyOiBzdHJpbmcgPVxyXG4gICAgICAncHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7JyArXHJcbiAgICAgICdhdHRyaWJ1dGUgdmVjMyBwb3NpdGlvbjsnICtcclxuICAgICAgJ2F0dHJpYnV0ZSB2ZWMyIHV2OycgK1xyXG4gICAgICAndmFyeWluZyB2ZWMyIHZ1djsnICtcclxuICAgICAgJ3ZvaWQgbWFpbih2b2lkKScgK1xyXG4gICAgICAneycgK1xyXG4gICAgICAnICAgZ2xfUG9zaXRpb24gPSB2ZWM0KHBvc2l0aW9uLCAxLjApOycgK1xyXG4gICAgICAnICAgdnV2ID0gdXY7JyArXHJcbiAgICAgICd9JztcclxuXHJcbiAgICBnbC5zaGFkZXJTb3VyY2UodmVydGV4U2hhZGVySWQsIHZlcnRleFNoYWRlcik7XHJcbiAgICBnbC5jb21waWxlU2hhZGVyKHZlcnRleFNoYWRlcklkKTtcclxuXHJcbiAgICAvLyDjg5Xjg6njgrDjg6Hjg7Pjg4jjgrfjgqfjg7zjg4Djga7jgrPjg7Pjg5HjgqTjg6tcclxuICAgIGNvbnN0IGZyYWdtZW50U2hhZGVySWQgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcclxuXHJcbiAgICBpZiAoZnJhZ21lbnRTaGFkZXJJZCA9PSBudWxsKSB7XHJcbiAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCdmYWlsZWQgdG8gY3JlYXRlIGZyYWdtZW50U2hhZGVyJyk7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZyYWdtZW50U2hhZGVyOiBzdHJpbmcgPVxyXG4gICAgICAncHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7JyArXHJcbiAgICAgICd2YXJ5aW5nIHZlYzIgdnV2OycgK1xyXG4gICAgICAndW5pZm9ybSBzYW1wbGVyMkQgdGV4dHVyZTsnICtcclxuICAgICAgJ3ZvaWQgbWFpbih2b2lkKScgK1xyXG4gICAgICAneycgK1xyXG4gICAgICAnICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHRleHR1cmUsIHZ1dik7JyArXHJcbiAgICAgICd9JztcclxuXHJcbiAgICBnbC5zaGFkZXJTb3VyY2UoZnJhZ21lbnRTaGFkZXJJZCwgZnJhZ21lbnRTaGFkZXIpO1xyXG4gICAgZ2wuY29tcGlsZVNoYWRlcihmcmFnbWVudFNoYWRlcklkKTtcclxuXHJcbiAgICAvLyDjg5fjg63jgrDjg6njg6Djgqrjg5bjgrjjgqfjgq/jg4jjga7kvZzmiJBcclxuICAgIGNvbnN0IHByb2dyYW1JZCA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcclxuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtSWQsIHZlcnRleFNoYWRlcklkKTtcclxuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtSWQsIGZyYWdtZW50U2hhZGVySWQpO1xyXG5cclxuICAgIGdsLmRlbGV0ZVNoYWRlcih2ZXJ0ZXhTaGFkZXJJZCk7XHJcbiAgICBnbC5kZWxldGVTaGFkZXIoZnJhZ21lbnRTaGFkZXJJZCk7XHJcblxyXG4gICAgLy8g44Oq44Oz44KvXHJcbiAgICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtSWQpO1xyXG5cclxuICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbUlkKTtcclxuXHJcbiAgICByZXR1cm4gcHJvZ3JhbUlkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVmlld+aDheWgseOCkuWPluW+l+OBmeOCi+OAglxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRWaWV3KCk6IExBcHBWaWV3IHtcclxuICAgIHJldHVybiB0aGlzLl92aWV3O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFRleHR1cmVNYW5hZ2VyKCk6IExBcHBUZXh0dXJlTWFuYWdlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fdGV4dHVyZU1hbmFnZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr9cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX2NhcHR1cmVkID0gZmFsc2U7XHJcbiAgICB0aGlzLl9tb3VzZVggPSAwLjA7XHJcbiAgICB0aGlzLl9tb3VzZVkgPSAwLjA7XHJcbiAgICB0aGlzLl9pc0VuZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX2N1YmlzbU9wdGlvbiA9IG5ldyBPcHRpb24oKTtcclxuICAgIHRoaXMuX3ZpZXcgPSBuZXcgTEFwcFZpZXcoKTtcclxuICAgIHRoaXMuX3RleHR1cmVNYW5hZ2VyID0gbmV3IExBcHBUZXh0dXJlTWFuYWdlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3ViaXNtIFNES+OBruWIneacn+WMllxyXG4gICAqL1xyXG4gIHB1YmxpYyBpbml0aWFsaXplQ3ViaXNtKCk6IHZvaWQge1xyXG4gICAgLy8gc2V0dXAgY3ViaXNtXHJcbiAgICB0aGlzLl9jdWJpc21PcHRpb24ubG9nRnVuY3Rpb24gPSBMQXBwUGFsLnByaW50TWVzc2FnZTtcclxuICAgIHRoaXMuX2N1YmlzbU9wdGlvbi5sb2dnaW5nTGV2ZWwgPSBMQXBwRGVmaW5lLkN1YmlzbUxvZ2dpbmdMZXZlbDtcclxuICAgIEN1YmlzbUZyYW1ld29yay5zdGFydFVwKHRoaXMuX2N1YmlzbU9wdGlvbik7XHJcblxyXG4gICAgLy8gaW5pdGlhbGl6ZSBjdWJpc21cclxuICAgIEN1YmlzbUZyYW1ld29yay5pbml0aWFsaXplKCk7XHJcblxyXG4gICAgLy8gbG9hZCBtb2RlbFxyXG4gICAgTEFwcExpdmUyRE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICBMQXBwUGFsLnVwZGF0ZVRpbWUoKTtcclxuXHJcbiAgICB0aGlzLl92aWV3LmluaXRpYWxpemVTcHJpdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2l6ZSB0aGUgY2FudmFzIHRvIGZpbGwgdGhlIHNjcmVlbi5cclxuICAgKi9cclxuICBwcml2YXRlIF9yZXNpemVDYW52YXMoKTogdm9pZCB7XHJcbiAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgfVxyXG5cclxuICBfY3ViaXNtT3B0aW9uOiBPcHRpb247IC8vIEN1YmlzbSBTREsgT3B0aW9uXHJcbiAgX3ZpZXc6IExBcHBWaWV3OyAvLyBWaWV35oOF5aCxXHJcbiAgX2NhcHR1cmVkOiBib29sZWFuOyAvLyDjgq/jg6rjg4Pjgq/jgZfjgabjgYTjgovjgYtcclxuICBfbW91c2VYOiBudW1iZXI7IC8vIOODnuOCpuOCuVjluqfmqJlcclxuICBfbW91c2VZOiBudW1iZXI7IC8vIOODnuOCpuOCuVnluqfmqJlcclxuICBfaXNFbmQ6IGJvb2xlYW47IC8vIEFQUOe1guS6huOBl+OBpuOBhOOCi+OBi1xyXG4gIF90ZXh0dXJlTWFuYWdlcjogTEFwcFRleHR1cmVNYW5hZ2VyOyAvLyDjg4bjgq/jgrnjg4Hjg6Pjg57jg43jg7zjgrjjg6Pjg7xcclxufVxyXG5cclxuLyoqXHJcbiAqIOOCr+ODquODg+OCr+OBl+OBn+OBqOOBjeOBq+WRvOOBsOOCjOOCi+OAglxyXG4gKi9cclxuZnVuY3Rpb24gb25DbGlja0JlZ2FuKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICBpZiAoIUxBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3KSB7XHJcbiAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgndmlldyBub3Rmb3VuZCcpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fY2FwdHVyZWQgPSB0cnVlO1xyXG5cclxuICBjb25zdCBwb3NYOiBudW1iZXIgPSBlLnBhZ2VYO1xyXG4gIGNvbnN0IHBvc1k6IG51bWJlciA9IGUucGFnZVk7XHJcblxyXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3Lm9uVG91Y2hlc0JlZ2FuKHBvc1gsIHBvc1kpO1xyXG59XHJcblxyXG4vKipcclxuICog44Oe44Km44K544Od44Kk44Oz44K/44GM5YuV44GE44Gf44KJ5ZG844Gw44KM44KL44CCXHJcbiAqL1xyXG5mdW5jdGlvbiBvbk1vdXNlTW92ZWQoZTogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX2NhcHR1cmVkKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBpZiAoIUxBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3KSB7XHJcbiAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgndmlldyBub3Rmb3VuZCcpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVjdCA9IChlLnRhcmdldCBhcyBFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICBjb25zdCBwb3NYOiBudW1iZXIgPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7XHJcbiAgY29uc3QgcG9zWTogbnVtYmVyID0gZS5jbGllbnRZIC0gcmVjdC50b3A7XHJcblxyXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3Lm9uVG91Y2hlc01vdmVkKHBvc1gsIHBvc1kpO1xyXG59XHJcblxyXG4vKipcclxuICog44Kv44Oq44OD44Kv44GM57WC5LqG44GX44Gf44KJ5ZG844Gw44KM44KL44CCXHJcbiAqL1xyXG5mdW5jdGlvbiBvbkNsaWNrRW5kZWQoZTogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl9jYXB0dXJlZCA9IGZhbHNlO1xyXG4gIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcpIHtcclxuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCd2aWV3IG5vdGZvdW5kJyk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWN0ID0gKGUudGFyZ2V0IGFzIEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gIGNvbnN0IHBvc1g6IG51bWJlciA9IGUuY2xpZW50WCAtIHJlY3QubGVmdDtcclxuICBjb25zdCBwb3NZOiBudW1iZXIgPSBlLmNsaWVudFkgLSByZWN0LnRvcDtcclxuXHJcbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcub25Ub3VjaGVzRW5kZWQocG9zWCwgcG9zWSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDjgr/jg4Pjg4HjgZfjgZ/jgajjgY3jgavlkbzjgbDjgozjgovjgIJcclxuICovXHJcbmZ1bmN0aW9uIG9uVG91Y2hCZWdhbihlOiBUb3VjaEV2ZW50KTogdm9pZCB7XHJcbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xyXG4gICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoJ3ZpZXcgbm90Zm91bmQnKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl9jYXB0dXJlZCA9IHRydWU7XHJcblxyXG4gIGNvbnN0IHBvc1ggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYO1xyXG4gIGNvbnN0IHBvc1kgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xyXG5cclxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldy5vblRvdWNoZXNCZWdhbihwb3NYLCBwb3NZKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOOCueODr+OCpOODl+OBmeOCi+OBqOWRvOOBsOOCjOOCi+OAglxyXG4gKi9cclxuZnVuY3Rpb24gb25Ub3VjaE1vdmVkKGU6IFRvdWNoRXZlbnQpOiB2b2lkIHtcclxuICBpZiAoIUxBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl9jYXB0dXJlZCkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xyXG4gICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoJ3ZpZXcgbm90Zm91bmQnKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlY3QgPSAoZS50YXJnZXQgYXMgRWxlbWVudCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gIGNvbnN0IHBvc1ggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggLSByZWN0LmxlZnQ7XHJcbiAgY29uc3QgcG9zWSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSAtIHJlY3QudG9wO1xyXG5cclxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldy5vblRvdWNoZXNNb3ZlZChwb3NYLCBwb3NZKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOOCv+ODg+ODgeOBjOe1guS6huOBl+OBn+OCieWRvOOBsOOCjOOCi+OAglxyXG4gKi9cclxuZnVuY3Rpb24gb25Ub3VjaEVuZGVkKGU6IFRvdWNoRXZlbnQpOiB2b2lkIHtcclxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fY2FwdHVyZWQgPSBmYWxzZTtcclxuXHJcbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xyXG4gICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoJ3ZpZXcgbm90Zm91bmQnKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlY3QgPSAoZS50YXJnZXQgYXMgRWxlbWVudCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gIGNvbnN0IHBvc1ggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggLSByZWN0LmxlZnQ7XHJcbiAgY29uc3QgcG9zWSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSAtIHJlY3QudG9wO1xyXG5cclxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldy5vblRvdWNoZXNFbmRlZChwb3NYLCBwb3NZKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOOCv+ODg+ODgeOBjOOCreODo+ODs+OCu+ODq+OBleOCjOOCi+OBqOWRvOOBsOOCjOOCi+OAglxyXG4gKi9cclxuZnVuY3Rpb24gb25Ub3VjaENhbmNlbChlOiBUb3VjaEV2ZW50KTogdm9pZCB7XHJcbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX2NhcHR1cmVkID0gZmFsc2U7XHJcblxyXG4gIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcpIHtcclxuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCd2aWV3IG5vdGZvdW5kJyk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWN0ID0gKGUudGFyZ2V0IGFzIEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICBjb25zdCBwb3NYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xyXG4gIGNvbnN0IHBvc1kgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkgLSByZWN0LnRvcDtcclxuXHJcbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcub25Ub3VjaGVzRW5kZWQocG9zWCwgcG9zWSk7XHJcbn1cclxuIiwiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgY2FudmFzLCBnbCB9IGZyb20gJy4vbGFwcGRlbGVnYXRlJztcblxuLyoqXG4gKiDjgrnjg5fjg6njgqTjg4jjgpLlrp/oo4XjgZnjgovjgq/jg6njgrlcbiAqXG4gKiDjg4bjgq/jgrnjg4Hjg6PvvKnvvKTjgIFSZWN044Gu566h55CGXG4gKi9cbmV4cG9ydCBjbGFzcyBMQXBwU3ByaXRlIHtcbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv1xuICAgKiBAcGFyYW0geCAgICAgICAgICAgIHjluqfmqJlcbiAgICogQHBhcmFtIHkgICAgICAgICAgICB55bqn5qiZXG4gICAqIEBwYXJhbSB3aWR0aCAgICAgICAg5qiq5bmFXG4gICAqIEBwYXJhbSBoZWlnaHQgICAgICAg6auY44GVXG4gICAqIEBwYXJhbSB0ZXh0dXJlSWQgICAg44OG44Kv44K544OB44OjXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgdGV4dHVyZUlkOiBXZWJHTFRleHR1cmVcbiAgKSB7XG4gICAgdGhpcy5fcmVjdCA9IG5ldyBSZWN0KCk7XG4gICAgdGhpcy5fcmVjdC5sZWZ0ID0geCAtIHdpZHRoICogMC41O1xuICAgIHRoaXMuX3JlY3QucmlnaHQgPSB4ICsgd2lkdGggKiAwLjU7XG4gICAgdGhpcy5fcmVjdC51cCA9IHkgKyBoZWlnaHQgKiAwLjU7XG4gICAgdGhpcy5fcmVjdC5kb3duID0geSAtIGhlaWdodCAqIDAuNTtcbiAgICB0aGlzLl90ZXh0dXJlID0gdGV4dHVyZUlkO1xuICAgIHRoaXMuX3ZlcnRleEJ1ZmZlciA9IG51bGw7XG4gICAgdGhpcy5fdXZCdWZmZXIgPSBudWxsO1xuICAgIHRoaXMuX2luZGV4QnVmZmVyID0gbnVsbDtcblxuICAgIHRoaXMuX3Bvc2l0aW9uTG9jYXRpb24gPSBudWxsO1xuICAgIHRoaXMuX3V2TG9jYXRpb24gPSBudWxsO1xuICAgIHRoaXMuX3RleHR1cmVMb2NhdGlvbiA9IG51bGw7XG5cbiAgICB0aGlzLl9wb3NpdGlvbkFycmF5ID0gbnVsbDtcbiAgICB0aGlzLl91dkFycmF5ID0gbnVsbDtcbiAgICB0aGlzLl9pbmRleEFycmF5ID0gbnVsbDtcblxuICAgIHRoaXMuX2ZpcnN0RHJhdyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICog6Kej5pS+44GZ44KL44CCXG4gICAqL1xuICBwdWJsaWMgcmVsZWFzZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZWN0ID0gbnVsbDtcblxuICAgIGdsLmRlbGV0ZVRleHR1cmUodGhpcy5fdGV4dHVyZSk7XG4gICAgdGhpcy5fdGV4dHVyZSA9IG51bGw7XG5cbiAgICBnbC5kZWxldGVCdWZmZXIodGhpcy5fdXZCdWZmZXIpO1xuICAgIHRoaXMuX3V2QnVmZmVyID0gbnVsbDtcblxuICAgIGdsLmRlbGV0ZUJ1ZmZlcih0aGlzLl92ZXJ0ZXhCdWZmZXIpO1xuICAgIHRoaXMuX3ZlcnRleEJ1ZmZlciA9IG51bGw7XG5cbiAgICBnbC5kZWxldGVCdWZmZXIodGhpcy5faW5kZXhCdWZmZXIpO1xuICAgIHRoaXMuX2luZGV4QnVmZmVyID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg4bjgq/jgrnjg4Hjg6PjgpLov5TjgZlcbiAgICovXG4gIHB1YmxpYyBnZXRUZXh0dXJlKCk6IFdlYkdMVGV4dHVyZSB7XG4gICAgcmV0dXJuIHRoaXMuX3RleHR1cmU7XG4gIH1cblxuICAvKipcbiAgICog5o+P55S744GZ44KL44CCXG4gICAqIEBwYXJhbSBwcm9ncmFtSWQg44K344Kn44O844OA44O844OX44Ot44Kw44Op44OgXG4gICAqIEBwYXJhbSBjYW52YXMg5o+P55S744GZ44KL44Kt44Oj44Oz44OR44K55oOF5aCxXG4gICAqL1xuICBwdWJsaWMgcmVuZGVyKHByb2dyYW1JZDogV2ViR0xQcm9ncmFtKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3RleHR1cmUgPT0gbnVsbCkge1xuICAgICAgLy8g44Ot44O844OJ44GM5a6M5LqG44GX44Gm44GE44Gq44GEXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8g5Yid5Zue5o+P55S75pmCXG4gICAgaWYgKHRoaXMuX2ZpcnN0RHJhdykge1xuICAgICAgLy8g5L2V55Wq55uu44GuYXR0cmlidXRl5aSJ5pWw44GL5Y+W5b6XXG4gICAgICB0aGlzLl9wb3NpdGlvbkxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbUlkLCAncG9zaXRpb24nKTtcbiAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuX3Bvc2l0aW9uTG9jYXRpb24pO1xuXG4gICAgICB0aGlzLl91dkxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbUlkLCAndXYnKTtcbiAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuX3V2TG9jYXRpb24pO1xuXG4gICAgICAvLyDkvZXnlarnm67jga51bmlmb3Jt5aSJ5pWw44GL5Y+W5b6XXG4gICAgICB0aGlzLl90ZXh0dXJlTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbUlkLCAndGV4dHVyZScpO1xuXG4gICAgICAvLyB1bmlmb3Jt5bGe5oCn44Gu55m76YyyXG4gICAgICBnbC51bmlmb3JtMWkodGhpcy5fdGV4dHVyZUxvY2F0aW9uLCAwKTtcblxuICAgICAgLy8gdXbjg5Djg4Pjg5XjgqHjgIHluqfmqJnliJ3mnJ/ljJZcbiAgICAgIHtcbiAgICAgICAgdGhpcy5fdXZBcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkoW1xuICAgICAgICAgIDEuMCwgMC4wLCAwLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMS4wXG4gICAgICAgIF0pO1xuXG4gICAgICAgIC8vIHV244OQ44OD44OV44Kh44KS5L2c5oiQXG4gICAgICAgIHRoaXMuX3V2QnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIOmggueCueODkOODg+ODleOCoeOAgeW6p+aomeWIneacn+WMllxuICAgICAge1xuICAgICAgICBjb25zdCBtYXhXaWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICAgICAgY29uc3QgbWF4SGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcblxuICAgICAgICAvLyDpoILngrnjg4fjg7zjgr9cbiAgICAgICAgdGhpcy5fcG9zaXRpb25BcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkoW1xuICAgICAgICAgICh0aGlzLl9yZWN0LnJpZ2h0IC0gbWF4V2lkdGggKiAwLjUpIC8gKG1heFdpZHRoICogMC41KSxcbiAgICAgICAgICAodGhpcy5fcmVjdC51cCAtIG1heEhlaWdodCAqIDAuNSkgLyAobWF4SGVpZ2h0ICogMC41KSxcbiAgICAgICAgICAodGhpcy5fcmVjdC5sZWZ0IC0gbWF4V2lkdGggKiAwLjUpIC8gKG1heFdpZHRoICogMC41KSxcbiAgICAgICAgICAodGhpcy5fcmVjdC51cCAtIG1heEhlaWdodCAqIDAuNSkgLyAobWF4SGVpZ2h0ICogMC41KSxcbiAgICAgICAgICAodGhpcy5fcmVjdC5sZWZ0IC0gbWF4V2lkdGggKiAwLjUpIC8gKG1heFdpZHRoICogMC41KSxcbiAgICAgICAgICAodGhpcy5fcmVjdC5kb3duIC0gbWF4SGVpZ2h0ICogMC41KSAvIChtYXhIZWlnaHQgKiAwLjUpLFxuICAgICAgICAgICh0aGlzLl9yZWN0LnJpZ2h0IC0gbWF4V2lkdGggKiAwLjUpIC8gKG1heFdpZHRoICogMC41KSxcbiAgICAgICAgICAodGhpcy5fcmVjdC5kb3duIC0gbWF4SGVpZ2h0ICogMC41KSAvIChtYXhIZWlnaHQgKiAwLjUpXG4gICAgICAgIF0pO1xuXG4gICAgICAgIC8vIOmggueCueODkOODg+ODleOCoeOCkuS9nOaIkFxuICAgICAgICB0aGlzLl92ZXJ0ZXhCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICAgIH1cblxuICAgICAgLy8g6aCC54K544Kk44Oz44OH44OD44Kv44K544OQ44OD44OV44Kh44CB5Yid5pyf5YyWXG4gICAgICB7XG4gICAgICAgIC8vIOOCpOODs+ODh+ODg+OCr+OCueODh+ODvOOCv1xuICAgICAgICB0aGlzLl9pbmRleEFycmF5ID0gbmV3IFVpbnQxNkFycmF5KFswLCAxLCAyLCAzLCAyLCAwXSk7XG5cbiAgICAgICAgLy8g44Kk44Oz44OH44OD44Kv44K544OQ44OD44OV44Kh44KS5L2c5oiQXG4gICAgICAgIHRoaXMuX2luZGV4QnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2ZpcnN0RHJhdyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFVW5bqn5qiZ55m76YyyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMuX3V2QnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5fdXZBcnJheSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgLy8gYXR0cmlidXRl5bGe5oCn44KS55m76YyyXG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLl91dkxvY2F0aW9uLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXG4gICAgLy8g6aCC54K55bqn5qiZ44KS55m76YyyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMuX3ZlcnRleEJ1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHRoaXMuX3Bvc2l0aW9uQXJyYXksIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIC8vIGF0dHJpYnV0ZeWxnuaAp+OCkueZu+mMslxuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5fcG9zaXRpb25Mb2NhdGlvbiwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcblxuICAgIC8vIOmggueCueOCpOODs+ODh+ODg+OCr+OCueOCkuS9nOaIkFxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuX2luZGV4QnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLl9pbmRleEFycmF5LCBnbC5EWU5BTUlDX0RSQVcpO1xuXG4gICAgLy8g44Oi44OH44Or44Gu5o+P55S7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5fdGV4dHVyZSk7XG4gICAgZ2wuZHJhd0VsZW1lbnRzKFxuICAgICAgZ2wuVFJJQU5HTEVTLFxuICAgICAgdGhpcy5faW5kZXhBcnJheS5sZW5ndGgsXG4gICAgICBnbC5VTlNJR05FRF9TSE9SVCxcbiAgICAgIDBcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIOW9k+OBn+OCiuWIpOWumlxuICAgKiBAcGFyYW0gcG9pbnRYIHjluqfmqJlcbiAgICogQHBhcmFtIHBvaW50WSB55bqn5qiZXG4gICAqL1xuICBwdWJsaWMgaXNIaXQocG9pbnRYOiBudW1iZXIsIHBvaW50WTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgLy8g55S76Z2i44K144Kk44K644KS5Y+W5b6X44GZ44KL44CCXG4gICAgY29uc3QgeyBoZWlnaHQgfSA9IGNhbnZhcztcblxuICAgIC8vIFnluqfmqJnjga/lpInmj5vjgZnjgovlv4XopoHjgYLjgopcbiAgICBjb25zdCB5ID0gaGVpZ2h0IC0gcG9pbnRZO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIHBvaW50WCA+PSB0aGlzLl9yZWN0LmxlZnQgJiZcbiAgICAgIHBvaW50WCA8PSB0aGlzLl9yZWN0LnJpZ2h0ICYmXG4gICAgICB5IDw9IHRoaXMuX3JlY3QudXAgJiZcbiAgICAgIHkgPj0gdGhpcy5fcmVjdC5kb3duXG4gICAgKTtcbiAgfVxuXG4gIF90ZXh0dXJlOiBXZWJHTFRleHR1cmU7IC8vIOODhuOCr+OCueODgeODo1xuICBfdmVydGV4QnVmZmVyOiBXZWJHTEJ1ZmZlcjsgLy8g6aCC54K544OQ44OD44OV44KhXG4gIF91dkJ1ZmZlcjogV2ViR0xCdWZmZXI7IC8vIHV26aCC54K544OQ44OD44OV44KhXG4gIF9pbmRleEJ1ZmZlcjogV2ViR0xCdWZmZXI7IC8vIOmggueCueOCpOODs+ODh+ODg+OCr+OCueODkOODg+ODleOCoVxuICBfcmVjdDogUmVjdDsgLy8g55+p5b2iXG5cbiAgX3Bvc2l0aW9uTG9jYXRpb246IG51bWJlcjtcbiAgX3V2TG9jYXRpb246IG51bWJlcjtcbiAgX3RleHR1cmVMb2NhdGlvbjogV2ViR0xVbmlmb3JtTG9jYXRpb247XG5cbiAgX3Bvc2l0aW9uQXJyYXk6IEZsb2F0MzJBcnJheTtcbiAgX3V2QXJyYXk6IEZsb2F0MzJBcnJheTtcbiAgX2luZGV4QXJyYXk6IFVpbnQxNkFycmF5O1xuXG4gIF9maXJzdERyYXc6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBSZWN0IHtcbiAgcHVibGljIGxlZnQ6IG51bWJlcjsgLy8g5bem6L66XG4gIHB1YmxpYyByaWdodDogbnVtYmVyOyAvLyDlj7PovrpcbiAgcHVibGljIHVwOiBudW1iZXI7IC8vIOS4iui+ulxuICBwdWJsaWMgZG93bjogbnVtYmVyOyAvLyDkuIvovrpcbn1cbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgdGhlIExpdmUyRCBPcGVuIFNvZnR3YXJlIGxpY2Vuc2VcclxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgY3NtVmVjdG9yLCBpdGVyYXRvciB9IGZyb20gJ0BmcmFtZXdvcmsvdHlwZS9jc212ZWN0b3InO1xyXG5cclxuaW1wb3J0IHsgZ2wgfSBmcm9tICcuL2xhcHBkZWxlZ2F0ZSc7XHJcblxyXG4vKipcclxuICog44OG44Kv44K544OB44Oj566h55CG44Kv44Op44K5XHJcbiAqIOeUu+WDj+iqreOBv+i+vOOBv+OAgeeuoeeQhuOCkuihjOOBhuOCr+ODqeOCueOAglxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExBcHBUZXh0dXJlTWFuYWdlciB7XHJcbiAgLyoqXHJcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/XHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLl90ZXh0dXJlcyA9IG5ldyBjc21WZWN0b3I8VGV4dHVyZUluZm8+KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDop6PmlL7jgZnjgovjgIJcclxuICAgKi9cclxuICBwdWJsaWMgcmVsZWFzZSgpOiB2b2lkIHtcclxuICAgIGZvciAoXHJcbiAgICAgIGxldCBpdGU6IGl0ZXJhdG9yPFRleHR1cmVJbmZvPiA9IHRoaXMuX3RleHR1cmVzLmJlZ2luKCk7XHJcbiAgICAgIGl0ZS5ub3RFcXVhbCh0aGlzLl90ZXh0dXJlcy5lbmQoKSk7XHJcbiAgICAgIGl0ZS5wcmVJbmNyZW1lbnQoKVxyXG4gICAgKSB7XHJcbiAgICAgIGdsLmRlbGV0ZVRleHR1cmUoaXRlLnB0cigpLmlkKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3RleHR1cmVzID0gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOeUu+WDj+iqreOBv+i+vOOBv1xyXG4gICAqXHJcbiAgICogQHBhcmFtIGZpbGVOYW1lIOiqreOBv+i+vOOCgOeUu+WDj+ODleOCoeOCpOODq+ODkeOCueWQjVxyXG4gICAqIEBwYXJhbSB1c2VQcmVtdWx0aXBseSBQcmVtdWx05Yem55CG44KS5pyJ5Yq544Gr44GZ44KL44GLXHJcbiAgICogQHJldHVybiDnlLvlg4/mg4XloLHjgIHoqq3jgb/ovrzjgb/lpLHmlZfmmYLjga9udWxs44KS6L+U44GZXHJcbiAgICovXHJcbiAgcHVibGljIGNyZWF0ZVRleHR1cmVGcm9tUG5nRmlsZShcclxuICAgIGZpbGVOYW1lOiBzdHJpbmcsXHJcbiAgICB1c2VQcmVtdWx0aXBseTogYm9vbGVhbixcclxuICAgIGNhbGxiYWNrOiAodGV4dHVyZUluZm86IFRleHR1cmVJbmZvKSA9PiB2b2lkXHJcbiAgKTogdm9pZCB7XHJcbiAgICAvLyBzZWFyY2ggbG9hZGVkIHRleHR1cmUgYWxyZWFkeVxyXG4gICAgZm9yIChcclxuICAgICAgbGV0IGl0ZTogaXRlcmF0b3I8VGV4dHVyZUluZm8+ID0gdGhpcy5fdGV4dHVyZXMuYmVnaW4oKTtcclxuICAgICAgaXRlLm5vdEVxdWFsKHRoaXMuX3RleHR1cmVzLmVuZCgpKTtcclxuICAgICAgaXRlLnByZUluY3JlbWVudCgpXHJcbiAgICApIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGl0ZS5wdHIoKS5maWxlTmFtZSA9PSBmaWxlTmFtZSAmJlxyXG4gICAgICAgIGl0ZS5wdHIoKS51c2VQcmVtdWx0cGx5ID09IHVzZVByZW11bHRpcGx5XHJcbiAgICAgICkge1xyXG4gICAgICAgIC8vIDLlm57nm67ku6XpmY3jga/jgq3jg6Pjg4Pjgrfjg6XjgYzkvb/nlKjjgZXjgozjgoso5b6F44Gh5pmC6ZaT44Gq44GXKVxyXG4gICAgICAgIC8vIFdlYktpdOOBp+OBr+WQjOOBmEltYWdl44Gub25sb2Fk44KS5YaN5bqm5ZG844G244Gr44Gv5YaN44Kk44Oz44K544K/44Oz44K544GM5b+F6KaBXHJcbiAgICAgICAgLy8g6Kmz57Sw77yaaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzUwMjQxODFcclxuICAgICAgICBpdGUucHRyKCkuaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaXRlLnB0cigpLmltZy5vbmxvYWQgPSAoKTogdm9pZCA9PiBjYWxsYmFjayhpdGUucHRyKCkpO1xyXG4gICAgICAgIGl0ZS5wdHIoKS5pbWcuc3JjID0gZmlsZU5hbWU7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g44OH44O844K/44Gu44Kq44Oz44Ot44O844OJ44KS44OI44Oq44Ks44O844Gr44GZ44KLXHJcbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGltZy5vbmxvYWQgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgIC8vIOODhuOCr+OCueODgeODo+OCquODluOCuOOCp+OCr+ODiOOBruS9nOaIkFxyXG4gICAgICBjb25zdCB0ZXg6IFdlYkdMVGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcclxuXHJcbiAgICAgIC8vIOODhuOCr+OCueODgeODo+OCkumBuOaKnlxyXG4gICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXgpO1xyXG5cclxuICAgICAgLy8g44OG44Kv44K544OB44Oj44Gr44OU44Kv44K744Or44KS5pu444GN6L6844KAXHJcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoXHJcbiAgICAgICAgZ2wuVEVYVFVSRV8yRCxcclxuICAgICAgICBnbC5URVhUVVJFX01JTl9GSUxURVIsXHJcbiAgICAgICAgZ2wuTElORUFSX01JUE1BUF9MSU5FQVJcclxuICAgICAgKTtcclxuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLkxJTkVBUik7XHJcblxyXG4gICAgICAvLyBQcmVtdWx05Yem55CG44KS6KGM44KP44Gb44KLXHJcbiAgICAgIGlmICh1c2VQcmVtdWx0aXBseSkge1xyXG4gICAgICAgIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTCwgMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIOODhuOCr+OCueODgeODo+OBq+ODlOOCr+OCu+ODq+OCkuabuOOBjei+vOOCgFxyXG4gICAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIGltZyk7XHJcblxyXG4gICAgICAvLyDjg5/jg4Pjg5fjg57jg4Pjg5fjgpLnlJ/miJBcclxuICAgICAgZ2wuZ2VuZXJhdGVNaXBtYXAoZ2wuVEVYVFVSRV8yRCk7XHJcblxyXG4gICAgICAvLyDjg4bjgq/jgrnjg4Hjg6PjgpLjg5DjgqTjg7Pjg4lcclxuICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XHJcblxyXG4gICAgICBjb25zdCB0ZXh0dXJlSW5mbzogVGV4dHVyZUluZm8gPSBuZXcgVGV4dHVyZUluZm8oKTtcclxuICAgICAgaWYgKHRleHR1cmVJbmZvICE9IG51bGwpIHtcclxuICAgICAgICB0ZXh0dXJlSW5mby5maWxlTmFtZSA9IGZpbGVOYW1lO1xyXG4gICAgICAgIHRleHR1cmVJbmZvLndpZHRoID0gaW1nLndpZHRoO1xyXG4gICAgICAgIHRleHR1cmVJbmZvLmhlaWdodCA9IGltZy5oZWlnaHQ7XHJcbiAgICAgICAgdGV4dHVyZUluZm8uaWQgPSB0ZXg7XHJcbiAgICAgICAgdGV4dHVyZUluZm8uaW1nID0gaW1nO1xyXG4gICAgICAgIHRleHR1cmVJbmZvLnVzZVByZW11bHRwbHkgPSB1c2VQcmVtdWx0aXBseTtcclxuICAgICAgICB0aGlzLl90ZXh0dXJlcy5wdXNoQmFjayh0ZXh0dXJlSW5mbyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNhbGxiYWNrKHRleHR1cmVJbmZvKTtcclxuICAgIH07XHJcbiAgICBpbWcuc3JjID0gZmlsZU5hbWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDnlLvlg4/jga7op6PmlL5cclxuICAgKlxyXG4gICAqIOmFjeWIl+OBq+WtmOWcqOOBmeOCi+eUu+WDj+WFqOOBpuOCkuino+aUvuOBmeOCi+OAglxyXG4gICAqL1xyXG4gIHB1YmxpYyByZWxlYXNlVGV4dHVyZXMoKTogdm9pZCB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3RleHR1cmVzLmdldFNpemUoKTsgaSsrKSB7XHJcbiAgICAgIHRoaXMuX3RleHR1cmVzLnNldChpLCBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl90ZXh0dXJlcy5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog55S75YOP44Gu6Kej5pS+XHJcbiAgICpcclxuICAgKiDmjIflrprjgZfjgZ/jg4bjgq/jgrnjg4Hjg6Pjga7nlLvlg4/jgpLop6PmlL7jgZnjgovjgIJcclxuICAgKiBAcGFyYW0gdGV4dHVyZSDop6PmlL7jgZnjgovjg4bjgq/jgrnjg4Hjg6NcclxuICAgKi9cclxuICBwdWJsaWMgcmVsZWFzZVRleHR1cmVCeVRleHR1cmUodGV4dHVyZTogV2ViR0xUZXh0dXJlKTogdm9pZCB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3RleHR1cmVzLmdldFNpemUoKTsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLl90ZXh0dXJlcy5hdChpKS5pZCAhPSB0ZXh0dXJlKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX3RleHR1cmVzLnNldChpLCBudWxsKTtcclxuICAgICAgdGhpcy5fdGV4dHVyZXMucmVtb3ZlKGkpO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOeUu+WDj+OBruino+aUvlxyXG4gICAqXHJcbiAgICog5oyH5a6a44GX44Gf5ZCN5YmN44Gu55S75YOP44KS6Kej5pS+44GZ44KL44CCXHJcbiAgICogQHBhcmFtIGZpbGVOYW1lIOino+aUvuOBmeOCi+eUu+WDj+ODleOCoeOCpOODq+ODkeOCueWQjVxyXG4gICAqL1xyXG4gIHB1YmxpYyByZWxlYXNlVGV4dHVyZUJ5RmlsZVBhdGgoZmlsZU5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl90ZXh0dXJlcy5nZXRTaXplKCk7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5fdGV4dHVyZXMuYXQoaSkuZmlsZU5hbWUgPT0gZmlsZU5hbWUpIHtcclxuICAgICAgICB0aGlzLl90ZXh0dXJlcy5zZXQoaSwgbnVsbCk7XHJcbiAgICAgICAgdGhpcy5fdGV4dHVyZXMucmVtb3ZlKGkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfdGV4dHVyZXM6IGNzbVZlY3RvcjxUZXh0dXJlSW5mbz47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnlLvlg4/mg4XloLHmp4vpgKDkvZNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUZXh0dXJlSW5mbyB7XHJcbiAgaW1nOiBIVE1MSW1hZ2VFbGVtZW50OyAvLyDnlLvlg49cclxuICBpZDogV2ViR0xUZXh0dXJlID0gbnVsbDsgLy8g44OG44Kv44K544OB44OjXHJcbiAgd2lkdGggPSAwOyAvLyDmqKrluYVcclxuICBoZWlnaHQgPSAwOyAvLyDpq5jjgZVcclxuICB1c2VQcmVtdWx0cGx5OiBib29sZWFuOyAvLyBQcmVtdWx05Yem55CG44KS5pyJ5Yq544Gr44GZ44KL44GLXHJcbiAgZmlsZU5hbWU6IHN0cmluZzsgLy8g44OV44Kh44Kk44Or5ZCNXHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxyXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cclxuICovXHJcblxyXG5pbXBvcnQgeyBDdWJpc21NYXRyaXg0NCB9IGZyb20gJ0BmcmFtZXdvcmsvbWF0aC9jdWJpc21tYXRyaXg0NCc7XHJcbmltcG9ydCB7IEN1YmlzbVZpZXdNYXRyaXggfSBmcm9tICdAZnJhbWV3b3JrL21hdGgvY3ViaXNtdmlld21hdHJpeCc7XHJcblxyXG5pbXBvcnQgKiBhcyBMQXBwRGVmaW5lIGZyb20gJy4vbGFwcGRlZmluZSc7XHJcbmltcG9ydCB7IGNhbnZhcywgZ2wsIExBcHBEZWxlZ2F0ZSB9IGZyb20gJy4vbGFwcGRlbGVnYXRlJztcclxuaW1wb3J0IHsgTEFwcExpdmUyRE1hbmFnZXIgfSBmcm9tICcuL2xhcHBsaXZlMmRtYW5hZ2VyJztcclxuaW1wb3J0IHsgTEFwcFBhbCB9IGZyb20gJy4vbGFwcHBhbCc7XHJcbmltcG9ydCB7IExBcHBTcHJpdGUgfSBmcm9tICcuL2xhcHBzcHJpdGUnO1xyXG5pbXBvcnQgeyBUZXh0dXJlSW5mbyB9IGZyb20gJy4vbGFwcHRleHR1cmVtYW5hZ2VyJztcclxuaW1wb3J0IHsgVG91Y2hNYW5hZ2VyIH0gZnJvbSAnLi90b3VjaG1hbmFnZXInO1xyXG5cclxuLyoqXHJcbiAqIOaPj+eUu+OCr+ODqeOCueOAglxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExBcHBWaWV3IHtcclxuICAvKipcclxuICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr9cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX3Byb2dyYW1JZCA9IG51bGw7XHJcbiAgICB0aGlzLl9iYWNrID0gbnVsbDtcclxuICAgIHRoaXMuX2dlYXIgPSBudWxsO1xyXG5cclxuICAgIC8vIOOCv+ODg+ODgemWouS/guOBruOCpOODmeODs+ODiOeuoeeQhlxyXG4gICAgdGhpcy5fdG91Y2hNYW5hZ2VyID0gbmV3IFRvdWNoTWFuYWdlcigpO1xyXG5cclxuICAgIC8vIOODh+ODkOOCpOOCueW6p+aomeOBi+OCieOCueOCr+ODquODvOODs+W6p+aomeOBq+WkieaPm+OBmeOCi+OBn+OCgeOBrlxyXG4gICAgdGhpcy5fZGV2aWNlVG9TY3JlZW4gPSBuZXcgQ3ViaXNtTWF0cml4NDQoKTtcclxuXHJcbiAgICAvLyDnlLvpnaLjga7ooajnpLrjga7mi6HlpKfnuK7lsI/jgoTnp7vli5Xjga7lpInmj5vjgpLooYzjgYbooYzliJdcclxuICAgIHRoaXMuX3ZpZXdNYXRyaXggPSBuZXcgQ3ViaXNtVmlld01hdHJpeCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5Yid5pyf5YyW44GZ44KL44CCXHJcbiAgICovXHJcbiAgcHVibGljIGluaXRpYWxpemUoKTogdm9pZCB7XHJcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGNhbnZhcztcclxuXHJcbiAgICBjb25zdCByYXRpbzogbnVtYmVyID0gd2lkdGggLyBoZWlnaHQ7XHJcbiAgICBjb25zdCBsZWZ0OiBudW1iZXIgPSAtcmF0aW87XHJcbiAgICBjb25zdCByaWdodDogbnVtYmVyID0gcmF0aW87XHJcbiAgICBjb25zdCBib3R0b206IG51bWJlciA9IExBcHBEZWZpbmUuVmlld0xvZ2ljYWxMZWZ0O1xyXG4gICAgY29uc3QgdG9wOiBudW1iZXIgPSBMQXBwRGVmaW5lLlZpZXdMb2dpY2FsUmlnaHQ7XHJcblxyXG4gICAgdGhpcy5fdmlld01hdHJpeC5zZXRTY3JlZW5SZWN0KGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCk7IC8vIOODh+ODkOOCpOOCueOBq+WvvuW/nOOBmeOCi+eUu+mdouOBruevhOWbsuOAgiBY44Gu5bem56uv44CBWOOBruWPs+err+OAgVnjga7kuIvnq6/jgIFZ44Gu5LiK56uvXHJcbiAgICB0aGlzLl92aWV3TWF0cml4LnNjYWxlKExBcHBEZWZpbmUuVmlld1NjYWxlLCBMQXBwRGVmaW5lLlZpZXdTY2FsZSk7XHJcblxyXG4gICAgdGhpcy5fZGV2aWNlVG9TY3JlZW4ubG9hZElkZW50aXR5KCk7XHJcbiAgICBpZiAod2lkdGggPiBoZWlnaHQpIHtcclxuICAgICAgY29uc3Qgc2NyZWVuVzogbnVtYmVyID0gTWF0aC5hYnMocmlnaHQgLSBsZWZ0KTtcclxuICAgICAgdGhpcy5fZGV2aWNlVG9TY3JlZW4uc2NhbGVSZWxhdGl2ZShzY3JlZW5XIC8gd2lkdGgsIC1zY3JlZW5XIC8gd2lkdGgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3Qgc2NyZWVuSDogbnVtYmVyID0gTWF0aC5hYnModG9wIC0gYm90dG9tKTtcclxuICAgICAgdGhpcy5fZGV2aWNlVG9TY3JlZW4uc2NhbGVSZWxhdGl2ZShzY3JlZW5IIC8gaGVpZ2h0LCAtc2NyZWVuSCAvIGhlaWdodCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9kZXZpY2VUb1NjcmVlbi50cmFuc2xhdGVSZWxhdGl2ZSgtd2lkdGggKiAwLjUsIC1oZWlnaHQgKiAwLjUpO1xyXG5cclxuICAgIC8vIOihqOekuuevhOWbsuOBruioreWumlxyXG4gICAgdGhpcy5fdmlld01hdHJpeC5zZXRNYXhTY2FsZShMQXBwRGVmaW5lLlZpZXdNYXhTY2FsZSk7IC8vIOmZkOeVjOaLoeW8teeOh1xyXG4gICAgdGhpcy5fdmlld01hdHJpeC5zZXRNaW5TY2FsZShMQXBwRGVmaW5lLlZpZXdNaW5TY2FsZSk7IC8vIOmZkOeVjOe4ruWwj+eOh1xyXG5cclxuICAgIC8vIOihqOekuuOBp+OBjeOCi+acgOWkp+evhOWbslxyXG4gICAgdGhpcy5fdmlld01hdHJpeC5zZXRNYXhTY3JlZW5SZWN0KFxyXG4gICAgICBMQXBwRGVmaW5lLlZpZXdMb2dpY2FsTWF4TGVmdCxcclxuICAgICAgTEFwcERlZmluZS5WaWV3TG9naWNhbE1heFJpZ2h0LFxyXG4gICAgICBMQXBwRGVmaW5lLlZpZXdMb2dpY2FsTWF4Qm90dG9tLFxyXG4gICAgICBMQXBwRGVmaW5lLlZpZXdMb2dpY2FsTWF4VG9wXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6Kej5pS+44GZ44KLXHJcbiAgICovXHJcbiAgcHVibGljIHJlbGVhc2UoKTogdm9pZCB7XHJcbiAgICB0aGlzLl92aWV3TWF0cml4ID0gbnVsbDtcclxuICAgIHRoaXMuX3RvdWNoTWFuYWdlciA9IG51bGw7XHJcbiAgICB0aGlzLl9kZXZpY2VUb1NjcmVlbiA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5fZ2Vhci5yZWxlYXNlKCk7XHJcbiAgICB0aGlzLl9nZWFyID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLl9iYWNrLnJlbGVhc2UoKTtcclxuICAgIHRoaXMuX2JhY2sgPSBudWxsO1xyXG5cclxuICAgIGdsLmRlbGV0ZVByb2dyYW0odGhpcy5fcHJvZ3JhbUlkKTtcclxuICAgIHRoaXMuX3Byb2dyYW1JZCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmj4/nlLvjgZnjgovjgIJcclxuICAgKi9cclxuICBwdWJsaWMgcmVuZGVyKCk6IHZvaWQge1xyXG4gICAgZ2wudXNlUHJvZ3JhbSh0aGlzLl9wcm9ncmFtSWQpO1xyXG5cclxuICAgIGlmICh0aGlzLl9iYWNrKSB7XHJcbiAgICAgIHRoaXMuX2JhY2sucmVuZGVyKHRoaXMuX3Byb2dyYW1JZCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fZ2Vhcikge1xyXG4gICAgICB0aGlzLl9nZWFyLnJlbmRlcih0aGlzLl9wcm9ncmFtSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdsLmZsdXNoKCk7XHJcblxyXG4gICAgY29uc3QgbGl2ZTJETWFuYWdlcjogTEFwcExpdmUyRE1hbmFnZXIgPSBMQXBwTGl2ZTJETWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICAgIGxpdmUyRE1hbmFnZXIuc2V0Vmlld01hdHJpeCh0aGlzLl92aWV3TWF0cml4KTtcclxuXHJcbiAgICBsaXZlMkRNYW5hZ2VyLm9uVXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDnlLvlg4/jga7liJ3mnJ/ljJbjgpLooYzjgYbjgIJcclxuICAgKi9cclxuICBwdWJsaWMgaW5pdGlhbGl6ZVNwcml0ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHdpZHRoOiBudW1iZXIgPSBjYW52YXMud2lkdGg7XHJcbiAgICBjb25zdCBoZWlnaHQ6IG51bWJlciA9IGNhbnZhcy5oZWlnaHQ7XHJcblxyXG4gICAgY29uc3QgdGV4dHVyZU1hbmFnZXIgPSBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5nZXRUZXh0dXJlTWFuYWdlcigpO1xyXG4gICAgY29uc3QgcmVzb3VyY2VzUGF0aCA9IExBcHBEZWZpbmUuUmVzb3VyY2VzUGF0aDtcclxuXHJcbiAgICBsZXQgaW1hZ2VOYW1lID0gJyc7XHJcblxyXG4gICAgLy8g6IOM5pmv55S75YOP5Yid5pyf5YyWXHJcbiAgICBpbWFnZU5hbWUgPSBMQXBwRGVmaW5lLkJhY2tJbWFnZU5hbWU7XHJcblxyXG4gICAgLy8g6Z2e5ZCM5pyf44Gq44Gu44Gn44Kz44O844Or44OQ44OD44Kv6Zai5pWw44KS5L2c5oiQXHJcbiAgICBjb25zdCBpbml0QmFja0dyb3VuZFRleHR1cmUgPSAodGV4dHVyZUluZm86IFRleHR1cmVJbmZvKTogdm9pZCA9PiB7XHJcbiAgICAgIGNvbnN0IHg6IG51bWJlciA9IHdpZHRoICogMC41O1xyXG4gICAgICBjb25zdCB5OiBudW1iZXIgPSBoZWlnaHQgKiAwLjU7XHJcblxyXG4gICAgICBjb25zdCBmd2lkdGggPSB0ZXh0dXJlSW5mby53aWR0aCAqIDIuMDtcclxuICAgICAgY29uc3QgZmhlaWdodCA9IGhlaWdodCAqIDAuOTU7XHJcbiAgICAgIHRoaXMuX2JhY2sgPSBuZXcgTEFwcFNwcml0ZSh4LCB5LCBmd2lkdGgsIGZoZWlnaHQsIHRleHR1cmVJbmZvLmlkKTtcclxuICAgIH07XHJcblxyXG4gICAgdGV4dHVyZU1hbmFnZXIuY3JlYXRlVGV4dHVyZUZyb21QbmdGaWxlKFxyXG4gICAgICByZXNvdXJjZXNQYXRoICsgaW1hZ2VOYW1lLFxyXG4gICAgICBmYWxzZSxcclxuICAgICAgaW5pdEJhY2tHcm91bmRUZXh0dXJlXHJcbiAgICApO1xyXG5cclxuICAgIC8vIOatr+i7iueUu+WDj+WIneacn+WMllxyXG4gICAgaW1hZ2VOYW1lID0gTEFwcERlZmluZS5HZWFySW1hZ2VOYW1lO1xyXG4gICAgY29uc3QgaW5pdEdlYXJUZXh0dXJlID0gKHRleHR1cmVJbmZvOiBUZXh0dXJlSW5mbyk6IHZvaWQgPT4ge1xyXG4gICAgICBjb25zdCB4ID0gd2lkdGggLSB0ZXh0dXJlSW5mby53aWR0aCAqIDAuNTtcclxuICAgICAgY29uc3QgeSA9IGhlaWdodCAtIHRleHR1cmVJbmZvLmhlaWdodCAqIDAuNTtcclxuICAgICAgY29uc3QgZndpZHRoID0gdGV4dHVyZUluZm8ud2lkdGg7XHJcbiAgICAgIGNvbnN0IGZoZWlnaHQgPSB0ZXh0dXJlSW5mby5oZWlnaHQ7XHJcbiAgICAgIHRoaXMuX2dlYXIgPSBuZXcgTEFwcFNwcml0ZSh4LCB5LCBmd2lkdGgsIGZoZWlnaHQsIHRleHR1cmVJbmZvLmlkKTtcclxuICAgIH07XHJcblxyXG4gICAgdGV4dHVyZU1hbmFnZXIuY3JlYXRlVGV4dHVyZUZyb21QbmdGaWxlKFxyXG4gICAgICByZXNvdXJjZXNQYXRoICsgaW1hZ2VOYW1lLFxyXG4gICAgICBmYWxzZSxcclxuICAgICAgaW5pdEdlYXJUZXh0dXJlXHJcbiAgICApO1xyXG5cclxuICAgIC8vIOOCt+OCp+ODvOODgOODvOOCkuS9nOaIkFxyXG4gICAgaWYgKHRoaXMuX3Byb2dyYW1JZCA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuX3Byb2dyYW1JZCA9IExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLmNyZWF0ZVNoYWRlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K/44OD44OB44GV44KM44Gf5pmC44Gr5ZG844Gw44KM44KL44CCXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcG9pbnRYIOOCueOCr+ODquODvOODs1jluqfmqJlcclxuICAgKiBAcGFyYW0gcG9pbnRZIOOCueOCr+ODquODvOODs1nluqfmqJlcclxuICAgKi9cclxuICBwdWJsaWMgb25Ub3VjaGVzQmVnYW4ocG9pbnRYOiBudW1iZXIsIHBvaW50WTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLl90b3VjaE1hbmFnZXIudG91Y2hlc0JlZ2FuKHBvaW50WCwgcG9pbnRZKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCv+ODg+ODgeOBl+OBpuOBhOOCi+OBqOOBjeOBq+ODneOCpOODs+OCv+OBjOWLleOBhOOBn+OCieWRvOOBsOOCjOOCi+OAglxyXG4gICAqXHJcbiAgICogQHBhcmFtIHBvaW50WCDjgrnjgq/jg6rjg7zjg7NY5bqn5qiZXHJcbiAgICogQHBhcmFtIHBvaW50WSDjgrnjgq/jg6rjg7zjg7NZ5bqn5qiZXHJcbiAgICovXHJcbiAgcHVibGljIG9uVG91Y2hlc01vdmVkKHBvaW50WDogbnVtYmVyLCBwb2ludFk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3Qgdmlld1g6IG51bWJlciA9IHRoaXMudHJhbnNmb3JtVmlld1godGhpcy5fdG91Y2hNYW5hZ2VyLmdldFgoKSk7XHJcbiAgICBjb25zdCB2aWV3WTogbnVtYmVyID0gdGhpcy50cmFuc2Zvcm1WaWV3WSh0aGlzLl90b3VjaE1hbmFnZXIuZ2V0WSgpKTtcclxuXHJcbiAgICB0aGlzLl90b3VjaE1hbmFnZXIudG91Y2hlc01vdmVkKHBvaW50WCwgcG9pbnRZKTtcclxuXHJcbiAgICBjb25zdCBsaXZlMkRNYW5hZ2VyOiBMQXBwTGl2ZTJETWFuYWdlciA9IExBcHBMaXZlMkRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICBsaXZlMkRNYW5hZ2VyLm9uRHJhZyh2aWV3WCwgdmlld1kpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K/44OD44OB44GM57WC5LqG44GX44Gf44KJ5ZG844Gw44KM44KL44CCXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcG9pbnRYIOOCueOCr+ODquODvOODs1jluqfmqJlcclxuICAgKiBAcGFyYW0gcG9pbnRZIOOCueOCr+ODquODvOODs1nluqfmqJlcclxuICAgKi9cclxuICBwdWJsaWMgb25Ub3VjaGVzRW5kZWQocG9pbnRYOiBudW1iZXIsIHBvaW50WTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAvLyDjgr/jg4Pjg4HntYLkuoZcclxuICAgIGNvbnN0IGxpdmUyRE1hbmFnZXI6IExBcHBMaXZlMkRNYW5hZ2VyID0gTEFwcExpdmUyRE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgIGxpdmUyRE1hbmFnZXIub25EcmFnKDAuMCwgMC4wKTtcclxuXHJcbiAgICB7XHJcbiAgICAgIC8vIOOCt+ODs+OCsOODq+OCv+ODg+ODl1xyXG4gICAgICBjb25zdCB4OiBudW1iZXIgPSB0aGlzLl9kZXZpY2VUb1NjcmVlbi50cmFuc2Zvcm1YKFxyXG4gICAgICAgIHRoaXMuX3RvdWNoTWFuYWdlci5nZXRYKClcclxuICAgICAgKTsgLy8g6KuW55CG5bqn5qiZ5aSJ5o+b44GX44Gf5bqn5qiZ44KS5Y+W5b6X44CCXHJcbiAgICAgIGNvbnN0IHk6IG51bWJlciA9IHRoaXMuX2RldmljZVRvU2NyZWVuLnRyYW5zZm9ybVkoXHJcbiAgICAgICAgdGhpcy5fdG91Y2hNYW5hZ2VyLmdldFkoKVxyXG4gICAgICApOyAvLyDoq5bnkIbluqfmqJnlpInljJbjgZfjgZ/luqfmqJnjgpLlj5blvpfjgIJcclxuXHJcbiAgICAgIGlmIChMQXBwRGVmaW5lLkRlYnVnVG91Y2hMb2dFbmFibGUpIHtcclxuICAgICAgICBMQXBwUGFsLnByaW50TWVzc2FnZShgW0FQUF10b3VjaGVzRW5kZWQgeDogJHt4fSB5OiAke3l9YCk7XHJcbiAgICAgIH1cclxuICAgICAgbGl2ZTJETWFuYWdlci5vblRhcCh4LCB5KTtcclxuXHJcbiAgICAgIC8vIOatr+i7iuOBq+OCv+ODg+ODl+OBl+OBn+OBi1xyXG4gICAgICBpZiAodGhpcy5fZ2Vhci5pc0hpdChwb2ludFgsIHBvaW50WSkpIHtcclxuICAgICAgICBsaXZlMkRNYW5hZ2VyLm5leHRTY2VuZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBY5bqn5qiZ44KSVmlld+W6p+aomeOBq+WkieaPm+OBmeOCi+OAglxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRldmljZVgg44OH44OQ44Kk44K5WOW6p+aomVxyXG4gICAqL1xyXG4gIHB1YmxpYyB0cmFuc2Zvcm1WaWV3WChkZXZpY2VYOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgY29uc3Qgc2NyZWVuWDogbnVtYmVyID0gdGhpcy5fZGV2aWNlVG9TY3JlZW4udHJhbnNmb3JtWChkZXZpY2VYKTsgLy8g6KuW55CG5bqn5qiZ5aSJ5o+b44GX44Gf5bqn5qiZ44KS5Y+W5b6X44CCXHJcbiAgICByZXR1cm4gdGhpcy5fdmlld01hdHJpeC5pbnZlcnRUcmFuc2Zvcm1YKHNjcmVlblgpOyAvLyDmi6HlpKfjgIHnuK7lsI/jgIHnp7vli5Xlvozjga7lgKTjgIJcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFnluqfmqJnjgpJWaWV35bqn5qiZ44Gr5aSJ5o+b44GZ44KL44CCXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGV2aWNlWSDjg4fjg5DjgqTjgrlZ5bqn5qiZXHJcbiAgICovXHJcbiAgcHVibGljIHRyYW5zZm9ybVZpZXdZKGRldmljZVk6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBjb25zdCBzY3JlZW5ZOiBudW1iZXIgPSB0aGlzLl9kZXZpY2VUb1NjcmVlbi50cmFuc2Zvcm1ZKGRldmljZVkpOyAvLyDoq5bnkIbluqfmqJnlpInmj5vjgZfjgZ/luqfmqJnjgpLlj5blvpfjgIJcclxuICAgIHJldHVybiB0aGlzLl92aWV3TWF0cml4LmludmVydFRyYW5zZm9ybVkoc2NyZWVuWSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBY5bqn5qiZ44KSU2NyZWVu5bqn5qiZ44Gr5aSJ5o+b44GZ44KL44CCXHJcbiAgICogQHBhcmFtIGRldmljZVgg44OH44OQ44Kk44K5WOW6p+aomVxyXG4gICAqL1xyXG4gIHB1YmxpYyB0cmFuc2Zvcm1TY3JlZW5YKGRldmljZVg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGV2aWNlVG9TY3JlZW4udHJhbnNmb3JtWChkZXZpY2VYKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFnluqfmqJnjgpJTY3JlZW7luqfmqJnjgavlpInmj5vjgZnjgovjgIJcclxuICAgKlxyXG4gICAqIEBwYXJhbSBkZXZpY2VZIOODh+ODkOOCpOOCuVnluqfmqJlcclxuICAgKi9cclxuICBwdWJsaWMgdHJhbnNmb3JtU2NyZWVuWShkZXZpY2VZOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RldmljZVRvU2NyZWVuLnRyYW5zZm9ybVkoZGV2aWNlWSk7XHJcbiAgfVxyXG5cclxuICBfdG91Y2hNYW5hZ2VyOiBUb3VjaE1hbmFnZXI7IC8vIOOCv+ODg+ODgeODnuODjeODvOOCuOODo+ODvFxyXG4gIF9kZXZpY2VUb1NjcmVlbjogQ3ViaXNtTWF0cml4NDQ7IC8vIOODh+ODkOOCpOOCueOBi+OCieOCueOCr+ODquODvOODs+OBuOOBruihjOWIl1xyXG4gIF92aWV3TWF0cml4OiBDdWJpc21WaWV3TWF0cml4OyAvLyB2aWV3TWF0cml4XHJcbiAgX3Byb2dyYW1JZDogV2ViR0xQcm9ncmFtOyAvLyDjgrfjgqfjg7zjg4BJRFxyXG4gIF9iYWNrOiBMQXBwU3ByaXRlOyAvLyDog4zmma/nlLvlg49cclxuICBfZ2VhcjogTEFwcFNwcml0ZTsgLy8g44Ku44Ki55S75YOPXHJcbiAgX2NoYW5nZU1vZGVsOiBib29sZWFuOyAvLyDjg6Ljg4fjg6vliIfjgormm7/jgYjjg5Xjg6njgrBcclxuICBfaXNDbGljazogYm9vbGVhbjsgLy8g44Kv44Oq44OD44Kv5LitXHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxyXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgVG91Y2hNYW5hZ2VyIHtcclxuICAvKipcclxuICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr9cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX3N0YXJ0WCA9IDAuMDtcclxuICAgIHRoaXMuX3N0YXJ0WSA9IDAuMDtcclxuICAgIHRoaXMuX2xhc3RYID0gMC4wO1xyXG4gICAgdGhpcy5fbGFzdFkgPSAwLjA7XHJcbiAgICB0aGlzLl9sYXN0WDEgPSAwLjA7XHJcbiAgICB0aGlzLl9sYXN0WTEgPSAwLjA7XHJcbiAgICB0aGlzLl9sYXN0WDIgPSAwLjA7XHJcbiAgICB0aGlzLl9sYXN0WTIgPSAwLjA7XHJcbiAgICB0aGlzLl9sYXN0VG91Y2hEaXN0YW5jZSA9IDAuMDtcclxuICAgIHRoaXMuX2RlbHRhWCA9IDAuMDtcclxuICAgIHRoaXMuX2RlbHRhWSA9IDAuMDtcclxuICAgIHRoaXMuX3NjYWxlID0gMS4wO1xyXG4gICAgdGhpcy5fdG91Y2hTaW5nbGUgPSBmYWxzZTtcclxuICAgIHRoaXMuX2ZsaXBBdmFpbGFibGUgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDZW50ZXJYKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGFzdFg7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0Q2VudGVyWSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xhc3RZO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldERlbHRhWCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RlbHRhWDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXREZWx0YVkoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9kZWx0YVk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0U3RhcnRYKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RhcnRYO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFN0YXJ0WSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0YXJ0WTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTY2FsZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NjYWxlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9sYXN0WDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRZKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGFzdFk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0WDEoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9sYXN0WDE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0WTEoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9sYXN0WTE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0WDIoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9sYXN0WDI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0WTIoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9sYXN0WTI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNTaW5nbGVUb3VjaCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl90b3VjaFNpbmdsZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc0ZsaWNrQXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZsaXBBdmFpbGFibGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzYWJsZUZsaWNrKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fZmxpcEF2YWlsYWJsZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K/44OD44OB6ZaL5aeL5pmC44Kk44OZ44Oz44OIXHJcbiAgICogQHBhcmFtIGRldmljZVgg44K/44OD44OB44GX44Gf55S76Z2i44GueOOBruWApFxyXG4gICAqIEBwYXJhbSBkZXZpY2VZIOOCv+ODg+ODgeOBl+OBn+eUu+mdouOBrnnjga7lgKRcclxuICAgKi9cclxuICBwdWJsaWMgdG91Y2hlc0JlZ2FuKGRldmljZVg6IG51bWJlciwgZGV2aWNlWTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLl9sYXN0WCA9IGRldmljZVg7XHJcbiAgICB0aGlzLl9sYXN0WSA9IGRldmljZVk7XHJcbiAgICB0aGlzLl9zdGFydFggPSBkZXZpY2VYO1xyXG4gICAgdGhpcy5fc3RhcnRZID0gZGV2aWNlWTtcclxuICAgIHRoaXMuX2xhc3RUb3VjaERpc3RhbmNlID0gLTEuMDtcclxuICAgIHRoaXMuX2ZsaXBBdmFpbGFibGUgPSB0cnVlO1xyXG4gICAgdGhpcy5fdG91Y2hTaW5nbGUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44OJ44Op44OD44Kw5pmC44Gu44Kk44OZ44Oz44OIXHJcbiAgICogQHBhcmFtIGRldmljZVgg44K/44OD44OB44GX44Gf55S76Z2i44GueOOBruWApFxyXG4gICAqIEBwYXJhbSBkZXZpY2VZIOOCv+ODg+ODgeOBl+OBn+eUu+mdouOBrnnjga7lgKRcclxuICAgKi9cclxuICBwdWJsaWMgdG91Y2hlc01vdmVkKGRldmljZVg6IG51bWJlciwgZGV2aWNlWTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLl9sYXN0WCA9IGRldmljZVg7XHJcbiAgICB0aGlzLl9sYXN0WSA9IGRldmljZVk7XHJcbiAgICB0aGlzLl9sYXN0VG91Y2hEaXN0YW5jZSA9IC0xLjA7XHJcbiAgICB0aGlzLl90b3VjaFNpbmdsZSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjg5Xjg6rjg4Pjgq/jga7ot53pm6LmuKzlrppcclxuICAgKiBAcmV0dXJuIOODleODquODg+OCr+i3nembolxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRGbGlja0Rpc3RhbmNlKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGVEaXN0YW5jZShcclxuICAgICAgdGhpcy5fc3RhcnRYLFxyXG4gICAgICB0aGlzLl9zdGFydFksXHJcbiAgICAgIHRoaXMuX2xhc3RYLFxyXG4gICAgICB0aGlzLl9sYXN0WVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOeCue+8keOBi+OCieeCue+8kuOBuOOBrui3nembouOCkuaxguOCgeOCi1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHgxIO+8keOBpOebruOBruOCv+ODg+ODgeOBl+OBn+eUu+mdouOBrnjjga7lgKRcclxuICAgKiBAcGFyYW0geTEg77yR44Gk55uu44Gu44K/44OD44OB44GX44Gf55S76Z2i44GueeOBruWApFxyXG4gICAqIEBwYXJhbSB4MiDvvJLjgaTnm67jga7jgr/jg4Pjg4HjgZfjgZ/nlLvpnaLjga5444Gu5YCkXHJcbiAgICogQHBhcmFtIHkyIO+8kuOBpOebruOBruOCv+ODg+ODgeOBl+OBn+eUu+mdouOBrnnjga7lgKRcclxuICAgKi9cclxuICBwdWJsaWMgY2FsY3VsYXRlRGlzdGFuY2UoXHJcbiAgICB4MTogbnVtYmVyLFxyXG4gICAgeTE6IG51bWJlcixcclxuICAgIHgyOiBudW1iZXIsXHJcbiAgICB5MjogbnVtYmVyXHJcbiAgKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLnNxcnQoKHgxIC0geDIpICogKHgxIC0geDIpICsgKHkxIC0geTIpICogKHkxIC0geTIpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIO+8kuOBpOebruOBruWApOOBi+OCieOAgeenu+WLlemHj+OCkuaxguOCgeOCi+OAglxyXG4gICAqIOmBleOBhuaWueWQkeOBruWgtOWQiOOBr+enu+WLlemHj++8kOOAguWQjOOBmOaWueWQkeOBruWgtOWQiOOBr+OAgee1tuWvvuWApOOBjOWwj+OBleOBhOaWueOBruWApOOCkuWPgueFp+OBmeOCi+OAglxyXG4gICAqXHJcbiAgICogQHBhcmFtIHYxIO+8keOBpOebruOBruenu+WLlemHj1xyXG4gICAqIEBwYXJhbSB2MiDvvJLjgaTnm67jga7np7vli5Xph49cclxuICAgKlxyXG4gICAqIEByZXR1cm4g5bCP44GV44GE5pa544Gu56e75YuV6YePXHJcbiAgICovXHJcbiAgcHVibGljIGNhbGN1bGF0ZU1vdmluZ0Ftb3VudCh2MTogbnVtYmVyLCB2MjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGlmICh2MSA+IDAuMCAhPSB2MiA+IDAuMCkge1xyXG4gICAgICByZXR1cm4gMC4wO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNpZ246IG51bWJlciA9IHYxID4gMC4wID8gMS4wIDogLTEuMDtcclxuICAgIGNvbnN0IGFic29sdXRlVmFsdWUxID0gTWF0aC5hYnModjEpO1xyXG4gICAgY29uc3QgYWJzb2x1dGVWYWx1ZTIgPSBNYXRoLmFicyh2Mik7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBzaWduICogKGFic29sdXRlVmFsdWUxIDwgYWJzb2x1dGVWYWx1ZTIgPyBhYnNvbHV0ZVZhbHVlMSA6IGFic29sdXRlVmFsdWUyKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIF9zdGFydFk6IG51bWJlcjsgLy8g44K/44OD44OB44KS6ZaL5aeL44GX44Gf5pmC44GueOOBruWApFxyXG4gIF9zdGFydFg6IG51bWJlcjsgLy8g44K/44OD44OB44KS6ZaL5aeL44GX44Gf5pmC44GueeOBruWApFxyXG4gIF9sYXN0WDogbnVtYmVyOyAvLyDjgrfjg7PjgrDjg6vjgr/jg4Pjg4HmmYLjga5444Gu5YCkXHJcbiAgX2xhc3RZOiBudW1iZXI7IC8vIOOCt+ODs+OCsOODq+OCv+ODg+ODgeaZguOBrnnjga7lgKRcclxuICBfbGFzdFgxOiBudW1iZXI7IC8vIOODgOODluODq+OCv+ODg+ODgeaZguOBruS4gOOBpOebruOBrnjjga7lgKRcclxuICBfbGFzdFkxOiBudW1iZXI7IC8vIOODgOODluODq+OCv+ODg+ODgeaZguOBruS4gOOBpOebruOBrnnjga7lgKRcclxuICBfbGFzdFgyOiBudW1iZXI7IC8vIOODgOODluODq+OCv+ODg+ODgeaZguOBruS6jOOBpOebruOBrnjjga7lgKRcclxuICBfbGFzdFkyOiBudW1iZXI7IC8vIOODgOODluODq+OCv+ODg+ODgeaZguOBruS6jOOBpOebruOBrnnjga7lgKRcclxuICBfbGFzdFRvdWNoRGlzdGFuY2U6IG51bWJlcjsgLy8gMuacrOS7peS4iuOBp+OCv+ODg+ODgeOBl+OBn+OBqOOBjeOBruaMh+OBrui3nembolxyXG4gIF9kZWx0YVg6IG51bWJlcjsgLy8g5YmN5Zue44Gu5YCk44GL44KJ5LuK5Zue44Gu5YCk44G444GueOOBruenu+WLlei3nembouOAglxyXG4gIF9kZWx0YVk6IG51bWJlcjsgLy8g5YmN5Zue44Gu5YCk44GL44KJ5LuK5Zue44Gu5YCk44G444GueeOBruenu+WLlei3nembouOAglxyXG4gIF9zY2FsZTogbnVtYmVyOyAvLyDjgZPjga7jg5Xjg6zjg7zjg6DjgafmjpvjgZHlkIjjgo/jgZvjgovmi6HlpKfnjofjgILmi6HlpKfmk43kvZzkuK3ku6XlpJbjga8x44CCXHJcbiAgX3RvdWNoU2luZ2xlOiBib29sZWFuOyAvLyDjgrfjg7PjgrDjg6vjgr/jg4Pjg4HmmYLjga90cnVlXHJcbiAgX2ZsaXBBdmFpbGFibGU6IGJvb2xlYW47IC8vIOODleODquODg+ODl+OBjOacieWKueOBi+OBqeOBhuOBi1xyXG59XHJcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCJiZDEwZWEzZjA5MjgzM2NiYzczYlwiOyB9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9