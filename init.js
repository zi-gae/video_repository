import app from "./app";
import "./db";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";
import "./models/Comment";
import "./models/User";
const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅Listening on : http//localhost${PORT}`);

app.listen(PORT, handleListening);

/* 
mongoDB manual
1.delete
  show dbs => oracel 에서의 계정 느낌 (여기서는 we-tube)
  use we-tube => we-tube 계정에 접속
  show collections => 테이블 목록
  db.videos.remove({}) 테이블 튜플?오브젝트?.. 삭제
*/

/*
npm install webpack 
npm install webpack-cli => webpack 을 terminal 에서 사용 할 수 있게 해줌
*/
