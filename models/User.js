import mongoose from "mongoose";
import passportLocalMongose from "passport-local-mongoose";
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  authApply: Boolean,
  facebookId: Number,
  githubId: Number
});

UserSchema.plugin(passportLocalMongose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);
//collection 이름으로는 자동으로 users 가 되어서 들어감
export default model;
