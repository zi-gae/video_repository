import express from "express"
import routes from "../routes"
import { home, search } from "../controllers/videoController";
import { getJoin, login, logout, postJoin, postLogin, getLogin } from "../controllers/userController";


const globalRouter = express.Router()

globalRouter.post(routes.join, postJoin)
globalRouter.get(routes.join, getJoin)

globalRouter.get(routes.login, getLogin)
globalRouter.post(routes.login, postLogin)

globalRouter.get(routes.home, home)

globalRouter.get(routes.logout, logout)
globalRouter.get(routes.search, search)


export default globalRouter