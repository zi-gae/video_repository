"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onlyAdmin = exports.onlyPrivate = exports.onlyPublic = exports.localsMiddleware = exports.uploadAvatar = exports.uploadVideo = void 0;

var _routes = _interopRequireDefault(require("./routes"));

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var s3 = new _awsSdk["default"].S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-1"
});
var multerVideo = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: "public-read",
    bucket: "wetube/video"
  })
});
var multerAvatar = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: "public-read",
    bucket: "wetube/avatar"
  })
});
var uploadVideo = multerVideo.single("videoFile");
exports.uploadVideo = uploadVideo;
var uploadAvatar = multerAvatar.single("avatar");
exports.uploadAvatar = uploadAvatar;

var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.siteName = "VideoPlayer";
  res.locals.routes = _routes["default"];
  res.locals.loggedUser = req.user || null;
  next();
};

exports.localsMiddleware = localsMiddleware;

var onlyPublic = function onlyPublic(req, res, next) {
  // 로그인이 되어 있으면 가입 페이지로 가는것을 막음
  if (req.user) {
    res.redirect(_routes["default"].home);
  } else {
    next();
  }
};

exports.onlyPublic = onlyPublic;

var onlyPrivate = function onlyPrivate(req, res, next) {
  // 로그인이 되어 있으면 가입 페이지로 가는것을 막음
  if (!req.user) {
    res.redirect(_routes["default"].home);
  } else {
    next();
  }
};

exports.onlyPrivate = onlyPrivate;

var onlyAdmin = function onlyAdmin(req, res, next) {
  if (req.user.email === "doscm164@naver.com" || req.user.email === "doscmDev@gmail.com") {
    next();
  } else {
    res.redirect(_routes["default"].home);
  }
}; // single() => 하나의 파일만 업로드 할 수 있다는 함수
// 사용자가 전송한 데이터에서 파일이 포함 되어 있다면
// 파일을 가공해서 req.file 이라는 프로퍼티를 암시적으로 추가하는 미들웨어
// single 의 인자는 파일을 업로드 하는 input 의 name 값


exports.onlyAdmin = onlyAdmin;