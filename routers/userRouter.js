import express from "express"
import routes from "../routes"
const userRouter = express.Router()


userRouter.get(routes.users, (req, res) => send("Users"))
userRouter.get(routes.userDetail, (req, res) => send("USER_DETAIL"))
userRouter.get(routes.editProfile, (req, res) => send("EDIT_PROFILE"))
userRouter.get(routes.changePassword, (req, res) => send("CHANGE_PASSWORD"))


export default userRouter