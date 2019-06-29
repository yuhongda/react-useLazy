"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LazyComp = function LazyComp(props) {
  var id = props.id,
      isShowContent = props.isShowContent,
      styles = props.styles;
  return _react.default.createElement("div", {
    id: id,
    style: styles
  }, isShowContent ? props.children : '');
};

var _default = LazyComp;
exports.default = _default;