"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLazy = useLazy;

var _react = _interopRequireWildcard(require("react"));

var _v = _interopRequireDefault(require("uuid/v1"));

var _v2 = _interopRequireDefault(require("uuid/v5"));

var _objectHash = _interopRequireDefault(require("object-hash"));

var _LazyComp = _interopRequireDefault(require("./LazyComp"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * useLazy Custom Hook
 * @param {component array} components 
 * @param {use to divide components into chunk} chunkNumber 
 * @param {wrap styles} styles 
 */
function useLazy(components) {
  var chunkNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  var styles = arguments.length > 2 ? arguments[2] : undefined;

  // id list of LazyComp list
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      ids = _useState2[0],
      setIds = _useState2[1]; // render result


  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      lazyComponents = _useState4[0],
      setLazyComponents = _useState4[1]; // split 'ids' by 'chunkNumber'


  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      chunkIdList = _useState6[0],
      setChunkIdList = _useState6[1]; // current chunk that show in window


  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      currentIdList = _useState8[0],
      setCurrentIdList = _useState8[1];

  var lastIds = (0, _react.useRef)(ids);
  var lastChunkIdList = (0, _react.useRef)(chunkIdList);
  var lastCurrentIdList = (0, _react.useRef)(currentIdList); // update last value

  (0, _react.useEffect)(function () {
    lastIds.current = ids;
    lastChunkIdList.current = chunkIdList;
    lastCurrentIdList.current = currentIdList;
  }, [(0, _objectHash.default)(ids), (0, _objectHash.default)(chunkIdList), (0, _objectHash.default)(currentIdList)]); // generate ids

  (0, _react.useEffect)(function () {
    var _ids = [];
    components && components.map(function (comp, i) {
      var id = "lazy_comp_".concat((0, _v2.default)("lazy_comp".concat(i), (0, _v.default)()));

      _ids.push(id);
    });
    setIds(_ids);
  }, [components.length, chunkNumber]); // wrap components with 'LazyComp'

  (0, _react.useEffect)(function () {
    setLazyComponents(components && components.map(function (comp, i) {
      return _react.default.createElement(_LazyComp.default, {
        key: i,
        id: lastIds.current[i],
        isShowContent: lastCurrentIdList.current.indexOf(lastIds.current[i]) != -1,
        styles: styles
      }, comp);
    }));

    var _chunkIdList = (0, _utils.chunkArray)(lastIds.current, chunkNumber);

    setChunkIdList(_chunkIdList);
  }, [components.length, chunkNumber, (0, _objectHash.default)(ids), (0, _objectHash.default)(currentIdList)]); // for the FIRST render

  (0, _react.useEffect)(function () {
    setCurrentIdList((0, _utils.chunkArray)(lastIds.current, chunkNumber)[0] || []);
  }, [(0, _objectHash.default)(ids)]); // scroll event

  (0, _react.useEffect)(function () {
    window.addEventListener('scroll', handleScroll);
    return function () {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [components.length, chunkNumber]);

  function handleScroll(e) {
    var _currentIdList = lastChunkIdList.current.find(function (idList) {
      return idList.indexOf((0, _utils.getIdInWindow)(lastIds.current)) != -1;
    });

    setCurrentIdList(_currentIdList);
  }

  return [lazyComponents];
}