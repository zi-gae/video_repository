import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400); // 정보가 잘못됬다는 state code http 400
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      //register: 새 사용자 인스턴스를 주어진 암호로 등록하는 편리한 방법입니다.(passport local mongoose 에서 제공)
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  //passport.authenticate("github"); 가 실행 되면 githubLoginCallback 가 실행됨
  const {
    _json: { id, avatar_url, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
      //user 정보를 세션에 저장
    }
    const newUser = await User.create({
      name: name,
      email: email,
      avatarUrl: avatar_url,
      githubId: id
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const githubLogin = passport.authenticate("github");
//passsport 의 GithubStrategy 실행

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change PWD" });
