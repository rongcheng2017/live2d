"use strict";
self["webpackHotUpdate"]("main",{

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
/******/ 	__webpack_require__.h = function() { return "4339a1cb3d4cc638a201"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi42ZTFhYzQ1MDg3OTkyNDA5YzcwMS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQU9BO0lBSUU7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsR0FBRyxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUFFTSxpQ0FBVSxHQUFqQjtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRU0saUNBQVUsR0FBakI7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVNLGdDQUFTLEdBQWhCO1FBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFTSxnQ0FBUyxHQUFoQjtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRU0sZ0NBQVMsR0FBaEI7UUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FB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Q0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsT0FBTyxDQUNMLElBQUksR0FBRyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQzNFLENBQUM7SUFDSixDQUFDO0lBZ0JILG1CQUFDO0FBQUQsQ0FBQztBQWxMWSxvQ0FBWTs7Ozs7Ozs7O1VDUHpCLHFDQUFxQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy90b3VjaG1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog54mI5p2DKGMpIExpdmUyRCBJbmMuIOS/neeVmeaJgOacieadg+WIqeOAglxyXG4gKlxyXG4gKiDkvb/nlKjmnKzmupDku6PnoIHlj5dMaXZlMkTlvIDmlL7ova/ku7borrjlj6/or4HnmoTnuqbmnZ/vvIxcclxuICog6K+l6K645Y+v6K+B5Y+v5ZyoaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWzmib7liLDjgIJcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgVG91Y2hNYW5hZ2VyIHtcclxuICAvKipcclxuICAgKiDmnoTpgKDlh73mlbBcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX3N0YXJ0WCA9IDAuMDtcclxuICAgIHRoaXMuX3N0YXJ0WSA9IDAuMDtcclxuICAgIHRoaXMuX2xhc3RYID0gMC4wO1xyXG4gICAgdGhpcy5fbGFzdFkgPSAwLjA7XHJcbiAgICB0aGlzLl9sYXN0WDEgPSAwLjA7XHJcbiAgICB0aGlzLl9sYXN0WTEgPSAwLjA7XHJcbiAgICB0aGlzLl9sYXN0WDIgPSAwLjA7XHJcbiAgICB0aGlzLl9sYXN0WTIgPSAwLjA7XHJcbiAgICB0aGlzLl9sYXN0VG91Y2hEaXN0YW5jZSA9IDAuMDtcclxuICAgIHRoaXMuX2RlbHRhWCA9IDAuMDtcclxuICAgIHRoaXMuX2RlbHRhWSA9IDAuMDtcclxuICAgIHRoaXMuX3NjYWxlID0gMS4wO1xyXG4gICAgdGhpcy5fdG91Y2hTaW5nbGUgPSBmYWxzZTtcclxuICAgIHRoaXMuX2ZsaXBBdmFpbGFibGUgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDZW50ZXJYKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGFzdFg7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0Q2VudGVyWSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xhc3RZO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldERlbHRhWCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RlbHRhWDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXREZWx0YVkoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9kZWx0YVk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0U3RhcnRYKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RhcnRYO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFN0YXJ0WSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0YXJ0WTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTY2FsZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NjYWxlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9sYXN0WDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRZKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGFzdFk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0WDEoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9sYXN0WDE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0WTEoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9sYXN0WTE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0WDIoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9sYXN0WDI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0WTIoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9sYXN0WTI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNTaW5nbGVUb3VjaCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl90b3VjaFNpbmdsZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc0ZsaWNrQXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZsaXBBdmFpbGFibGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzYWJsZUZsaWNrKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fZmxpcEF2YWlsYWJsZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6Kem5pG45byA5aeL5LqL5Lu2XHJcbiAgICogQHBhcmFtIGRldmljZVgg6Kem5pG45bGP5bmV5pe255qEeOWdkOagh1xyXG4gICAqIEBwYXJhbSBkZXZpY2VZIOinpuaRuOWxj+W5leaXtueahHnlnZDmoIdcclxuICAgKi9cclxuICBwdWJsaWMgdG91Y2hlc0JlZ2FuKGRldmljZVg6IG51bWJlciwgZGV2aWNlWTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLl9sYXN0WCA9IGRldmljZVg7XHJcbiAgICB0aGlzLl9sYXN0WSA9IGRldmljZVk7XHJcbiAgICB0aGlzLl9zdGFydFggPSBkZXZpY2VYO1xyXG4gICAgdGhpcy5fc3RhcnRZID0gZGV2aWNlWTtcclxuICAgIHRoaXMuX2xhc3RUb3VjaERpc3RhbmNlID0gLTEuMDtcclxuICAgIHRoaXMuX2ZsaXBBdmFpbGFibGUgPSB0cnVlO1xyXG4gICAgdGhpcy5fdG91Y2hTaW5nbGUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5ouW5Yqo5LqL5Lu2XHJcbiAgICogQHBhcmFtIGRldmljZVgg6Kem5pG45bGP5bmV5pe255qEeOWdkOagh1xyXG4gICAqIEBwYXJhbSBkZXZpY2VZIOinpuaRuOWxj+W5leaXtueahHnlnZDmoIdcclxuICAgKi9cclxuICBwdWJsaWMgdG91Y2hlc01vdmVkKGRldmljZVg6IG51bWJlciwgZGV2aWNlWTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLl9sYXN0WCA9IGRldmljZVg7XHJcbiAgICB0aGlzLl9sYXN0WSA9IGRldmljZVk7XHJcbiAgICB0aGlzLl9sYXN0VG91Y2hEaXN0YW5jZSA9IC0xLjA7XHJcbiAgICB0aGlzLl90b3VjaFNpbmdsZSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDorqHnrpfmu5Hliqjot53nprtcclxuICAgKiBAcmV0dXJuIOa7keWKqOi3neemu1xyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRGbGlja0Rpc3RhbmNlKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGVEaXN0YW5jZShcclxuICAgICAgdGhpcy5fc3RhcnRYLFxyXG4gICAgICB0aGlzLl9zdGFydFksXHJcbiAgICAgIHRoaXMuX2xhc3RYLFxyXG4gICAgICB0aGlzLl9sYXN0WVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOiuoeeul+S7jueCuTHliLDngrky55qE6Led56a7XHJcbiAgICpcclxuICAgKiBAcGFyYW0geDEg56ys5LiA5Liq6Kem5pG45bGP5bmV55qEeOWdkOagh1xyXG4gICAqIEBwYXJhbSB5MSDnrKzkuIDkuKrop6bmkbjlsY/luZXnmoR55Z2Q5qCHXHJcbiAgICogQHBhcmFtIHgyIOesrOS6jOS4quinpuaRuOWxj+W5leeahHjlnZDmoIdcclxuICAgKiBAcGFyYW0geTIg56ys5LqM5Liq6Kem5pG45bGP5bmV55qEeeWdkOagh1xyXG4gICAqL1xyXG4gIHB1YmxpYyBjYWxjdWxhdGVEaXN0YW5jZShcclxuICAgIHgxOiBudW1iZXIsXHJcbiAgICB5MTogbnVtYmVyLFxyXG4gICAgeDI6IG51bWJlcixcclxuICAgIHkyOiBudW1iZXJcclxuICApOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCgoeDEgLSB4MikgKiAoeDEgLSB4MikgKyAoeTEgLSB5MikgKiAoeTEgLSB5MikpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5LuO5YC8MeWIsOWAvDLorqHnrpfnp7vliqjph4/jgIJcclxuICAgKiDlpoLmnpzmlrnlkJHkuI3lkIzvvIzliJnnp7vliqjph4/kuLow44CC5aaC5p6c5pa55ZCR55u45ZCM77yM5YiZ5Y+C6ICD57ud5a+55YC86L6D5bCP55qE5YC844CCXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdjEg56ys5LiA5Liq56e75Yqo6YePXHJcbiAgICogQHBhcmFtIHYyIOesrOS6jOS4quenu+WKqOmHj1xyXG4gICAqXHJcbiAgICogQHJldHVybiDovoPlsI/nmoTnp7vliqjph49cclxuICAgKi9cclxuICBwdWJsaWMgY2FsY3VsYXRlTW92aW5nQW1vdW50KHYxOiBudW1iZXIsIHYyOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgaWYgKHYxID4gMC4wICE9IHYyID4gMC4wKSB7XHJcbiAgICAgIHJldHVybiAwLjA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2lnbjogbnVtYmVyID0gdjEgPiAwLjAgPyAxLjAgOiAtMS4wO1xyXG4gICAgY29uc3QgYWJzb2x1dGVWYWx1ZTEgPSBNYXRoLmFicyh2MSk7XHJcbiAgICBjb25zdCBhYnNvbHV0ZVZhbHVlMiA9IE1hdGguYWJzKHYyKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHNpZ24gKiAoYWJzb2x1dGVWYWx1ZTEgPCBhYnNvbHV0ZVZhbHVlMiA/IGFic29sdXRlVmFsdWUxIDogYWJzb2x1dGVWYWx1ZTIpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgX3N0YXJ0WTogbnVtYmVyOyAvLyDop6bmkbjlvIDlp4vml7bnmoR45Z2Q5qCHXHJcbiAgX3N0YXJ0WDogbnVtYmVyOyAvLyDop6bmkbjlvIDlp4vml7bnmoR55Z2Q5qCHXHJcbiAgX2xhc3RYOiBudW1iZXI7IC8vIOWNleeCueinpuaRuOaXtueahHjlnZDmoIdcclxuICBfbGFzdFk6IG51bWJlcjsgLy8g5Y2V54K56Kem5pG45pe255qEeeWdkOagh1xyXG4gIF9sYXN0WDE6IG51bWJlcjsgLy8g5Y+M54K56Kem5pG45pe255qE56ys5LiA5LiqeOWdkOagh1xyXG4gIF9sYXN0WTE6IG51bWJlcjsgLy8g5Y+M54K56Kem5pG45pe255qE56ys5LiA5LiqeeWdkOagh1xyXG4gIF9sYXN0WDI6IG51bWJlcjsgLy8g5Y+M54K56Kem5pG45pe255qE56ys5LqM5LiqeOWdkOagh1xyXG4gIF9sYXN0WTI6IG51bWJlcjsgLy8g5Y+M54K56Kem5pG45pe255qE56ys5LqM5LiqeeWdkOagh1xyXG4gIF9sYXN0VG91Y2hEaXN0YW5jZTogbnVtYmVyOyAvLyDkuKTkuKrmiJbku6XkuIrop6bmkbjml7bnmoTmiYvmjIfot53nprtcclxuICBfZGVsdGFYOiBudW1iZXI7IC8vIOS7juS4iuasoeWAvOWIsOacrOasoeWAvOeahHjnp7vliqjot53nprvjgIJcclxuICBfZGVsdGFZOiBudW1iZXI7IC8vIOS7juS4iuasoeWAvOWIsOacrOasoeWAvOeahHnnp7vliqjot53nprvjgIJcclxuICBfc2NhbGU6IG51bWJlcjsgLy8g5pys5bin6KaB5bqU55So55qE57yp5pS+5q+U5L6L44CC5Zyo57yp5pS+5pON5L2c5Lit5Lul5aSW55qE5oOF5Ya15LiL5Li6MeOAglxyXG4gIF90b3VjaFNpbmdsZTogYm9vbGVhbjsgLy8g5Y2V54K56Kem5pG45pe25Li6dHJ1ZVxyXG4gIF9mbGlwQXZhaWxhYmxlOiBib29sZWFuOyAvLyDmmK/lkKblhYHorrjnv7vovaxcclxufVxyXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIFwiNDMzOWExY2IzZDRjYzYzOGEyMDFcIjsgfSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==