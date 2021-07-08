export const parseErrorMessage = function(error) {
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.message &&
    error.response.data.status == 0
  ) {
    if (error.response.data.data) {
      let _error = error.response.data.message;
      _error += "\n";
      error.response.data.data.forEach((element) => {
        _error += element.param + ": " + element.msg;
        _error += "\n";
      });
      return _error;
    } else {
      return error.response.data.message;
    }
  } else {
    return "somthing went wrong";
  }
};

export const setCookie = function(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
export const getCookie = function(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export default {
  getCookie,
  setCookie,
  parseErrorMessage,
};
