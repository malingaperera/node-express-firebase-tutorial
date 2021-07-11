function update_user() {
  axios({
    method: "put",
    url: "/users/1",
    data: {
      firstName: "test1"
    }
  });
}
