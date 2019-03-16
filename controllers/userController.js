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

export const githubLogin = passport.authenticate("github");
//passsport 의 GithubStrategy 실행

export const githubLoginCallback = async (_, __, profile, cb) => {
  //passport.authenticate("github"); 가 실행 되면 githubLoginCallback 가 실행됨
  const {
    _json: { id, avatar_url, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      (user.githubId = id), (user.avatarUrl = avatar_url), user.save();
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

export const postGithubLogin = (req, res) => {
  console.log("home 으로 이동");
  console.log(req.user);
  res.redirect(routes.home);
};

export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async (_, __, profile, done) => {
  const {
    _json: { id, properties, kaccount_email }
  } = profile;
  const { profile_image, nickname } = properties;
  try {
    const user = await User.findOne({ email: kaccount_email });
    if (user) {
      (user.kakaoId = id),
        (user.avatarUrl = profile_image),
        (user.name = nickname),
        user.save();
      done(null, user);
    } else {
      const newUser = await User.create({
        name: nickname,
        email: kaccount_email,
        avatarUrl: profile_image,
        kakaoId: id
      });
      done(null, newUser);
    }
  } catch (error) {
    done(error);
  }
};

export const postKakaoLogin = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  console.log(accessToken, refreshToken, profile, cb);
};

export const postFacebookLogin = () => {
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  console.log(req.user);
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    console.log("suc");
    const user = await User.findById(id);
    res.redirect(routes.users + routes.changePassword);
  } catch (error) {
    console.log("fail");

    res.redirect(routes.home);
  }
};
export const getEditProfile = (req, res) => {
  console.log(req.user);

  res.render("editProfile", { pageTitle: "Edit Profile" });
};

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl
    });
    res.redirect(routes.me);
  } catch (error) {
    console.log(error);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change PWD" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      console.log("fail");
      res.status(400);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    console.log("suc");
  } catch (error) {
    res.status(400);
    res.redirect(routes.users + routes.changePassword);
  }
};
