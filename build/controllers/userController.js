"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postAuthApply = exports.getAuth = exports.postChangePassword = exports.getChangePassword = exports.postEditProfile = exports.getEditProfile = exports.userDetail = exports.getMe = exports.postKakaoLogin = exports.kakaoLoginCallback = exports.kakaoLogin = exports.postGithubLogin = exports.githubLoginCallback = exports.githubLogin = exports.logout = exports.postLogin = exports.getLogin = exports.postJoin = exports.getJoin = void 0;

var _routes = _interopRequireDefault(require("../routes"));

var _User = _interopRequireDefault(require("../models/User"));

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getJoin = function getJoin(req, res) {
  return res.render("join", {
    pageTitle: "Join"
  });
};

exports.getJoin = getJoin;

var postJoin =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, name, email, password, password2, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2;

            if (!(password !== password2)) {
              _context.next = 6;
              break;
            }

            res.status(400); // 정보가 잘못됬다는 state code http 400

            res.rendser("join", {
              pageTitle: "Join"
            });
            _context.next = 19;
            break;

          case 6:
            _context.prev = 6;
            _context.next = 9;
            return (0, _User["default"])({
              name: name,
              email: email,
              authApply: false
            });

          case 9:
            user = _context.sent;
            _context.next = 12;
            return _User["default"].register(user, password);

          case 12:
            //register: 새 사용자 인스턴스를 주어진 암호로 등록하는 편리한 방법입니다.(passport local mongoose 에서 제공)
            next();
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](6);
            console.log(_context.t0);
            res.redirect(_routes["default"].home);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 15]]);
  }));

  return function postJoin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getLogin = function getLogin(req, res) {
  return res.render("login", {
    pageTitle: "Login"
  });
};

exports.getLogin = getLogin;

var postLogin = _passport["default"].authenticate("local", {
  successRedirect: _routes["default"].home,
  failureRedirect: _routes["default"].login
});

exports.postLogin = postLogin;

var logout = function logout(req, res) {
  req.logout();
  res.redirect(_routes["default"].home);
};

exports.logout = logout;

var githubLogin = _passport["default"].authenticate("github"); //passsport 의 GithubStrategy 실행


exports.githubLogin = githubLogin;

var githubLoginCallback =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_, __, profile, cb) {
    var _profile$_json, id, avatar_url, name, email, user, newUser;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            //passport.authenticate("github"); 가 실행 되면 githubLoginCallback 가 실행됨
            _profile$_json = profile._json, id = _profile$_json.id, avatar_url = _profile$_json.avatar_url, name = _profile$_json.name, email = _profile$_json.email;
            _context2.prev = 1;

            if (!(email === null || name === null)) {
              _context2.next = 4;
              break;
            }

            throw error();

          case 4:
            _context2.next = 6;
            return _User["default"].findOne({
              email: email
            });

          case 6:
            user = _context2.sent;

            if (!user) {
              _context2.next = 10;
              break;
            }

            user.githubId = id, user.avatarUrl = avatar_url, user.save();
            return _context2.abrupt("return", cb(null, user));

          case 10:
            _context2.next = 12;
            return _User["default"].create({
              name: name,
              email: email,
              avatarUrl: avatar_url,
              githubId: id,
              authApply: false
            });

          case 12:
            newUser = _context2.sent;
            return _context2.abrupt("return", cb(null, newUser));

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", cb(_context2.t0));

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 16]]);
  }));

  return function githubLoginCallback(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

exports.githubLoginCallback = githubLoginCallback;

var postGithubLogin = function postGithubLogin(req, res) {
  res.redirect(_routes["default"].home);
};

exports.postGithubLogin = postGithubLogin;

var kakaoLogin = _passport["default"].authenticate("kakao");

exports.kakaoLogin = kakaoLogin;

var kakaoLoginCallback =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_, __, profile, done) {
    var _profile$_json2, id, properties, kaccount_email, profile_image, nickname, user, newUser;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _profile$_json2 = profile._json, id = _profile$_json2.id, properties = _profile$_json2.properties, kaccount_email = _profile$_json2.kaccount_email;
            profile_image = properties.profile_image, nickname = properties.nickname;
            _context3.prev = 2;
            _context3.next = 5;
            return _User["default"].findOne({
              email: kaccount_email
            });

          case 5:
            user = _context3.sent;

            if (!user) {
              _context3.next = 11;
              break;
            }

            user.kakaoId = id, user.avatarUrl = profile_image, user.name = nickname, user.save();
            done(null, user);
            _context3.next = 15;
            break;

          case 11:
            _context3.next = 13;
            return _User["default"].create({
              name: nickname,
              email: kaccount_email,
              avatarUrl: profile_image,
              kakaoId: id,
              authApply: false
            });

          case 13:
            newUser = _context3.sent;
            done(null, newUser);

          case 15:
            _context3.next = 21;
            break;

          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3["catch"](2);
            console.log(_context3.t0);
            done(_context3.t0);

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 17]]);
  }));

  return function kakaoLoginCallback(_x8, _x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

exports.kakaoLoginCallback = kakaoLoginCallback;

var postKakaoLogin = function postKakaoLogin(req, res) {
  res.redirect(_routes["default"].home);
};

exports.postKakaoLogin = postKakaoLogin;

var getMe =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _User["default"].findById(req.user.id).populate("videos");

          case 2:
            user = _context4.sent;
            res.render("userDetail", {
              pageTitle: "User Detail",
              user: user
            });

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getMe(_x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getMe = getMe;

var userDetail =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _User["default"].findById(id).populate("videos");

          case 4:
            user = _context5.sent;
            if (req.user.id === id) res.redirect(_routes["default"].me);else res.render("userDetail", {
              pageTitle: "User Detail",
              user: user
            });
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            res.redirect(_routes["default"].home);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 8]]);
  }));

  return function userDetail(_x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.userDetail = userDetail;

var getEditProfile = function getEditProfile(req, res) {
  res.render("editProfile", {
    pageTitle: "Edit Profile",
    user: req.user
  });
};

exports.getEditProfile = getEditProfile;

var postEditProfile =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$body2, name, email, file;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, file = req.file;
            _context6.prev = 1;
            _context6.next = 4;
            return _User["default"].findByIdAndUpdate(req.user.id, {
              name: name,
              email: email,
              avatarUrl: file ? file.location : req.user.avatarUrl
            });

          case 4:
            res.redirect(_routes["default"].me);
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](1);
            console.log(_context6.t0);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 7]]);
  }));

  return function postEditProfile(_x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();

exports.postEditProfile = postEditProfile;

var getChangePassword = function getChangePassword(req, res) {
  return res.render("changePassword", {
    pageTitle: "Change PWD"
  });
};

exports.getChangePassword = getChangePassword;

var postChangePassword =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res) {
    var _req$body3, oldPassword, newPassword, newPassword1;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$body3 = req.body, oldPassword = _req$body3.oldPassword, newPassword = _req$body3.newPassword, newPassword1 = _req$body3.newPassword1;
            _context7.prev = 1;

            if (!(newPassword !== newPassword1)) {
              _context7.next = 6;
              break;
            }

            res.status(400);
            res.redirect(_routes["default"].users + _routes["default"].changePassword);
            return _context7.abrupt("return");

          case 6:
            _context7.next = 8;
            return req.user.changePassword(oldPassword, newPassword);

          case 8:
            res.redirect(_routes["default"].me);
            return _context7.abrupt("return");

          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](1);
            res.redirect(_routes["default"].users + _routes["default"].changePassword);
            return _context7.abrupt("return");

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 12]]);
  }));

  return function postChangePassword(_x18, _x19) {
    return _ref7.apply(this, arguments);
  };
}();

exports.postChangePassword = postChangePassword;

var getAuth =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _User["default"].find({});

          case 2:
            user = _context8.sent;
            res.render("authPage", {
              user: user
            });

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getAuth(_x20, _x21) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getAuth = getAuth;

var postAuthApply =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(req, res) {
    var email;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            email = req.body.email;
            _context9.prev = 1;
            _context9.next = 4;
            return _User["default"].updateOne({
              email: email
            }, {
              $set: {
                authApply: true
              }
            });

          case 4:
            _context9.next = 9;
            break;

          case 6:
            _context9.prev = 6;
            _context9.t0 = _context9["catch"](1);
            console.log(_context9.t0);

          case 9:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 6]]);
  }));

  return function postAuthApply(_x22, _x23) {
    return _ref9.apply(this, arguments);
  };
}();

exports.postAuthApply = postAuthApply;