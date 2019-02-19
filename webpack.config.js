const path = require("path"); // nodejs 에 기본적으로 있는 패키지
// 파일과 디렉토리의 경로를 absolute 로 만들 수 있음

const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
// 현재폴더/assets/js/main.js 에서부터 불러옴

const OUTPUT_FILE = path.join(__dirname, "static");
// 현재폴더/static 에 넣음

/*
join vs resolve
join 은 왼쪽에서부터 경로를 합처 나가며 경로를 문자열로 리턴 .. 을 만나면 왼쪽의 경로 하나는 무시 된다.
resolve 는 오른쪽에서부터 경로를 합처 나가며 경로를 문자열로 리턴 / 을 만나면 절대 경로로 인식해 이후 왼쪽의 경로는 무시 된다.
*/

const config = {
  entry: ENTRY_FILE, // file 이 어디서 왔는가
  output: {
    path: OUTPUT_FILE,
    filename: "[name].[format]" // 작성될 파일의 이름
  } // entry 에서 온 file 을 어디에 넣을 것인가 => path를 절대경로로 줘야함
};
module.exports = config;
