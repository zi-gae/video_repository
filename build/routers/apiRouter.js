"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _videoController = require("../controllers/videoController");

var _userController = require("../controllers/userController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiRouter = _express["default"].Router();

apiRouter.post(_routes["default"].registerView, _videoController.registerView);
apiRouter.post(_routes["default"].addComment, _videoController.postAddComment);
apiRouter.post(_routes["default"].authApply, _userController.postAuthApply);
var _default = apiRouter;
exports["default"] = _default;