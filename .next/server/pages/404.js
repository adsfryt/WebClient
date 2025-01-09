"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/404";
exports.ids = ["pages/404"];
exports.modules = {

/***/ "./Data.js":
/*!*****************!*\
  !*** ./Data.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobx */ \"mobx\");\n/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mobx__WEBPACK_IMPORTED_MODULE_0__);\n\nclass Data {\n    constructor(){\n        this.ADDRESS_SITE = \"http://localhost:3000\";\n        this.ADDRESS_SERVER = \"http://localhost:5000\";\n        this.Auth_Address = \"http://localhost:6500\";\n        this.WS_ADDRESS_SERVER = \"ws://localhost:5000\";\n        (0,mobx__WEBPACK_IMPORTED_MODULE_0__.makeAutoObservable)(this);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Data());\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9EYXRhLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUF1RDtBQUV2RCxNQUFNRTtJQUNGQyxhQUFjO2FBR2RDLGVBQWE7YUFDYkMsaUJBQWU7YUFDZkMsZUFBYTthQUNiQyxvQkFBa0I7UUFMZFAsd0RBQWtCQSxDQUFDLElBQUk7SUFDM0I7QUFLSjtBQUVBLGlFQUFlLElBQUlFLE1BQU1BLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaXN0YW50Ly4vRGF0YS5qcz9kYmY4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7bWFrZUF1dG9PYnNlcnZhYmxlLG1ha2VPYnNlcnZhYmxlfSBmcm9tIFwibW9ieFwiO1xyXG5cclxuY2xhc3MgRGF0YXtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIG1ha2VBdXRvT2JzZXJ2YWJsZSh0aGlzKVxyXG4gICAgfVxyXG4gICAgQUREUkVTU19TSVRFPVwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCJcclxuICAgIEFERFJFU1NfU0VSVkVSPVwiaHR0cDovL2xvY2FsaG9zdDo1MDAwXCJcclxuICAgIEF1dGhfQWRkcmVzcz1cImh0dHA6Ly9sb2NhbGhvc3Q6NjUwMFwiXHJcbiAgICBXU19BRERSRVNTX1NFUlZFUj1cIndzOi8vbG9jYWxob3N0OjUwMDBcIlxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgRGF0YSgpIl0sIm5hbWVzIjpbIm1ha2VBdXRvT2JzZXJ2YWJsZSIsIm1ha2VPYnNlcnZhYmxlIiwiRGF0YSIsImNvbnN0cnVjdG9yIiwiQUREUkVTU19TSVRFIiwiQUREUkVTU19TRVJWRVIiLCJBdXRoX0FkZHJlc3MiLCJXU19BRERSRVNTX1NFUlZFUiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./Data.js\n");

/***/ }),

/***/ "./pages/404.js":
/*!**********************!*\
  !*** ./pages/404.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"getStaticProps\": () => (/* binding */ getStaticProps)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Data */ \"./Data.js\");\n\n\n\nconst page = ()=>{\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        window.location.replace(_Data__WEBPACK_IMPORTED_MODULE_2__[\"default\"].ADDRESS_SITE);\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {}, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Asan\\\\Documents\\\\Hooli_WebClient\\\\pages\\\\404.js\",\n        lineNumber: 10,\n        columnNumber: 9\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (page);\nasync function getStaticProps() {\n    return {\n        redirect: {\n            permanent: false,\n            destination: \"/\"\n        }\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy80MDQuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBdUM7QUFDWjtBQUUzQixNQUFNRyxPQUFPLElBQU07SUFDZkYsZ0RBQVNBLENBQUMsSUFBSTtRQUNWRyxPQUFPQyxRQUFRLENBQUNDLE9BQU8sQ0FBQ0osMERBQWlCO0lBQzdDLEdBQUUsRUFBRTtJQUVKLHFCQUNJLDhEQUFDTTs7Ozs7QUFJVDtBQUVBLGlFQUFlTCxJQUFJQSxFQUFDO0FBRWIsZUFBZU0saUJBQWlCO0lBQ25DLE9BQU87UUFDSEMsVUFBVTtZQUNOQyxXQUFXLEtBQUs7WUFDaEJDLGFBQWE7UUFDakI7SUFDSjtBQUNKLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaXN0YW50Ly4vcGFnZXMvNDA0LmpzPzNlZDkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7dXNlRWZmZWN0fSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBEYXRhIGZyb20gXCIuLi9EYXRhXCI7XHJcblxyXG5jb25zdCBwYWdlID0gKCkgPT4ge1xyXG4gICAgdXNlRWZmZWN0KCgpPT57XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoRGF0YS5BRERSRVNTX1NJVEUpO1xyXG4gICAgfSxbXSlcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXY+XHJcblxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBhZ2U7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdGljUHJvcHMoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlZGlyZWN0OiB7XHJcbiAgICAgICAgICAgIHBlcm1hbmVudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uOiBcIi9cIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsIkRhdGEiLCJwYWdlIiwid2luZG93IiwibG9jYXRpb24iLCJyZXBsYWNlIiwiQUREUkVTU19TSVRFIiwiZGl2IiwiZ2V0U3RhdGljUHJvcHMiLCJyZWRpcmVjdCIsInBlcm1hbmVudCIsImRlc3RpbmF0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/404.js\n");

/***/ }),

/***/ "mobx":
/*!***********************!*\
  !*** external "mobx" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("mobx");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/404.js"));
module.exports = __webpack_exports__;

})();