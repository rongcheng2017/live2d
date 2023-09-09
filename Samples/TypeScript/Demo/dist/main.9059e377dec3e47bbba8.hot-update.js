"use strict";
self["webpackHotUpdate"]("main",{

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
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
var lappdelegate_1 = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
var LAppDefine = __importStar(__webpack_require__(/*! ./lappdefine */ "./src/lappdefine.ts"));
window.onload = function () {
    if (lappdelegate_1.LAppDelegate.getInstance().initialize() == false) {
        return;
    }
    lappdelegate_1.LAppDelegate.getInstance().run();
};
window.onbeforeunload = function () { return lappdelegate_1.LAppDelegate.releaseInstance(); };
window.onresize = function () {
    if (LAppDefine.CanvasSize === 'auto') {
        lappdelegate_1.LAppDelegate.getInstance().onResize();
    }
};


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "6e1ac45087992409c701"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi45MDU5ZTM3N2RlYzNlNDdiYmJhOC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQSx3RkFBOEM7QUFDOUMsOEZBQTJDO0FBSzNDLE1BQU0sQ0FBQyxNQUFNLEdBQUc7SUFFZCxJQUFJLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxFQUFFLElBQUksS0FBSyxFQUFFO1FBQ3BELE9BQU87S0FDUjtJQUVELDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDbkMsQ0FBQyxDQUFDO0FBS0YsTUFBTSxDQUFDLGNBQWMsR0FBRyxjQUFZLGtDQUFZLENBQUMsZUFBZSxFQUFFLEVBQTlCLENBQThCLENBQUM7QUFLbkUsTUFBTSxDQUFDLFFBQVEsR0FBRztJQUNoQixJQUFJLFVBQVUsQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFFO1FBQ3BDLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDdkM7QUFDSCxDQUFDLENBQUM7Ozs7Ozs7OztVQ2xDRixxQ0FBcUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICog54mI5p2DKGMpIExpdmUyRCBJbmMuIOS/neeVmeaJgOacieadg+WIqeOAglxuICpcbiAqIOS9v+eUqOacrOa6kOS7o+eggeWPl0xpdmUyROW8gOaUvui9r+S7tuiuuOWPr+ivgeeahOe6puadn++8jFxuICog6K+l6K645Y+v6K+B5Y+v5ZyoaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWzmib7liLDjgIJcbiAqL1xuXG5pbXBvcnQgeyBMQXBwRGVsZWdhdGUgfSBmcm9tICcuL2xhcHBkZWxlZ2F0ZSc7XG5pbXBvcnQgKiBhcyBMQXBwRGVmaW5lIGZyb20gJy4vbGFwcGRlZmluZSc7XG5cbi8qKlxuICog5rWP6KeI5Zmo5Yqg6L295ZCO55qE5aSE55CGXG4gKi9cbndpbmRvdy5vbmxvYWQgPSAoKTogdm9pZCA9PiB7XG4gIC8vIOWIm+W7uuW6lOeUqOeoi+W6j+WunuS+i1xuICBpZiAoTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuaW5pdGlhbGl6ZSgpID09IGZhbHNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkucnVuKCk7XG59O1xuXG4vKipcbiAqIOWFs+mXreeql+WPo+aXtueahOWkhOeQhlxuICovXG53aW5kb3cub25iZWZvcmV1bmxvYWQgPSAoKTogdm9pZCA9PiBMQXBwRGVsZWdhdGUucmVsZWFzZUluc3RhbmNlKCk7XG5cbi8qKlxuICog5pu05pS55bGP5bmV5aSn5bCP5pe255qE5aSE55CGXG4gKi9cbndpbmRvdy5vbnJlc2l6ZSA9ICgpID0+IHtcbiAgaWYgKExBcHBEZWZpbmUuQ2FudmFzU2l6ZSA9PT0gJ2F1dG8nKSB7XG4gICAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkub25SZXNpemUoKTtcbiAgfVxufTtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCI2ZTFhYzQ1MDg3OTkyNDA5YzcwMVwiOyB9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9