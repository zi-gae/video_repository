import passport from "passport";
import User from "./models/User";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import {
  githubLoginCallback,
  facebookLoginCallback
} from "./controllers/userController";
import routes from "./routes";
import dotenv from "dotenv";
dotenv.config();
passport.use(User.createStrategy());
//strategy: 로그인하는 방식
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `http://localhost:4000${routes.facebookCallback}`
    },
    facebookLoginCallback
  )
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//serializeUser: 어떤 정보를 쿠키에 주느냐, 사용자에 대해서 어떤 정보를 가질 수 있는지.
//deserializeUser: 쿠키의 정보를 어떻게 사용자로 전환하는가...? (잘 모르겠다)
