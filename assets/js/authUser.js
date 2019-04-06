import axios from "axios";

let i = 0;
const buttonAuth = new Array();
const emails = new Array();
let temp = 0;

const init = () => {
  while (true) {
    if (!document.getElementById(`${i}`)) {
      temp++;
      i++;
      emails[i] = null;
      buttonAuth[i] = null;
      if (temp === 2) break;
    }
    emails[i] = document.getElementById(`jsEmail${i}`).innerHTML;
    buttonAuth[i] = document.getElementById(`${i}`);
    buttonAuth[i].addEventListener("click", () => {
      handleAuthClick(emails[i]);
    });
    i++;
  }
};
const handleAuthClick = async () => {
  const index = event.target.id * 1;
  const email = emails[index].split("<span>")[0];
  console.log(email);
  const response = await axios({
    url: `/api/${email}/auth`,
    method: "POST",
    data: {
      email
    }
  });
  if (response.status === 200) {
    window.location.reload();
  }
};
if (document.getElementById("0")) {
  init();
}
