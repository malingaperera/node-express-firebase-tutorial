/**
 * Get a cookie by giving the name
 * @param {String} cname
 * @returns String, Cookie value
 */
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/**
 * Create a new cookie or overwrite a existing one given the name
 * @param {String} cname Name of the cookie
 * @param {String} cvalue Cookie value
 * @param {Number} exdays number of days till expire
 */
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Deletes the cookie with the given name
 * @param {String} cname name of the cookie we need to remove
 */
function deleteCookie(cname) {
  var d = new Date();
  //   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + "Thu, 01 Jan 1970 00:00:01 GMT";
  document.cookie = cname + "=" + getCookie(cname) + ";" + expires + ";path=/";
}
