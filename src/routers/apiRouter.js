import express from "express";
import routes from "../routes";
import { registerView, postAddComment } from "../controllers/videoController";
import { postAuthApply } from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, registerView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.authApply, postAuthApply);
export default apiRouter;
