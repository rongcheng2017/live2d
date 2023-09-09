"use strict";
self["webpackHotUpdate"]("main",{

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


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "ab52f34a174e16c022a5"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU07U0FDUDtJQUNILENBQUM7SUFRTSxxREFBd0IsR0FBL0IsVUFBZ0MsUUFBZ0I7UUFDOUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakQsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFFO2dCQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixNQUFNO2FBQ1A7U0FDRjtJQUNILENBQUM7SUFHSCx5QkFBQztBQUFELENBQUM7QUFySlksZ0RBQWtCO0FBMEovQjtJQUFBO1FBRUUsT0FBRSxHQUFpQixJQUFJLENBQUM7UUFDeEIsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLFdBQU0sR0FBRyxDQUFDLENBQUM7SUFHYixDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDO0FBUFksa0NBQVc7Ozs7Ozs7OztVQ3pLeEIscUNBQXFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2xhcHB0ZXh0dXJlbWFuYWdlci50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDniYjmnYMoYykgTGl2ZTJEIEluYy4g5L+d55WZ5omA5pyJ5p2D5Yip44CCXHJcbiAqXHJcbiAqIOS9v+eUqOacrOa6kOS7o+eggeWPl0xpdmUyROW8gOaUvui9r+S7tuiuuOWPr+ivgeeahOe6puadn++8jFxyXG4gKiDor6Xorrjlj6/or4Hlj6/lnKhodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbOaJvuWIsOOAglxyXG4gKi9cclxuXHJcbmltcG9ydCB7IGNzbVZlY3RvciwgaXRlcmF0b3IgfSBmcm9tICdAZnJhbWV3b3JrL3R5cGUvY3NtdmVjdG9yJztcclxuXHJcbmltcG9ydCB7IGdsIH0gZnJvbSAnLi9sYXBwZGVsZWdhdGUnO1xyXG5cclxuLyoqXHJcbiAqIOe6ueeQhueuoeeQhuexu1xyXG4gKiDnlKjkuo7liqDovb3lkoznrqHnkIblm77lg4/nmoTnsbvjgIJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBMQXBwVGV4dHVyZU1hbmFnZXIge1xyXG4gIC8qKlxyXG4gICAqIOaehOmAoOWHveaVsFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5fdGV4dHVyZXMgPSBuZXcgY3NtVmVjdG9yPFRleHR1cmVJbmZvPigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6YeK5pS+6LWE5rqQ44CCXHJcbiAgICovXHJcbiAgcHVibGljIHJlbGVhc2UoKTogdm9pZCB7XHJcbiAgICBmb3IgKFxyXG4gICAgICBsZXQgaXRlOiBpdGVyYXRvcjxUZXh0dXJlSW5mbz4gPSB0aGlzLl90ZXh0dXJlcy5iZWdpbigpO1xyXG4gICAgICBpdGUubm90RXF1YWwodGhpcy5fdGV4dHVyZXMuZW5kKCkpO1xyXG4gICAgICBpdGUucHJlSW5jcmVtZW50KClcclxuICAgICkge1xyXG4gICAgICBnbC5kZWxldGVUZXh0dXJlKGl0ZS5wdHIoKS5pZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl90ZXh0dXJlcyA9IG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDku45QTkfmlofku7bliJvlu7rnurnnkIZcclxuICAgKlxyXG4gICAqIEBwYXJhbSBmaWxlTmFtZSDopoHliqDovb3nmoTlm77lg4/mlofku7bot6/lvoTlkI1cclxuICAgKiBAcGFyYW0gdXNlUHJlbXVsdGlwbHkg5piv5ZCm5ZCv55SoUHJlbXVsdOWkhOeQhlxyXG4gICAqIEByZXR1cm4g5Zu+5YOP5L+h5oGv77yM5Yqg6L295aSx6LSl5pe26L+U5ZuebnVsbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBjcmVhdGVUZXh0dXJlRnJvbVBuZ0ZpbGUoXHJcbiAgICBmaWxlTmFtZTogc3RyaW5nLFxyXG4gICAgdXNlUHJlbXVsdGlwbHk6IGJvb2xlYW4sXHJcbiAgICBjYWxsYmFjazogKHRleHR1cmVJbmZvOiBUZXh0dXJlSW5mbykgPT4gdm9pZFxyXG4gICk6IHZvaWQge1xyXG4gICAgLy8g5p+l5om+5bey5Yqg6L2955qE57q555CGXHJcbiAgICBmb3IgKFxyXG4gICAgICBsZXQgaXRlOiBpdGVyYXRvcjxUZXh0dXJlSW5mbz4gPSB0aGlzLl90ZXh0dXJlcy5iZWdpbigpO1xyXG4gICAgICBpdGUubm90RXF1YWwodGhpcy5fdGV4dHVyZXMuZW5kKCkpO1xyXG4gICAgICBpdGUucHJlSW5jcmVtZW50KClcclxuICAgICkge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgaXRlLnB0cigpLmZpbGVOYW1lID09IGZpbGVOYW1lICYmXHJcbiAgICAgICAgaXRlLnB0cigpLnVzZVByZW11bHRwbHkgPT0gdXNlUHJlbXVsdGlwbHlcclxuICAgICAgKSB7XHJcbiAgICAgICAgLy8g56ys5LqM5qyh5Lul5ZCO5Lya5L2/55So57yT5a2Y77yI5peg562J5b6F5pe26Ze077yJXHJcbiAgICAgICAgLy8g5ZyoV2ViS2l05Lit77yM6KaB5YaN5qyh6LCD55So55u45ZCM5Zu+5YOP55qEb25sb2Fk77yM6ZyA6KaB6YeN5paw5a6e5L6L5YyWXHJcbiAgICAgICAgLy8g6K+m57uG5L+h5oGv77yaaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzUwMjQxODFcclxuICAgICAgICBpdGUucHRyKCkuaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaXRlLnB0cigpLmltZy5vbmxvYWQgPSAoKTogdm9pZCA9PiBjYWxsYmFjayhpdGUucHRyKCkpO1xyXG4gICAgICAgIGl0ZS5wdHIoKS5pbWcuc3JjID0gZmlsZU5hbWU7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6Kem5Y+R5pWw5o2u5Yqg6L29XHJcbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGltZy5vbmxvYWQgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgIC8vIOWIm+W7uue6ueeQhuWvueixoVxyXG4gICAgICBjb25zdCB0ZXg6IFdlYkdMVGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcclxuXHJcbiAgICAgIC8vIOmAieaLqee6ueeQhlxyXG4gICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXgpO1xyXG5cclxuICAgICAgLy8g6K6+572u57q555CG5Y+C5pWwXHJcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoXHJcbiAgICAgICAgZ2wuVEVYVFVSRV8yRCxcclxuICAgICAgICBnbC5URVhUVVJFX01JTl9GSUxURVIsXHJcbiAgICAgICAgZ2wuTElORUFSX01JUE1BUF9MSU5FQVJcclxuICAgICAgKTtcclxuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLkxJTkVBUik7XHJcblxyXG4gICAgICAvLyDmiafooYxQcmVtdWx05aSE55CGXHJcbiAgICAgIGlmICh1c2VQcmVtdWx0aXBseSkge1xyXG4gICAgICAgIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTCwgMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIOWGmeWFpee6ueeQhuWDj+e0oFxyXG4gICAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIGltZyk7XHJcblxyXG4gICAgICAvLyDnlJ/miJBNaXBtYXBcclxuICAgICAgZ2wuZ2VuZXJhdGVNaXBtYXAoZ2wuVEVYVFVSRV8yRCk7XHJcblxyXG4gICAgICAvLyDop6Pnu5HnurnnkIZcclxuICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XHJcblxyXG4gICAgICBjb25zdCB0ZXh0dXJlSW5mbzogVGV4dHVyZUluZm8gPSBuZXcgVGV4dHVyZUluZm8oKTtcclxuICAgICAgaWYgKHRleHR1cmVJbmZvICE9IG51bGwpIHtcclxuICAgICAgICB0ZXh0dXJlSW5mby5maWxlTmFtZSA9IGZpbGVOYW1lO1xyXG4gICAgICAgIHRleHR1cmVJbmZvLndpZHRoID0gaW1nLndpZHRoO1xyXG4gICAgICAgIHRleHR1cmVJbmZvLmhlaWdodCA9IGltZy5oZWlnaHQ7XHJcbiAgICAgICAgdGV4dHVyZUluZm8uaWQgPSB0ZXg7XHJcbiAgICAgICAgdGV4dHVyZUluZm8uaW1nID0gaW1nO1xyXG4gICAgICAgIHRleHR1cmVJbmZvLnVzZVByZW11bHRwbHkgPSB1c2VQcmVtdWx0aXBseTtcclxuICAgICAgICB0aGlzLl90ZXh0dXJlcy5wdXNoQmFjayh0ZXh0dXJlSW5mbyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNhbGxiYWNrKHRleHR1cmVJbmZvKTtcclxuICAgIH07XHJcbiAgICBpbWcuc3JjID0gZmlsZU5hbWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDph4rmlL7nurnnkIZcclxuICAgKlxyXG4gICAqIOmHiuaUvuaVsOe7hOS4reeahOaJgOaciee6ueeQhuOAglxyXG4gICAqL1xyXG4gIHB1YmxpYyByZWxlYXNlVGV4dHVyZXMoKTogdm9pZCB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3RleHR1cmVzLmdldFNpemUoKTsgaSsrKSB7XHJcbiAgICAgIHRoaXMuX3RleHR1cmVzLnNldChpLCBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl90ZXh0dXJlcy5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6YeK5pS+57q555CGXHJcbiAgICpcclxuICAgKiDph4rmlL7mjIflrprnmoTnurnnkIblm77lg4/jgIJcclxuICAgKiBAcGFyYW0gdGV4dHVyZSDopoHph4rmlL7nmoTnurnnkIZcclxuICAgKi9cclxuICBwdWJsaWMgcmVsZWFzZVRleHR1cmVCeVRleHR1cmUodGV4dHVyZTogV2ViR0xUZXh0dXJlKTogdm9pZCB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3RleHR1cmVzLmdldFNpemUoKTsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLl90ZXh0dXJlcy5hdChpKS5pZCAhPSB0ZXh0dXJlKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX3RleHR1cmVzLnNldChpLCBudWxsKTtcclxuICAgICAgdGhpcy5fdGV4dHVyZXMucmVtb3ZlKGkpO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOmHiuaUvue6ueeQhlxyXG4gICAqXHJcbiAgICog6YeK5pS+5oyH5a6a5ZCN56ew55qE57q555CG5Zu+5YOP44CCXHJcbiAgICogQHBhcmFtIGZpbGVOYW1lIOimgemHiuaUvueahOWbvuWDj+aWh+S7tui3r+W+hOWQjVxyXG4gICAqL1xyXG4gIHB1YmxpYyByZWxlYXNlVGV4dHVyZUJ5RmlsZVBhdGgoZmlsZU5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl90ZXh0dXJlcy5nZXRTaXplKCk7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5fdGV4dHVyZXMuYXQoaSkuZmlsZU5hbWUgPT0gZmlsZU5hbWUpIHtcclxuICAgICAgICB0aGlzLl90ZXh0dXJlcy5zZXQoaSwgbnVsbCk7XHJcbiAgICAgICAgdGhpcy5fdGV4dHVyZXMucmVtb3ZlKGkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfdGV4dHVyZXM6IGNzbVZlY3RvcjxUZXh0dXJlSW5mbz47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlm77lg4/kv6Hmga/nu5PmnoTkvZNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUZXh0dXJlSW5mbyB7XHJcbiAgaW1nOiBIVE1MSW1hZ2VFbGVtZW50OyAvLyDlm77lg49cclxuICBpZDogV2ViR0xUZXh0dXJlID0gbnVsbDsgLy8g57q555CGXHJcbiAgd2lkdGggPSAwOyAvLyDlrr3luqZcclxuICBoZWlnaHQgPSAwOyAvLyDpq5jluqZcclxuICB1c2VQcmVtdWx0cGx5OiBib29sZWFuOyAvLyDmmK/lkKblkK/nlKhQcmVtdWx05aSE55CGXHJcbiAgZmlsZU5hbWU6IHN0cmluZzsgLy8g5paH5Lu25ZCNXHJcbn1cclxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBcImFiNTJmMzRhMTc0ZTE2YzAyMmE1XCI7IH0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=