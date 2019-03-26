import express from "express";
import routes from "../routes";
import { registerView, postAddCommnent } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, registerView);
apiRouter.post(routes.addComment, postAddCommnent);
export default apiRouter;
