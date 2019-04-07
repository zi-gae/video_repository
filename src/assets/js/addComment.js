import axios from "axios";

const addCommentForm = document.getElementById("jsAddcomment");

const init = () => {
  addCommentForm.addEventListener("submit", handleSubmit);
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  if (response.status === 200) {
    window.location.reload();
    await scrollTo(0, 0);
  }
};
const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

if (addCommentForm) {
  init();
}
