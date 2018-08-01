import axios from 'axios'

const BASE_URL = 'https://test3offline.566560.com'//请求地址

const filter = (str) => { // 特殊字符转义
  str += '' // 隐式转换
  str = str.replace(/%/g, '%25')
  str = str.replace(/\+/g, '%2B')
  str = str.replace(/ /g, '%20')
  str = str.replace(/\//g, '%2F')
  str = str.replace(/\?/g, '%3F')
  str = str.replace(/&/g, '%26')
  str = str.replace(/=/g, '%3D')
  str = str.replace(/#/g, '%23')
  return str
}

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
});

export function asyncTool(url, data, type = 'post') {
  data = JSON.stringify(data)
  return instance({
    url: url,
    method: type,
    data: filter(data)
  });
}