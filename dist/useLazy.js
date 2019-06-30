"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var uuidv1 = require("uuid/v1");
var uuidv5 = require("uuid/v5");
var hash = require("object-hash");
var LazyComp_1 = require("./LazyComp");
var utils_1 = require("./utils");
/**
 * useLazy Custom Hook
 * @param {component array} components
 * @param {use to divide components into chunk} chunkNumber
 * @param {wrap styles} styles
 * @param {loading component} loadingComponent
 */
function useLazy(components, chunkNumber, styles, loadingComponent) {
    if (chunkNumber === void 0) { chunkNumber = 5; }
    if (loadingComponent === void 0) { loadingComponent = React.createElement("div", { style: { height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' } }, "loading..."); }
    // id list of LazyComp list
    var _a = react_1.useState([]), ids = _a[0], setIds = _a[1];
    // render result
    var _b = react_1.useState([]), lazyComponents = _b[0], setLazyComponents = _b[1];
    // split 'ids' by 'chunkNumber'
    var _c = react_1.useState([]), chunkIdList = _c[0], setChunkIdList = _c[1];
    // current chunk that show in window
    var _d = react_1.useState([]), currentIdList = _d[0], setCurrentIdList = _d[1];
    var lastIds = react_1.useRef(ids);
    var lastChunkIdList = react_1.useRef(chunkIdList);
    var lastCurrentIdList = react_1.useRef(currentIdList);
    var _timeId = null;
    // update last value
    react_1.useEffect(function () {
        lastIds.current = ids;
        lastChunkIdList.current = chunkIdList;
        lastCurrentIdList.current = currentIdList;
    }, [hash(ids), hash(chunkIdList), hash(currentIdList)]);
    // generate ids
    react_1.useEffect(function () {
        var _ids = [];
        components && components.forEach(function (comp, i) {
            var id = "lazy_comp_" + comp.type + "_" + uuidv5("lazy_comp" + i, uuidv1());
            _ids.push(id);
        });
        setIds(_ids);
    }, [components.length, chunkNumber]);
    // wrap components with 'LazyComp'
    react_1.useEffect(function () {
        setLazyComponents(components && components.map(function (comp, i) {
            return (React.createElement(LazyComp_1.default, { key: i, id: lastIds.current[i], loadingComponent: loadingComponent, isShowContent: lastCurrentIdList.current.indexOf(lastIds.current[i]) != -1, styles: styles }, comp));
        }));
        var _chunkIdList = utils_1.chunkArray(lastIds.current, chunkNumber);
        setChunkIdList(_chunkIdList);
    }, [components.length, chunkNumber, hash(ids), hash(currentIdList)]);
    // for the FIRST render
    react_1.useEffect(function () {
        setCurrentIdList(utils_1.chunkArray(lastIds.current, chunkNumber)[0] || []);
    }, [hash(ids)]);
    // scroll event
    react_1.useEffect(function () {
        window.addEventListener('scroll', handleScroll);
        return function () {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [components.length, chunkNumber]);
    function handleScroll() {
        if (_timeId) {
            window.clearTimeout(_timeId);
        }
        _timeId = window.setTimeout(function () {
            var _currentIdList = lastChunkIdList.current.find(function (idList) { return idList.indexOf(utils_1.getIdInWindow(lastIds.current)) != -1; });
            setCurrentIdList(_currentIdList);
        }, 500);
    }
    return [lazyComponents];
}
exports.useLazy = useLazy;
//# sourceMappingURL=useLazy.js.map