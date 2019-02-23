const path = require("path"); // nodejs 에 기본적으로 있는 패키지
// 파일과 디렉토리의 경로를 absolute 로 만들 수 있음

const ExtractCSS = require("extract-text-webpack-plugin");

const autoprefixer = require("autoprefixer");
//
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
  entry: ["@babel/polyfill", ENTRY_FILE], // file 이 어디서 왔는가
  module: {
    // module 을 만나면 아래 룰을 실행
    rules: [
      {
        test: /\.(js)$/,
        use: [{ loader: "babel-loader" }]
      },
      {
        // scss 로 끝나는 파일을 만나게 되면 extract plugin 사용
        /* 
          extract 는 안쪽부터 실행하게 된다.
          'sass-loader' changes the 'scss' or 'sass' file to 'css'.
          'postcss-loader' converts to 'css' for plugin.
          'css-loader' allows 'webpack' to understand 'css'.
        */
        test: /\.(scss)$/,
        use: ExtractCSS.extract([
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              plugin() {
                return [autoprefixer({ browsers: "cover 99.5" })];
                //시중에 99.5% 의 브라우저와 호환
              }
            }
          },
          {
            loader: "sass-loader"
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_FILE,
    filename: "[name].js" // 작성될 파일의 이름
  }, // entry 에서 온 file 을 어디에 넣을 것인가 => path를 절대경로로 줘야함
  plugins: [new ExtractCSS("style.css")]
};
module.exports = config;
