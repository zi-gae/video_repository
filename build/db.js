"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config(); //env파일의 variable 들을 process.env.key 로 저장


_mongoose["default"].connect(process.env.MONGO_URL_PROD, {
  useNewUrlParser: true,
  useFindAndModify: false
});

var db = _mongoose["default"].connection;

var handleOpen = function handleOpen() {
  return console.log("✅ Connected to DB");
};

var handleError = function handleError(err) {
  return console.log("\u274C Error on DB Connection: ".concat(err));
};

db.once("open", handleOpen);
db.on("error", handleError);