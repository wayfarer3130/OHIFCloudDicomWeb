/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./service-worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./service-worker.js":
/*!***************************!*\
  !*** ./service-worker.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n// https://developers.google.com/web/tools/workbox/guides/troubleshoot-and-debug\nimportScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0-beta.1/workbox-sw.js'); // Install newest\n// https://developers.google.com/web/tools/workbox/modules/workbox-core\n\nworkbox.core.skipWaiting();\nworkbox.core.clientsClaim(); // Cache static assets that aren't precached\n\nworkbox.routing.registerRoute(/\\.(?:js|css)$/, new workbox.strategies.StaleWhileRevalidate({\n  cacheName: 'static-resources'\n})); // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.\n\nworkbox.routing.registerRoute(/^https:\\/\\/fonts\\.googleapis\\.com/, new workbox.strategies.StaleWhileRevalidate({\n  cacheName: 'google-fonts-stylesheets'\n})); // Cache the underlying font files with a cache-first strategy for 1 year.\n\nworkbox.routing.registerRoute(/^https:\\/\\/fonts\\.gstatic\\.com/, new workbox.strategies.CacheFirst({\n  cacheName: 'google-fonts-webfonts',\n  plugins: [new workbox.cacheableResponse.CacheableResponsePlugin({\n    statuses: [0, 200]\n  }), new workbox.expiration.ExpirationPlugin({\n    maxAgeSeconds: 60 * 60 * 24 * 365,\n    // 1 Year\n    maxEntries: 30\n  })]\n})); // MESSAGE HANDLER\n\nself.addEventListener('message', function (event) {\n  if (event.data && event.data.type === 'SKIP_WAITING') {\n    switch (event.data.type) {\n      case 'SKIP_WAITING':\n        // TODO: We'll eventually want this to be user prompted\n        // workbox.core.skipWaiting();\n        // workbox.core.clientsClaim();\n        // TODO: Global notification to indicate incoming reload\n        break;\n\n      default:\n        console.warn(\"SW: Invalid message type: \".concat(event.data.type));\n    }\n  }\n});\nworkbox.precaching.precacheAndRoute([{'revision':'dac67746ebafb99ffc7ef944f8363df0','url':'/0.js'},{'revision':'e57d50af35a40703ebb28257db46ac22','url':'/1.js'},{'revision':'f3a43fea91e762ad562b812fd65b94a1','url':'/2.js'},{'revision':'1867d4e3ceb17eafb9487d973ec9aa6d','url':'/3.js'},{'revision':'6839a719b6810111d8097998b11293a1','url':'/_redirects'},{'revision':'5c920870bdc04788b9977b76c764a08d','url':'/app-config.js'},{'revision':'a1fd1c75202844b59b1f3d07dea9c7f5','url':'/app.css'},{'revision':'cb4f64534cdf8dd88f1d7219d44490db','url':'/assets/android-chrome-144x144.png'},{'revision':'5cde390de8a619ebe55a669d2ac3effd','url':'/assets/android-chrome-192x192.png'},{'revision':'e7466a67e90471de05401e53b8fe20be','url':'/assets/android-chrome-256x256.png'},{'revision':'9bbe9b80156e930d19a4e1725aa9ddae','url':'/assets/android-chrome-36x36.png'},{'revision':'5698b2ac0c82fe06d84521fc5482df04','url':'/assets/android-chrome-384x384.png'},{'revision':'56bef3fceec344d9747f8abe9c0bba27','url':'/assets/android-chrome-48x48.png'},{'revision':'3e8b8a01290992e82c242557417b0596','url':'/assets/android-chrome-512x512.png'},{'revision':'517925e91e2ce724432d296b687d25e2','url':'/assets/android-chrome-72x72.png'},{'revision':'4c3289bc690f8519012686888e08da71','url':'/assets/android-chrome-96x96.png'},{'revision':'cf464289183184df09292f581df0fb4f','url':'/assets/apple-touch-icon-1024x1024.png'},{'revision':'0857c5282c594e4900e8b31e3bade912','url':'/assets/apple-touch-icon-114x114.png'},{'revision':'4208f41a28130a67e9392a9dfcee6011','url':'/assets/apple-touch-icon-120x120.png'},{'revision':'cb4f64534cdf8dd88f1d7219d44490db','url':'/assets/apple-touch-icon-144x144.png'},{'revision':'977d293982af7e9064ba20806b45cf35','url':'/assets/apple-touch-icon-152x152.png'},{'revision':'6de91b4d2a30600b410758405cb567b4','url':'/assets/apple-touch-icon-167x167.png'},{'revision':'87bff140e3773bd7479a620501c4aa5c','url':'/assets/apple-touch-icon-180x180.png'},{'revision':'647386c34e75f1213830ea9a38913525','url':'/assets/apple-touch-icon-57x57.png'},{'revision':'0c200fe83953738b330ea431083e7a86','url':'/assets/apple-touch-icon-60x60.png'},{'revision':'517925e91e2ce724432d296b687d25e2','url':'/assets/apple-touch-icon-72x72.png'},{'revision':'c9989a807bb18633f6dcf254b5b56124','url':'/assets/apple-touch-icon-76x76.png'},{'revision':'87bff140e3773bd7479a620501c4aa5c','url':'/assets/apple-touch-icon-precomposed.png'},{'revision':'87bff140e3773bd7479a620501c4aa5c','url':'/assets/apple-touch-icon.png'},{'revision':'05fa74ea9c1c0c3931ba96467999081d','url':'/assets/apple-touch-startup-image-1182x2208.png'},{'revision':'9e2cd03e1e6fd0520eea6846f4278018','url':'/assets/apple-touch-startup-image-1242x2148.png'},{'revision':'5591e3a1822cbc8439b99c1a40d53425','url':'/assets/apple-touch-startup-image-1496x2048.png'},{'revision':'337de578c5ca04bd7d2be19d24d83821','url':'/assets/apple-touch-startup-image-1536x2008.png'},{'revision':'cafb4ab4eafe6ef946bd229a1d88e7de','url':'/assets/apple-touch-startup-image-320x460.png'},{'revision':'d9bb9e558d729eeac5efb8be8d6111cc','url':'/assets/apple-touch-startup-image-640x1096.png'},{'revision':'038b5b02bac8b82444bf9a87602ac216','url':'/assets/apple-touch-startup-image-640x920.png'},{'revision':'2177076eb07b1d64d663d7c03268be00','url':'/assets/apple-touch-startup-image-748x1024.png'},{'revision':'4fc097443815fe92503584c4bd73c630','url':'/assets/apple-touch-startup-image-750x1294.png'},{'revision':'2e29914062dce5c5141ab47eea2fc5d9','url':'/assets/apple-touch-startup-image-768x1004.png'},{'revision':'f692ec286b3a332c17985f4ed38b1076','url':'/assets/browserconfig.xml'},{'revision':'f3d9a3b647853c45b0e132e4acd0cc4a','url':'/assets/coast-228x228.png'},{'revision':'533ba1dcac7b716dec835a2fae902860','url':'/assets/favicon-16x16.png'},{'revision':'783e9edbcc23b8d626357ca7101161e0','url':'/assets/favicon-32x32.png'},{'revision':'0711f8e60267a1dfc3aaf1e3818e7185','url':'/assets/favicon.ico'},{'revision':'5df2a5b0cee399ac0bc40af74ba3c2cb','url':'/assets/firefox_app_128x128.png'},{'revision':'11fd9098c4b07c8a07e1d2a1e309e046','url':'/assets/firefox_app_512x512.png'},{'revision':'27cddfc922dca3bfa27b4a00fc2f5e36','url':'/assets/firefox_app_60x60.png'},{'revision':'2017d95fae79dcf34b5a5b52586d4763','url':'/assets/manifest.webapp'},{'revision':'cb4f64534cdf8dd88f1d7219d44490db','url':'/assets/mstile-144x144.png'},{'revision':'334895225e16a7777e45d81964725a97','url':'/assets/mstile-150x150.png'},{'revision':'e295cca4af6ed0365cf7b014d91b0e9d','url':'/assets/mstile-310x150.png'},{'revision':'cbefa8c42250e5f2443819fe2c69d91e','url':'/assets/mstile-310x310.png'},{'revision':'aa411a69df2b33a1362fa38d1257fa9d','url':'/assets/mstile-70x70.png'},{'revision':'5609af4f69e40e33471aee770ea1d802','url':'/assets/yandex-browser-50x50.png'},{'revision':'cfea70d7ddc8f06f276ea0c85c4b2adf','url':'/assets/yandex-browser-manifest.json'},{'revision':'75291598466e262a1226b876abb14050','url':'/customLogo.svg'},{'revision':'0ca44a1b8719e835645ffa804a9d1395','url':'/es6-shim.min.js'},{'revision':'fc5ca61e7823972f5c8fd43675770bc8','url':'/google.js'},{'revision':'03b756df17106dd783951fd7589f7b71','url':'/index.html'},{'revision':'4e41fd55c08031edf19119a1df1a0538','url':'/init-service-worker.js'},{'revision':'74fc9658b62903be2048c1f82a22b4d4','url':'/manifest.json'},{'revision':'754d698a7b334af57c00f29723fd9751','url':'/oidc-client.min.js'},{'revision':'d05a380d50b74e629738ae6f62fb7e78','url':'/polyfill.min.js'},{'revision':'f528b6861c82ee4415fce0821fd695c1','url':'/silent-refresh.html'}]); // TODO: Cache API\n// https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/cache-api\n// Store DICOMs?\n// Clear Service Worker cache?\n// navigator.storage.estimate().then(est => console.log(est)); (2GB?)//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zZXJ2aWNlLXdvcmtlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NlcnZpY2Utd29ya2VyLmpzPzVmNjUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL3Rvb2xzL3dvcmtib3gvZ3VpZGVzL3Ryb3VibGVzaG9vdC1hbmQtZGVidWdcbmltcG9ydFNjcmlwdHMoXG4gICdodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vd29ya2JveC1jZG4vcmVsZWFzZXMvNS4wLjAtYmV0YS4xL3dvcmtib3gtc3cuanMnXG4pO1xuXG4vLyBJbnN0YWxsIG5ld2VzdFxuLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL3Rvb2xzL3dvcmtib3gvbW9kdWxlcy93b3JrYm94LWNvcmVcbndvcmtib3guY29yZS5za2lwV2FpdGluZygpO1xud29ya2JveC5jb3JlLmNsaWVudHNDbGFpbSgpO1xuXG4vLyBDYWNoZSBzdGF0aWMgYXNzZXRzIHRoYXQgYXJlbid0IHByZWNhY2hlZFxud29ya2JveC5yb3V0aW5nLnJlZ2lzdGVyUm91dGUoXG4gIC9cXC4oPzpqc3xjc3MpJC8sXG4gIG5ldyB3b3JrYm94LnN0cmF0ZWdpZXMuU3RhbGVXaGlsZVJldmFsaWRhdGUoe1xuICAgIGNhY2hlTmFtZTogJ3N0YXRpYy1yZXNvdXJjZXMnLFxuICB9KVxuKTtcblxuLy8gQ2FjaGUgdGhlIEdvb2dsZSBGb250cyBzdHlsZXNoZWV0cyB3aXRoIGEgc3RhbGUtd2hpbGUtcmV2YWxpZGF0ZSBzdHJhdGVneS5cbndvcmtib3gucm91dGluZy5yZWdpc3RlclJvdXRlKFxuICAvXmh0dHBzOlxcL1xcL2ZvbnRzXFwuZ29vZ2xlYXBpc1xcLmNvbS8sXG4gIG5ldyB3b3JrYm94LnN0cmF0ZWdpZXMuU3RhbGVXaGlsZVJldmFsaWRhdGUoe1xuICAgIGNhY2hlTmFtZTogJ2dvb2dsZS1mb250cy1zdHlsZXNoZWV0cycsXG4gIH0pXG4pO1xuXG4vLyBDYWNoZSB0aGUgdW5kZXJseWluZyBmb250IGZpbGVzIHdpdGggYSBjYWNoZS1maXJzdCBzdHJhdGVneSBmb3IgMSB5ZWFyLlxud29ya2JveC5yb3V0aW5nLnJlZ2lzdGVyUm91dGUoXG4gIC9eaHR0cHM6XFwvXFwvZm9udHNcXC5nc3RhdGljXFwuY29tLyxcbiAgbmV3IHdvcmtib3guc3RyYXRlZ2llcy5DYWNoZUZpcnN0KHtcbiAgICBjYWNoZU5hbWU6ICdnb29nbGUtZm9udHMtd2ViZm9udHMnLFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIG5ldyB3b3JrYm94LmNhY2hlYWJsZVJlc3BvbnNlLkNhY2hlYWJsZVJlc3BvbnNlUGx1Z2luKHtcbiAgICAgICAgc3RhdHVzZXM6IFswLCAyMDBdLFxuICAgICAgfSksXG4gICAgICBuZXcgd29ya2JveC5leHBpcmF0aW9uLkV4cGlyYXRpb25QbHVnaW4oe1xuICAgICAgICBtYXhBZ2VTZWNvbmRzOiA2MCAqIDYwICogMjQgKiAzNjUsIC8vIDEgWWVhclxuICAgICAgICBtYXhFbnRyaWVzOiAzMCxcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pXG4pO1xuXG4vLyBNRVNTQUdFIEhBTkRMRVJcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGV2ZW50ID0+IHtcbiAgaWYgKGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS50eXBlID09PSAnU0tJUF9XQUlUSU5HJykge1xuICAgIHN3aXRjaCAoZXZlbnQuZGF0YS50eXBlKSB7XG4gICAgICBjYXNlICdTS0lQX1dBSVRJTkcnOlxuICAgICAgICAvLyBUT0RPOiBXZSdsbCBldmVudHVhbGx5IHdhbnQgdGhpcyB0byBiZSB1c2VyIHByb21wdGVkXG4gICAgICAgIC8vIHdvcmtib3guY29yZS5za2lwV2FpdGluZygpO1xuICAgICAgICAvLyB3b3JrYm94LmNvcmUuY2xpZW50c0NsYWltKCk7XG4gICAgICAgIC8vIFRPRE86IEdsb2JhbCBub3RpZmljYXRpb24gdG8gaW5kaWNhdGUgaW5jb21pbmcgcmVsb2FkXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLndhcm4oYFNXOiBJbnZhbGlkIG1lc3NhZ2UgdHlwZTogJHtldmVudC5kYXRhLnR5cGV9YCk7XG4gICAgfVxuICB9XG59KTtcblxud29ya2JveC5wcmVjYWNoaW5nLnByZWNhY2hlQW5kUm91dGUoc2VsZi5fX1dCX01BTklGRVNUKTtcblxuLy8gVE9ETzogQ2FjaGUgQVBJXG4vLyBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS93ZWIvZnVuZGFtZW50YWxzL2luc3RhbnQtYW5kLW9mZmxpbmUvd2ViLXN0b3JhZ2UvY2FjaGUtYXBpXG4vLyBTdG9yZSBESUNPTXM/XG4vLyBDbGVhciBTZXJ2aWNlIFdvcmtlciBjYWNoZT9cbi8vIG5hdmlnYXRvci5zdG9yYWdlLmVzdGltYXRlKCkudGhlbihlc3QgPT4gY29uc29sZS5sb2coZXN0KSk7ICgyR0I/KVxuIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUtBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBREE7QUFDQTtBQUtBO0FBR0E7QUFEQTtBQUNBO0FBS0E7QUFHQTtBQUNBO0FBRUE7QUFEQTtBQUlBO0FBQUE7QUFDQTtBQUZBO0FBTkE7QUFDQTtBQWNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./service-worker.js\n");

/***/ })

/******/ });