import express from "express";
import routes from "../routes";
import passport from "passport";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  logout,
  postJoin,
  postLogin,
  getLogin,
  githubLogin,
  postGithubLogin,
  getMe,
  kakaoLogin,
  postKakaoLogin,
  getAuth
} from "../controllers/userController";
import { onlyPublic, onlyAdmin, onlyAuthUser } from "../middlewares";

const globalRouter = express.Router();

globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
globalRouter.get(routes.join, onlyPublic, getJoin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);

globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, onlyAuthUser, search);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: routes.login }),
  postGithubLogin
);

globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", {
    failureRedirect: routes.login
  }),
  postKakaoLogin
);

globalRouter.get(routes.me, getMe);

globalRouter.get(routes.auth, onlyAdmin, getAuth);

export default globalRouter;
