"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getIdInWindow(ids) {
    if (ids === void 0) { ids = []; }
    var _idInWindow = ids.find(function (id) {
        var el = document.getElementById(id);
        if (!el) {
            return false;
        }
        var scrollTop = window.pageYOffset;
        var pageHeight = el.offsetTop;
        if (scrollTop + window.innerHeight > pageHeight && scrollTop < pageHeight) {
            return true;
        }
        else {
            return false;
        }
    });
    return _idInWindow;
}
exports.getIdInWindow = getIdInWindow;
function chunkArray(array, size) {
    var chunked_arr = [];
    var index = 0;
    while (index < array.length) {
        chunked_arr.push(array.slice(index, size + index));
        index += size;
    }
    return chunked_arr;
}
exports.chunkArray = chunkArray;
//# sourceMappingURL=utils.js.map