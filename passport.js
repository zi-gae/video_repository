import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());
//strategy: 로그인하는 방식

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//serializeUser: 어떤 정보를 쿠키에 주느냐, 사용자에 대해서 어떤 정보를 가질 수 있는지.
//deserializeUser: 쿠키의 정보를 어떻게 사용자로 전환하는가...? (잘 모르겠다)
