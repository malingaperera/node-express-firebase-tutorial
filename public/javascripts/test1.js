function update_user() {
  axios({
    method: "put",
    url: "/users/1",
    data: {
      firstName: "test1"
    }
  });
}

function update_user_id() {
  setCookie("userId", 2);
  document.getElementById("userId").innerHTML = getCookie("userId");
}

function delete_user_id() {
  deleteCookie("userId");
  document.getElementById("userId").innerHTML = getCookie("userId");
}

document.getElementById("userId").innerHTML = getCookie("userId");
