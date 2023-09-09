"use strict";
self["webpackHotUpdate"]("main",{

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
            alert('无法初始化WebGL。该浏览器不支持。');
            exports.gl = null;
            document.body.innerHTML =
                '此浏览器不支持<code>&lt;canvas&gt;</code>元素。';
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
            lapppal_1.LAppPal.printMessage('无法创建顶点着色器');
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
            lapppal_1.LAppPal.printMessage('无法创建片段着色器');
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
        lapppal_1.LAppPal.printMessage('未找到视图');
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
        lapppal_1.LAppPal.printMessage('未找到视图');
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
        lapppal_1.LAppPal.printMessage('未找到视图');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.clientX - rect.left;
    var posY = e.clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}
function onTouchBegan(e) {
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('未找到视图');
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
        lapppal_1.LAppPal.printMessage('未找到视图');
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
        lapppal_1.LAppPal.printMessage('未找到视图');
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
        lapppal_1.LAppPal.printMessage('未找到视图');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.changedTouches[0].clientX - rect.left;
    var posY = e.changedTouches[0].clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "a079dab14a22ce22bdf3"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi40MDEwMzBjMzhmMmE3NWI1ZmFlOC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0EsNklBQTJFO0FBRTNFLDhGQUEyQztBQUMzQyx1R0FBd0Q7QUFDeEQseUVBQW9DO0FBQ3BDLDBHQUEwRDtBQUMxRCw0RUFBc0M7QUFFM0IsY0FBTSxHQUFzQixJQUFJLENBQUM7QUFDakMsa0JBQVUsR0FBaUIsSUFBSSxDQUFDO0FBQ2hDLFVBQUUsR0FBMEIsSUFBSSxDQUFDO0FBQ2pDLG1CQUFXLEdBQXFCLElBQUksQ0FBQztBQU1oRDtJQTZPRTtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRXBCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSw4QkFBTSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLG1CQUFRLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksdUNBQWtCLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBL09hLHdCQUFXLEdBQXpCO1FBQ0UsSUFBSSxrQkFBVSxJQUFJLElBQUksRUFBRTtZQUN0QixrQkFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7U0FDakM7UUFFRCxPQUFPLGtCQUFVLENBQUM7SUFDcEIsQ0FBQztJQUthLDRCQUFlLEdBQTdCO1FBQ0UsSUFBSSxrQkFBVSxJQUFJLElBQUksRUFBRTtZQUN0QixrQkFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3RCO1FBRUQsa0JBQVUsR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUtNLGlDQUFVLEdBQWpCO1FBRUUsY0FBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENB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RUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzlELENBQUM7Ozs7Ozs7OztVQ3BiRCxxQ0FBcUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbGFwcGRlbGVnYXRlLnRzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOeJiOadgyhjKSBMaXZlMkTlhazlj7jvvIzkv53nlZnmiYDmnInmnYPliKnjgIJcclxuICpcclxuICog5L2/55So5q2k5rqQ5Luj56CB5Y+XTGl2ZTJE5byA5pS+6L2v5Lu26K645Y+v5Y2P6K6u55qE57qm5p2f77yMXHJcbiAqIOWPr+WcqGh0dHBzOi8vd3d3LmxpdmUyZC5jb20vZXVsYS9saXZlMmQtb3Blbi1zb2Z0d2FyZS1saWNlbnNlLWFncmVlbWVudF9lbi5odG1s5om+5Yiw44CCXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgQ3ViaXNtRnJhbWV3b3JrLCBPcHRpb24gfSBmcm9tICdAZnJhbWV3b3JrL2xpdmUyZGN1YmlzbWZyYW1ld29yayc7XHJcblxyXG5pbXBvcnQgKiBhcyBMQXBwRGVmaW5lIGZyb20gJy4vbGFwcGRlZmluZSc7XHJcbmltcG9ydCB7IExBcHBMaXZlMkRNYW5hZ2VyIH0gZnJvbSAnLi9sYXBwbGl2ZTJkbWFuYWdlcic7XHJcbmltcG9ydCB7IExBcHBQYWwgfSBmcm9tICcuL2xhcHBwYWwnO1xyXG5pbXBvcnQgeyBMQXBwVGV4dHVyZU1hbmFnZXIgfSBmcm9tICcuL2xhcHB0ZXh0dXJlbWFuYWdlcic7XHJcbmltcG9ydCB7IExBcHBWaWV3IH0gZnJvbSAnLi9sYXBwdmlldyc7XHJcblxyXG5leHBvcnQgbGV0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBudWxsO1xyXG5leHBvcnQgbGV0IHNfaW5zdGFuY2U6IExBcHBEZWxlZ2F0ZSA9IG51bGw7XHJcbmV4cG9ydCBsZXQgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCA9IG51bGw7XHJcbmV4cG9ydCBsZXQgZnJhbWVCdWZmZXI6IFdlYkdMRnJhbWVidWZmZXIgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIOW6lOeUqOeoi+W6j+exu+OAglxyXG4gKiDnrqHnkIZDdWJpc20gU0RL44CCXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTEFwcERlbGVnYXRlIHtcclxuICAvKipcclxuICAgKiDov5Tlm57nsbvnmoTlrp7kvovvvIjljZXkvovvvInjgIJcclxuICAgKiDlpoLmnpzlsJrmnKrliJvlu7rlrp7kvovvvIzliJnlhoXpg6jkvJrliJvlu7rkuIDkuKrjgIJcclxuICAgKlxyXG4gICAqIEByZXR1cm4g57G755qE5a6e5L6LXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBMQXBwRGVsZWdhdGUge1xyXG4gICAgaWYgKHNfaW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICBzX2luc3RhbmNlID0gbmV3IExBcHBEZWxlZ2F0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzX2luc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6YeK5pS+57G755qE5a6e5L6L77yI5Y2V5L6L77yJ44CCXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyByZWxlYXNlSW5zdGFuY2UoKTogdm9pZCB7XHJcbiAgICBpZiAoc19pbnN0YW5jZSAhPSBudWxsKSB7XHJcbiAgICAgIHNfaW5zdGFuY2UucmVsZWFzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNfaW5zdGFuY2UgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5Yid5aeL5YyW5bqU55So56iL5bqP5omA6ZyA55qE5YaF5a6544CCXHJcbiAgICovXHJcbiAgcHVibGljIGluaXRpYWxpemUoKTogYm9vbGVhbiB7XHJcbiAgICAvLyDliJvlu7rnlLvluINcclxuICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgaWYgKExBcHBEZWZpbmUuQ2FudmFzU2l6ZSA9PT0gJ2F1dG8nKSB7XHJcbiAgICAgIHRoaXMuX3Jlc2l6ZUNhbnZhcygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2FudmFzLndpZHRoID0gTEFwcERlZmluZS5DYW52YXNTaXplLndpZHRoO1xyXG4gICAgICBjYW52YXMuaGVpZ2h0ID0gTEFwcERlZmluZS5DYW52YXNTaXplLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvLyDliJ3lp4vljJZnbOS4iuS4i+aWh1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnKSB8fCBjYW52YXMuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJyk7XHJcblxyXG4gICAgaWYgKCFnbCkge1xyXG4gICAgICBhbGVydCgn5peg5rOV5Yid5aeL5YyWV2ViR0zjgILor6XmtY/op4jlmajkuI3mlK/mjIHjgIInKTtcclxuICAgICAgZ2wgPSBudWxsO1xyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPVxyXG4gICAgICAgICfmraTmtY/op4jlmajkuI3mlK/mjIE8Y29kZT4mbHQ7Y2FudmFzJmd0OzwvY29kZT7lhYPntKDjgIInO1xyXG5cclxuICAgICAgLy8g5Yid5aeL5YyWZ2zlpLHotKVcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWwhueUu+W4g+a3u+WKoOWIsERPTVxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xyXG5cclxuICAgIGlmICghZnJhbWVCdWZmZXIpIHtcclxuICAgICAgZnJhbWVCdWZmZXIgPSBnbC5nZXRQYXJhbWV0ZXIoZ2wuRlJBTUVCVUZGRVJfQklORElORyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5ZCv55So5re35ZCIXHJcbiAgICBnbC5lbmFibGUoZ2wuQkxFTkQpO1xyXG4gICAgZ2wuYmxlbmRGdW5jKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XHJcblxyXG4gICAgY29uc3Qgc3VwcG9ydFRvdWNoOiBib29sZWFuID0gJ29udG91Y2hlbmQnIGluIGNhbnZhcztcclxuXHJcbiAgICBpZiAoc3VwcG9ydFRvdWNoKSB7XHJcbiAgICAgIC8vIOazqOWGjOinpuaRuOS6i+S7tuWbnuiwg+WHveaVsFxyXG4gICAgICBjYW52YXMub250b3VjaHN0YXJ0ID0gb25Ub3VjaEJlZ2FuO1xyXG4gICAgICBjYW52YXMub250b3VjaG1vdmUgPSBvblRvdWNoTW92ZWQ7XHJcbiAgICAgIGNhbnZhcy5vbnRvdWNoZW5kID0gb25Ub3VjaEVuZGVkO1xyXG4gICAgICBjYW52YXMub250b3VjaGNhbmNlbCA9IG9uVG91Y2hDYW5jZWw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyDms6jlhozpvKDmoIfkuovku7blm57osIPlh73mlbBcclxuICAgICAgY2FudmFzLm9ubW91c2Vkb3duID0gb25DbGlja0JlZ2FuO1xyXG4gICAgICBjYW52YXMub25tb3VzZW1vdmUgPSBvbk1vdXNlTW92ZWQ7XHJcbiAgICAgIGNhbnZhcy5vbm1vdXNldXAgPSBvbkNsaWNrRW5kZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yid5aeL5YyWQXBwVmlld1xyXG4gICAgdGhpcy5fdmlldy5pbml0aWFsaXplKCk7XHJcblxyXG4gICAgLy8g5Yid5aeL5YyWQ3ViaXNtIFNES1xyXG4gICAgdGhpcy5pbml0aWFsaXplQ3ViaXNtKCk7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDosIPmlbTnlLvluIPlpKflsI/lubbph43mlrDliJ3lp4vljJbop4blm77jgIJcclxuICAgKi9cclxuICBwdWJsaWMgb25SZXNpemUoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9yZXNpemVDYW52YXMoKTtcclxuICAgIHRoaXMuX3ZpZXcuaW5pdGlhbGl6ZSgpO1xyXG4gICAgdGhpcy5fdmlldy5pbml0aWFsaXplU3ByaXRlKCk7XHJcblxyXG4gICAgLy8g5Lyg6YCS55S75biD5aSn5bCPXHJcbiAgICBjb25zdCB2aWV3cG9ydDogbnVtYmVyW10gPSBbMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0XTtcclxuXHJcbiAgICBnbC52aWV3cG9ydCh2aWV3cG9ydFswXSwgdmlld3BvcnRbMV0sIHZpZXdwb3J0WzJdLCB2aWV3cG9ydFszXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDph4rmlL7otYTmupDjgIJcclxuICAgKi9cclxuICBwdWJsaWMgcmVsZWFzZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX3RleHR1cmVNYW5hZ2VyLnJlbGVhc2UoKTtcclxuICAgIHRoaXMuX3RleHR1cmVNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLl92aWV3LnJlbGVhc2UoKTtcclxuICAgIHRoaXMuX3ZpZXcgPSBudWxsO1xyXG5cclxuICAgIC8vIOmHiuaUvui1hOa6kFxyXG4gICAgTEFwcExpdmUyRE1hbmFnZXIucmVsZWFzZUluc3RhbmNlKCk7XHJcblxyXG4gICAgLy8g6YeK5pS+Q3ViaXNtIFNES1xyXG4gICAgQ3ViaXNtRnJhbWV3b3JrLmRpc3Bvc2UoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOi/kOihjOW6lOeUqOeoi+W6j+OAglxyXG4gICAqL1xyXG4gIHB1YmxpYyBydW4oKTogdm9pZCB7XHJcbiAgICAvLyDkuLvlvqrnjq9cclxuICAgIGNvbnN0IGxvb3AgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgIC8vIOajgOafpeWunuS+i+aYr+WQpuWtmOWcqFxyXG4gICAgICBpZiAoc19pbnN0YW5jZSA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyDmm7TmlrDml7bpl7RcclxuICAgICAgTEFwcFBhbC51cGRhdGVUaW1lKCk7XHJcblxyXG4gICAgICAvLyDliJ3lp4vljJblsY/luZVcclxuICAgICAgZ2wuY2xlYXJDb2xvcigwLjAsIDAuMCwgMC4wLCAxLjApO1xyXG5cclxuICAgICAgLy8g5ZCv55So5rex5bqm5rWL6K+VXHJcbiAgICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcclxuXHJcbiAgICAgIC8vIOmBruaMoei/keWkhOeahOWvueixoVxyXG4gICAgICBnbC5kZXB0aEZ1bmMoZ2wuTEVRVUFMKTtcclxuXHJcbiAgICAgIC8vIOa4hemZpOminOiJsue8k+WGsuWMuuWSjOa3seW6pue8k+WGsuWMulxyXG4gICAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XHJcblxyXG4gICAgICBnbC5jbGVhckRlcHRoKDEuMCk7XHJcblxyXG4gICAgICAvLyDlkK/nlKjmt7flkIhcclxuICAgICAgZ2wuZW5hYmxlKGdsLkJMRU5EKTtcclxuICAgICAgZ2wuYmxlbmRGdW5jKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XHJcblxyXG4gICAgICAvLyDmuLLmn5Pmm7TmlrBcclxuICAgICAgdGhpcy5fdmlldy5yZW5kZXIoKTtcclxuXHJcbiAgICAgIC8vIOmAkuW9kuiwg+eUqOS7pei/m+ihjOW+queOr1xyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcbiAgICB9O1xyXG4gICAgbG9vcCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5Yib5bu6552A6Imy5Zmo44CCXHJcbiAgICovXHJcbiAgcHVibGljIGNyZWF0ZVNoYWRlcigpOiBXZWJHTFByb2dyYW0ge1xyXG4gICAgLy8g57yW6K+R6aG254K5552A6Imy5ZmoXHJcbiAgICBjb25zdCB2ZXJ0ZXhTaGFkZXJJZCA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcclxuXHJcbiAgICBpZiAodmVydGV4U2hhZGVySWQgPT0gbnVsbCkge1xyXG4gICAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgn5peg5rOV5Yib5bu66aG254K5552A6Imy5ZmoJyk7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZlcnRleFNoYWRlcjogc3RyaW5nID1cclxuICAgICAgJ3ByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OycgK1xyXG4gICAgICAnYXR0cmlidXRlIHZlYzMgcG9zaXRpb247JyArXHJcbiAgICAgICdhdHRyaWJ1dGUgdmVjMiB1djsnICtcclxuICAgICAgJ3ZhcnlpbmcgdmVjMiB2dXY7JyArXHJcbiAgICAgICd2b2lkIG1haW4odm9pZCknICtcclxuICAgICAgJ3snICtcclxuICAgICAgJyAgIGdsX1Bvc2l0aW9uID0gdmVjNChwb3NpdGlvbiwgMS4wKTsnICtcclxuICAgICAgJyAgIHZ1diA9IHV2OycgK1xyXG4gICAgICAnfSc7XHJcblxyXG4gICAgZ2wuc2hhZGVyU291cmNlKHZlcnRleFNoYWRlcklkLCB2ZXJ0ZXhTaGFkZXIpO1xyXG4gICAgZ2wuY29tcGlsZVNoYWRlcih2ZXJ0ZXhTaGFkZXJJZCk7XHJcblxyXG4gICAgLy8g57yW6K+R54mH5q61552A6Imy5ZmoXHJcbiAgICBjb25zdCBmcmFnbWVudFNoYWRlcklkID0gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XHJcblxyXG4gICAgaWYgKGZyYWdtZW50U2hhZGVySWQgPT0gbnVsbCkge1xyXG4gICAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgn5peg5rOV5Yib5bu654mH5q61552A6Imy5ZmoJyk7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZyYWdtZW50U2hhZGVyOiBzdHJpbmcgPVxyXG4gICAgICAncHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7JyArXHJcbiAgICAgICd2YXJ5aW5nIHZlYzIgdnV2OycgK1xyXG4gICAgICAndW5pZm9ybSBzYW1wbGVyMkQgdGV4dHVyZTsnICtcclxuICAgICAgJ3ZvaWQgbWFpbih2b2lkKScgK1xyXG4gICAgICAneycgK1xyXG4gICAgICAnICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHRleHR1cmUsIHZ1dik7JyArXHJcbiAgICAgICd9JztcclxuXHJcbiAgICBnbC5zaGFkZXJTb3VyY2UoZnJhZ21lbnRTaGFkZXJJZCwgZnJhZ21lbnRTaGFkZXIpO1xyXG4gICAgZ2wuY29tcGlsZVNoYWRlcihmcmFnbWVudFNoYWRlcklkKTtcclxuXHJcbiAgICAvLyDliJvlu7rnqIvluo/lr7nosaFcclxuICAgIGNvbnN0IHByb2dyYW1JZCA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcclxuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtSWQsIHZlcnRleFNoYWRlcklkKTtcclxuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtSWQsIGZyYWdtZW50U2hhZGVySWQpO1xyXG5cclxuICAgIGdsLmRlbGV0ZVNoYWRlcih2ZXJ0ZXhTaGFkZXJJZCk7XHJcbiAgICBnbC5kZWxldGVTaGFkZXIoZnJhZ21lbnRTaGFkZXJJZCk7XHJcblxyXG4gICAgLy8g6ZO+5o6lXHJcbiAgICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtSWQpO1xyXG5cclxuICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbUlkKTtcclxuXHJcbiAgICByZXR1cm4gcHJvZ3JhbUlkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+WVmlld+S/oeaBr+OAglxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRWaWV3KCk6IExBcHBWaWV3IHtcclxuICAgIHJldHVybiB0aGlzLl92aWV3O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFRleHR1cmVNYW5hZ2VyKCk6IExBcHBUZXh0dXJlTWFuYWdlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fdGV4dHVyZU1hbmFnZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmnoTpgKDlh73mlbBcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX2NhcHR1cmVkID0gZmFsc2U7XHJcbiAgICB0aGlzLl9tb3VzZVggPSAwLjA7XHJcbiAgICB0aGlzLl9tb3VzZVkgPSAwLjA7XHJcbiAgICB0aGlzLl9pc0VuZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX2N1YmlzbU9wdGlvbiA9IG5ldyBPcHRpb24oKTtcclxuICAgIHRoaXMuX3ZpZXcgPSBuZXcgTEFwcFZpZXcoKTtcclxuICAgIHRoaXMuX3RleHR1cmVNYW5hZ2VyID0gbmV3IExBcHBUZXh0dXJlTWFuYWdlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5Yid5aeL5YyWQ3ViaXNtIFNES1xyXG4gICAqL1xyXG4gIHB1YmxpYyBpbml0aWFsaXplQ3ViaXNtKCk6IHZvaWQge1xyXG4gICAgLy8g6K6+572uQ3ViaXNtXHJcbiAgICB0aGlzLl9jdWJpc21PcHRpb24ubG9nRnVuY3Rpb24gPSBMQXBwUGFsLnByaW50TWVzc2FnZTtcclxuICAgIHRoaXMuX2N1YmlzbU9wdGlvbi5sb2dnaW5nTGV2ZWwgPSBMQXBwRGVmaW5lLkN1YmlzbUxvZ2dpbmdMZXZlbDtcclxuICAgIEN1YmlzbUZyYW1ld29yay5zdGFydFVwKHRoaXMuX2N1YmlzbU9wdGlvbik7XHJcblxyXG4gICAgLy8g5Yid5aeL5YyWQ3ViaXNtXHJcbiAgICBDdWJpc21GcmFtZXdvcmsuaW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgIC8vIOWKoOi9veaooeWei1xyXG4gICAgTEFwcExpdmUyRE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICBMQXBwUGFsLnVwZGF0ZVRpbWUoKTtcclxuXHJcbiAgICB0aGlzLl92aWV3LmluaXRpYWxpemVTcHJpdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiwg+aVtOeUu+W4g+Wkp+Wwj+S7peWhq+a7oeWxj+W5leOAglxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3Jlc2l6ZUNhbnZhcygpOiB2b2lkIHtcclxuICAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICB9XHJcblxyXG4gIF9jdWJpc21PcHRpb246IE9wdGlvbjsgLy8gQ3ViaXNtIFNESyDpgInpoblcclxuICBfdmlldzogTEFwcFZpZXc7IC8vIOinhuWbvuS/oeaBr1xyXG4gIF9jYXB0dXJlZDogYm9vbGVhbjsgLy8g5piv5ZCm54K55Ye7XHJcbiAgX21vdXNlWDogbnVtYmVyOyAvLyDpvKDmoIdY5Z2Q5qCHXHJcbiAgX21vdXNlWTogbnVtYmVyOyAvLyDpvKDmoIdZ5Z2Q5qCHXHJcbiAgX2lzRW5kOiBib29sZWFuOyAvLyDmmK/lkKbnu5PmnZ9BUFBcclxuICBfdGV4dHVyZU1hbmFnZXI6IExBcHBUZXh0dXJlTWFuYWdlcjsgLy8g57q555CG566h55CG5ZmoXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlvZPngrnlh7vml7bosIPnlKjjgIJcclxuICovXHJcbmZ1bmN0aW9uIG9uQ2xpY2tCZWdhbihlOiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xyXG4gICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoJ+acquaJvuWIsOinhuWbvicpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fY2FwdHVyZWQgPSB0cnVlO1xyXG5cclxuICBjb25zdCBwb3NYOiBudW1iZXIgPSBlLnBhZ2VYO1xyXG4gIGNvbnN0IHBvc1k6IG51bWJlciA9IGUucGFnZVk7XHJcblxyXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3Lm9uVG91Y2hlc0JlZ2FuKHBvc1gsIHBvc1kpO1xyXG59XHJcblxyXG4vKipcclxuICog5b2T6byg5qCH5oyH6ZKI56e75Yqo5pe26LCD55So44CCXHJcbiAqL1xyXG5mdW5jdGlvbiBvbk1vdXNlTW92ZWQoZTogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX2NhcHR1cmVkKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBpZiAoIUxBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3KSB7XHJcbiAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgn5pyq5om+5Yiw6KeG5Zu+Jyk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWN0ID0gKGUudGFyZ2V0IGFzIEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gIGNvbnN0IHBvc1g6IG51bWJlciA9IGUuY2xpZW50WCAtIHJlY3QubGVmdDtcclxuICBjb25zdCBwb3NZOiBudW1iZXIgPSBlLmNsaWVudFkgLSByZWN0LnRvcDtcclxuXHJcbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcub25Ub3VjaGVzTW92ZWQocG9zWCwgcG9zWSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlvZPngrnlh7vnu5PmnZ/ml7bosIPnlKjjgIJcclxuICovXHJcbmZ1bmN0aW9uIG9uQ2xpY2tFbmRlZChlOiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX2NhcHR1cmVkID0gZmFsc2U7XHJcbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xyXG4gICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoJ+acquaJvuWIsOinhuWbvicpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVjdCA9IChlLnRhcmdldCBhcyBFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICBjb25zdCBwb3NYOiBudW1iZXIgPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7XHJcbiAgY29uc3QgcG9zWTogbnVtYmVyID0gZS5jbGllbnRZIC0gcmVjdC50b3A7XHJcblxyXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3Lm9uVG91Y2hlc0VuZGVkKHBvc1gsIHBvc1kpO1xyXG59XHJcblxyXG4vKipcclxuICog5b2T6Kem5pG45pe26LCD55So44CCXHJcbiAqL1xyXG5mdW5jdGlvbiBvblRvdWNoQmVnYW4oZTogVG91Y2hFdmVudCk6IHZvaWQge1xyXG4gIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcpIHtcclxuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCfmnKrmib7liLDop4blm74nKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl9jYXB0dXJlZCA9IHRydWU7XHJcblxyXG4gIGNvbnN0IHBvc1ggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYO1xyXG4gIGNvbnN0IHBvc1kgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xyXG5cclxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldy5vblRvdWNoZXNCZWdhbihwb3NYLCBwb3NZKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOW9k+a7keWKqOaXtuiwg+eUqOOAglxyXG4gKi9cclxuZnVuY3Rpb24gb25Ub3VjaE1vdmVkKGU6IFRvdWNoRXZlbnQpOiB2b2lkIHtcclxuICBpZiAoIUxBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl9jYXB0dXJlZCkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xyXG4gICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoJ+acquaJvuWIsOinhuWbvicpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVjdCA9IChlLnRhcmdldCBhcyBFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgY29uc3QgcG9zWCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCAtIHJlY3QubGVmdDtcclxuICBjb25zdCBwb3NZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZIC0gcmVjdC50b3A7XHJcblxyXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3Lm9uVG91Y2hlc01vdmVkKHBvc1gsIHBvc1kpO1xyXG59XHJcblxyXG4vKipcclxuICog5b2T6Kem5pG457uT5p2f5pe26LCD55So44CCXHJcbiAqL1xyXG5mdW5jdGlvbiBvblRvdWNoRW5kZWQoZTogVG91Y2hFdmVudCk6IHZvaWQge1xyXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl9jYXB0dXJlZCA9IGZhbHNlO1xyXG5cclxuICBpZiAoIUxBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3KSB7XHJcbiAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgn5pyq5om+5Yiw6KeG5Zu+Jyk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWN0ID0gKGUudGFyZ2V0IGFzIEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICBjb25zdCBwb3NYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xyXG4gIGNvbnN0IHBvc1kgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkgLSByZWN0LnRvcDtcclxuXHJcbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcub25Ub3VjaGVzRW5kZWQocG9zWCwgcG9zWSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlvZPop6bmkbjooqvlj5bmtojml7bosIPnlKjjgIJcclxuICovXHJcbmZ1bmN0aW9uIG9uVG91Y2hDYW5jZWwoZTogVG91Y2hFdmVudCk6IHZvaWQge1xyXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl9jYXB0dXJlZCA9IGZhbHNlO1xyXG5cclxuICBpZiAoIUxBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3KSB7XHJcbiAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgn5pyq5om+5Yiw6KeG5Zu+Jyk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWN0ID0gKGUudGFyZ2V0IGFzIEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICBjb25zdCBwb3NYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xyXG4gIGNvbnN0IHBvc1kgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkgLSByZWN0LnRvcDtcclxuXHJcbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcub25Ub3VjaGVzRW5kZWQocG9zWCwgcG9zWSk7XHJcbn1cclxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBcImEwNzlkYWIxNGEyMmNlMjJiZGYzXCI7IH0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=