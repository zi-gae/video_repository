import routes from "./routes";
import multer from "multer";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "VideoPlayer";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: false,
    id: 1
  };
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
// single() => 하나의 파일만 업로드 할 수 있다는 함수
// 사용자가 전송한 데이터에서 파일이 포함 되어 있다면
// 파일을 가공해서 req.file 이라는 프로퍼티를 암시적으로 추가하는 미들웨어
// single 의 인자는 파일을 업로드 하는 input 의 name 값
