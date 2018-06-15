import axios from "axios";
import qs from "qs";
// import common from "./../common";

axios.defaults.baseURL = "/";

const transformRequest = [
  function(data) {
    data = qs.stringify(
      // Object.assign({}, data, {
      //   __mortals_token__: common.docCookies.getItem("__mortals_token__")
      // }),
      // { allowDots: true }
        Object.assign({}, data),
    );
    return data;
  }
];

const request = (method, url, data = {}) => {
  const option = {
    method,
    url,
    data,
    transformRequest
  };
  return new Promise((resolve, reject) => {
    axios(option)
      .then(response => {
        console.log('response', response)
        const { code, data, msg } = response.data;

        if (code === 1) {
          return resolve({
            data,
            msg
          });
        }
        reject({ code, msg });
      })
      .catch(err => {
        if (err.response.status === 403) {
          // const from = `${location.hash.replace("#", "")}`;
          // return window.location.href = `${location.origin}/#/login?from=${from}`;
        }
        reject(err);
      });
  });
};

request.get = url => request("get", url);
request.post = (url, data) => request("post", url, data);
request.put = (url, data) => request("put", url, data);
request.delete = (url, data) => request("delete", url, data);
request.patch = (url, data) => request("patch", url, data);

export default request;
