import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";
const app = express();

app.set("view engine", "pug"); // view engine을 pug로 사용
app.use(cookieParser());
app.use(bodyParser.json()); // post 방식으로 넘어가는 데이터 json 타입으로 받아옴
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // 접근 방법 및 접근하는데 걸린시간 console 에 나타냄
app.use(helmet()); // 보안 관련 middleware
app.use("/uploads", express.static("uploads")); // /uploads 경로에서 uploads 라는 폴더에 있는 파일을 제공 할 수 있다.
app.use("/static", express.static("static"));
// express.static() => 주어진 directory 에서 file을 보내주는 middleware
app.use(localsMiddleware);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
