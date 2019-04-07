import mongoose from "mongoose";
import passportLocalMongose from "passport-local-mongoose";
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  authApply: Boolean,
  githubId: Number,
  kakaoId: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"
    }
  ]
});

UserSchema.plugin(passportLocalMongose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);
//collection 이름으로는 자동으로 users 가 되어서 들어감
export default model;
