/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 289:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(289);
const fs = __nccwpck_require__(147);
const path = __nccwpck_require__(17);


function walk_recursive(dir, exclude, callback) {
  fs.readdir(dir, function (err, files) {
    if (err) throw err;
    files.forEach(function (file) {
      var filepath = path.join(dir, file);
      if (!exclude.test(filepath)) {
        fs.stat(filepath, function (err, stats) {
          if (stats.isDirectory()) {
            walk_recursive(filepath, exclude, callback);
          } else if (stats.isFile()) {
            callback(filepath, stats);
          }
        });
      }
    });
  });
}

try {
  const regex = new RegExp(core.getInput('regex'), core.getInput('flags'));
  const include = new RegExp(core.getInput('include'));
  const exclude = new RegExp(core.getInput('exclude'));
  const encoding = core.getInput('encoding');
  const start_path = core.getInput('path');

  walk_recursive(start_path, exclude, (file) => {
    if (include.test(file)) {
      fs.readFile(file, encoding, function (err, data) {
        if (err) {
          return console.log(err);
        }
        var result = data.replace(regex, function (x) {
          console.log(x);
          return x.toLowerCase();
        });
        if (data != result) {
          console.log('Modifying ', file);
          fs.writeFile(file, result, encoding, function (err) {
            if (err) return core.setFailed(err);
          });
        }
      });
    }
  })
} catch (error) {
  core.setFailed(error.message);
}
})();

module.exports = __webpack_exports__;
/******/ })()
;