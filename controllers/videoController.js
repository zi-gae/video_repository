import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    // 데이터를 조회 할 때는 find() 메소드가 사용됩니다.
    // query를 파라미터 값으로 전달 할 수 있으며, 파라미터가 없을 시, 모든 데이터를 조회합니다.
    // 데이터베이스에 오류가 발생하면 HTTP Status 500 과 함께 에러를 출력합니다
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
    //데이터가 디비에 없을때
  }
};
export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
    res.render("search", {
      pageTitle: Video.title,
      searchingBy: searchingBy,
      videos
    });
  } catch (error) {
    console.log(error);
  }
  videos = await Video.find({ title: { $regex: searchingBy, $option: i } });
  res.render("search", {
    pageTitle: Video.title,
    searchingBy: searchingBy,
    videos
  });
};

// export const videos = (req, res) => res.render("videos", { pageTitle: "Videos" })
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path } // req.file 에 업로드 하려는 파일의 정보가 담겨 있음.
  } = req;
  const newVideo = await Video.create({
    // 디비에 저장하는 부분
    fileUrl: path,
    title: title,
    description: description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  console.log();
  res.redirect(routes.videoDetail(newVideo.id)); // mongodb 는 item 을 저장 할 때 마다 id 값이 default 로 들어감
};

export const videoDetail = async (req, res) => {
  try {
    const {
      params: { id }
    } = req; //id => router 에서 명시해준 name
    const video = await Video.findById(id).populate("creator");
    //populate => type 이 objectID 인 것에만 사용 가능
    console.log(video);
    res.render("videoDetail", { pageTitle: video.title, video: video });
  } catch (error) {
    console.log(`error: ${error}`);
    res.redirect(routes.home);
  }
};
export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);

    console.log(video);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.render(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    body: { title, description },
    params: { id }
  } = req;
  try {
    await Video.findOneAndUpdate(id, {
      title: title,
      description: description
    }); // findOneAndUpdate(index, object) change tuple
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    await Video.findOneAndDelete({ _id: id });
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect(routes.home);
  }
};
