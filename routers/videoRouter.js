import express from "express"
import routes from "../routes"
const videoRouter = express.Router()


videoRouter.get(routes.videos, (req, res) => send("VIDEOS"))
videoRouter.get(routes.upload, (req, res) => send("UPLOAD"))
videoRouter.get(routes.videoDetail, (req, res) => send("VIDEO_DETAIL"))
videoRouter.get(routes.editVideo, (req, res) => send("EDIT_VIDEO"))
videoRouter.get(routes.deleteVideo, (req, res) => send("DELETE_VIDEO"))


export default videoRouter