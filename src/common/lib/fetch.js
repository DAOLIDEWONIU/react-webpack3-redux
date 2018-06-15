import axios from 'axios';
import qs from 'qs';

const fetch = (method, url, data, config = {}) => {
    /**
     * Object.assign 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
     */
    const options = Object.assign({}, config, {
        url,
        method,
        data: qs.stringify(data),
        timeout: 10000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        baseURL: 'http://39.104.116.109',
    });
    console.log('options', options);
    return new Promise((resolve, reject) => {
        axios(options).then(response => {
            const { code, data, msg } = response.data;
            if(code === "30001"){
                resolve({
                    data,
                    msg
                })
            }
            reject({ code, msg });
        }).catch(error => {
            reject(err);
        })
    })
}

fetch.get = url => fetch("get", url);
fetch.post = (url, data) => fetch("post", url, data);
fetch.put = (url, data) => fetch("put", url, data);
fetch.delete = (url, data) => fetch("delete", url, data);
fetch.patch = (url, data) => fetch("patch", url, data);

export default fetch;