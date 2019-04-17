import express from "express";
import routes from "../routes";
import {
  videoDetail,
  deleteVideo,
  getUpload,
  postUpload,
  getEditVideo,
  postEditVideo
} from "../controllers/videoController";
import { uploadVideo, onlyPrivate, onlyAuthUser } from "../middlewares";

const videoRouter = express.Router();
// Upload
videoRouter.get(routes.upload, onlyPrivate, onlyAuthUser, getUpload);
videoRouter.post(
  routes.upload,
  onlyPrivate,
  uploadVideo,
  onlyAuthUser,
  postUpload
);
// 사용자가 post 방식으로 전송한 데이터가 routes.upload 방향을 가르킨다면 uploadVideo 실행 후 postUpload 실행

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

// Delete Video
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
