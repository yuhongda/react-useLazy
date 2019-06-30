"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var LazyComp = function (props) {
    var id = props.id, isShowContent = props.isShowContent, styles = props.styles, loadingComponent = props.loadingComponent;
    return (React.createElement("div", { id: id, style: styles }, isShowContent ? props.children : loadingComponent));
};
exports.default = LazyComp;
//# sourceMappingURL=LazyComp.js.map