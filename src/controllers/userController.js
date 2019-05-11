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
    res.rendser("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
        avatarUrl: "../img/defaultProfile.png",
        authApply: false
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
    avatar_url ? avatar_url : (avatar_url = "../img/defaultProfile.png");
    if (email === null || name === null) {
      throw error();
    }
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
      githubId: id,
      authApply: false
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async (_, __, profile, done) => {
  const {
    _json: { id, properties, kaccount_email }
  } = profile;
  const { profile_image, nickname } = properties;
  try {
    profile_image
      ? profile_image
      : (profile_image = "../img/defaultProfile.png");
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
        kakaoId: id,
        authApply: false
      });
      done(null, newUser);
    }
  } catch (error) {
    console.log(error);
    done(error);
  }
};

export const postKakaoLogin = (req, res) => {
  res.redirect(routes.home);
};

export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).populate("videos");
  res.render("userDetail", { pageTitle: "User Detail", user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    if (req.user.id === id) res.redirect(routes.me);
    else res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const getEditProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "Edit Profile", user: req.user });
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
      avatarUrl: file ? file.location : req.user.avatarUrl
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
      res.status(400);
      res.redirect(routes.users + routes.changePassword);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
    return;
  } catch (error) {
    res.redirect(routes.users + routes.changePassword);
    return;
  }
};

export const getAuth = async (req, res) => {
  const user = await User.find({});
  res.render("authPage", { user: user });
};

export const postAuthApply = async (req, res) => {
  const {
    body: { email }
  } = req;
  try {
    const user = await User.findOne({ email });
    user.authApply
      ? await User.updateOne({ email }, { $set: { authApply: false } })
      : await User.updateOne({ email }, { $set: { authApply: true } });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
