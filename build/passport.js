"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _User = _interopRequireDefault(require("./models/User"));

var _passportGithub = _interopRequireDefault(require("passport-github"));

var _passportFacebook = _interopRequireDefault(require("passport-facebook"));

var _passportKakao = _interopRequireDefault(require("passport-kakao"));

var _userController = require("./controllers/userController");

var _routes = _interopRequireDefault(require("./routes"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_passport["default"].use(_User["default"].createStrategy()); //strategy: 로그인하는 방식


_passport["default"].use(new _passportGithub["default"]({
  clientID: process.env.GH_ID,
  clientSecret: process.env.GH_SECRET,
  callbackURL: "https://murmuring-beyond-99105.herokuapp.com/".concat(_routes["default"].githubCallback)
}, _userController.githubLoginCallback));

_passport["default"].use(new _passportKakao["default"]({
  clientID: process.env.KAKAO_ID,
  callbackURL: "https://murmuring-beyond-99105.herokuapp.com/".concat(_routes["default"].kakaoCallback)
}, _userController.kakaoLoginCallback));

_passport["default"].serializeUser(_User["default"].serializeUser());

_passport["default"].deserializeUser(_User["default"].deserializeUser()); //serializeUser: 어떤 정보를 쿠키에 주느냐, 사용자에 대해서 어떤 정보를 가질 수 있는지.
//deserializeUser: 쿠키의 정보를 어떻게 사용자로 전환하는가...? (잘 모르겠다)