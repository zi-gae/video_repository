"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _videoController = require("../controllers/videoController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoRouter = _express["default"].Router(); // Upload


videoRouter.get(_routes["default"].upload, _middlewares.onlyPrivate, _videoController.getUpload);
videoRouter.post(_routes["default"].upload, _middlewares.onlyPrivate, _middlewares.uploadVideo, _videoController.postUpload); // 사용자가 post 방식으로 전송한 데이터가 routes.upload 방향을 가르킨다면 uploadVideo 실행 후 postUpload 실행
// Video Detail

videoRouter.get(_routes["default"].videoDetail(), _videoController.videoDetail); // Edit Video

videoRouter.get(_routes["default"].editVideo(), _middlewares.onlyPrivate, _videoController.getEditVideo);
videoRouter.post(_routes["default"].editVideo(), _middlewares.onlyPrivate, _videoController.postEditVideo); // Delete Video

videoRouter.get(_routes["default"].deleteVideo(), _middlewares.onlyPrivate, _videoController.deleteVideo);
var _default = videoRouter;
exports["default"] = _default;