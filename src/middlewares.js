import routes from "./routes";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-1"
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetube/video"
  })
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetube/avatar"
  })
});

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "VideoPlayer";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  // 로그인이 되어 있으면 가입 페이지로 가는것을 막음
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};
export const onlyPrivate = (req, res, next) => {
  // 로그인이 되어 있으면 가입 페이지로 가는것을 막음
  if (!req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyAdmin = (req, res, next) => {
  if (
    req.user.email === "doscm164@naver.com" ||
    req.user.email === "doscmDev@gmail.com"
  ) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const onlyAuthUser = (req, res, next) => {
  if (req.user.authApply) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

// single() => 하나의 파일만 업로드 할 수 있다는 함수
// 사용자가 전송한 데이터에서 파일이 포함 되어 있다면
// 파일을 가공해서 req.file 이라는 프로퍼티를 암시적으로 추가하는 미들웨어
// single 의 인자는 파일을 업로드 하는 input 의 name 값
