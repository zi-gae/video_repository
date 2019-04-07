"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postAddComment = exports.registerView = exports.deleteVideo = exports.postEditVideo = exports.getEditVideo = exports.videoDetail = exports.postUpload = exports.getUpload = exports.search = exports.home = void 0;

var _routes = _interopRequireDefault(require("../routes"));

var _Video = _interopRequireDefault(require("../models/Video"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var home =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var videos;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Video["default"].find({});

          case 3:
            videos = _context.sent;

            // 데이터를 조회 할 때는 find() 메소드가 사용됩니다.
            // query를 파라미터 값으로 전달 할 수 있으며, 파라미터가 없을 시, 모든 데이터를 조회합니다.
            // 데이터베이스에 오류가 발생하면 HTTP Status 500 과 함께 에러를 출력합니다
            if (req.user.authApply) {
              res.render("home", {
                pageTitle: "Home",
                videos: videos
              });
            } else {
              res.render("notFoundPage");
            }

            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.render("notFoundPage"); //데이터가 디비에 없을때

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.home = home;

var search =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var searchingBy, videos;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            searchingBy = req.query.term;
            videos = [];
            _context2.prev = 2;
            _context2.next = 5;
            return _Video["default"].find({
              title: {
                $regex: searchingBy,
                $options: "i"
              }
            });

          case 5:
            videos = _context2.sent;
            res.render("search", {
              pageTitle: _Video["default"].title,
              searchingBy: searchingBy,
              videos: videos
            });
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);

          case 12:
            _context2.next = 14;
            return _Video["default"].find({
              title: {
                $regex: searchingBy,
                $option: i
              }
            });

          case 14:
            videos = _context2.sent;
            res.render("search", {
              pageTitle: _Video["default"].title,
              searchingBy: searchingBy,
              videos: videos
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 9]]);
  }));

  return function search(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // export const videos = (req, res) => res.render("videos", { pageTitle: "Videos" })


exports.search = search;

var getUpload = function getUpload(req, res) {
  return res.render("upload", {
    pageTitle: "Upload"
  });
};

exports.getUpload = getUpload;

var postUpload =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, title, description, location, newVideo;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, description = _req$body.description, location = req.file.location; //multer 가 로컬 서버에 저장할때는 path가 필요하지만 외부 서버에 저장할때는 location 이 필요

            _context3.next = 3;
            return _Video["default"].create({
              // 디비에 저장하는 부분
              fileUrl: location,
              title: title,
              description: description,
              creator: req.user.id
            });

          case 3:
            newVideo = _context3.sent;
            req.user.videos.push(newVideo.id);
            req.user.save();
            res.redirect(_routes["default"].videoDetail(newVideo.id)); // mongodb 는 item 을 저장 할 때 마다 id 값이 default 로 들어감

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function postUpload(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postUpload = postUpload;

var videoDetail =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id; //id => router 에서 명시해준 name

            _context4.next = 4;
            return _Video["default"].findById(id).populate("creator").populate("comments");

          case 4:
            video = _context4.sent;
            //populate => type 이 objectID 인 것에만 사용 가능
            res.render("videoDetail", {
              pageTitle: video.title,
              video: video
            });
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            res.redirect(_routes["default"].home);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 8]]);
  }));

  return function videoDetail(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.videoDetail = videoDetail;

var getEditVideo =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _Video["default"].findById(id).populate("creator");

          case 4:
            video = _context5.sent;

            if (!(req.user.id !== video.creator.id)) {
              _context5.next = 9;
              break;
            }

            throw Error();

          case 9:
            res.render("editVideo", {
              pageTitle: "Edit ".concat(video.title),
              video: video
            });

          case 10:
            _context5.next = 15;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            res.redirect(_routes["default"].home);

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 12]]);
  }));

  return function getEditVideo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getEditVideo = getEditVideo;

var postEditVideo =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$body2, title, description, id;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, id = req.params.id;
            _context6.prev = 1;
            _context6.next = 4;
            return _Video["default"].findOneAndUpdate(id, {
              title: title,
              description: description
            });

          case 4:
            // findOneAndUpdate(index, object) change tuple
            res.redirect(_routes["default"].videoDetail(id));
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](1);
            res.redirect(_routes["default"].home);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 7]]);
  }));

  return function postEditVideo(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.postEditVideo = postEditVideo;

var deleteVideo =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.prev = 1;
            _context7.next = 4;
            return _Video["default"].findById(id).populate("creator");

          case 4:
            video = _context7.sent;

            if (!(req.user.id !== video.creator.id)) {
              _context7.next = 9;
              break;
            }

            throw Error();

          case 9:
            _context7.next = 11;
            return _Video["default"].findOneAndDelete({
              _id: id
            });

          case 11:
            _context7.next = 16;
            break;

          case 13:
            _context7.prev = 13;
            _context7.t0 = _context7["catch"](1);
            console.log(_context7.t0);

          case 16:
            _context7.prev = 16;
            res.redirect(_routes["default"].home);
            return _context7.finish(16);

          case 19:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 13, 16, 19]]);
  }));

  return function deleteVideo(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}(); //RegisterView


exports.deleteVideo = deleteVideo;

var registerView =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id;
            _context8.prev = 1;
            _context8.next = 4;
            return _Video["default"].findById(id);

          case 4:
            video = _context8.sent;
            video.views += 1;
            video.save();
            res.status(200);
            _context8.next = 13;
            break;

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](1);
            res.status(400);

          case 13:
            _context8.prev = 13;
            res.end();
            return _context8.finish(13);

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 10, 13, 16]]);
  }));

  return function registerView(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.registerView = registerView;

var postAddComment =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(req, res) {
    var id, comment, user, video, newComment;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            id = req.params.id, comment = req.body.comment, user = req.user;
            _context9.prev = 1;
            _context9.next = 4;
            return _Video["default"].findById(id);

          case 4:
            video = _context9.sent;
            _context9.next = 7;
            return _Comment["default"].create({
              text: comment,
              creator: user.id,
              name: user.name,
              avatarUrl: user.avatarUrl,
              id: user.id
            });

          case 7:
            newComment = _context9.sent;
            video.comments.push(newComment.id);
            video.save();
            res.status(200);
            _context9.next = 16;
            break;

          case 13:
            _context9.prev = 13;
            _context9.t0 = _context9["catch"](1);
            res.status(400);

          case 16:
            _context9.prev = 16;
            res.end();
            return _context9.finish(16);

          case 19:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 13, 16, 19]]);
  }));

  return function postAddComment(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.postAddComment = postAddComment;