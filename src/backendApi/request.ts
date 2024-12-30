import axios, {  AxiosResponse } from "axios";

const request = axios.create({
  baseURL: 'https://www.gamecoca.icu/',
  timeout: 300000,
});

request.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers['Content-Type'] = 'application/json';
      // config.headers['Authorization'] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjU0MzQyMTQsImlhdCI6MTczMzg5ODIxNCwibG9naW5UeXBlIjoiZW1haWwiLCJ1aWQiOjQsInVzZXJUeXBlIjoyfQ.E6w6LEMKrT-ut7YN3TMTK9LnMpvoGIZ-NcrJ51JQM9E`;
      config.headers['Authorization'] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjY2NTAxNTAsImlhdCI6MTczNTExNDE1MCwibG9naW5UeXBlIjoiZW1haWwiLCJ1aWQiOjQsInVzZXJUeXBlIjoyfQ.UYy5oZDzwKwPmlSaTy5ip3ud6qaIQojyDFeRn9L_L6g`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status === 200) {
      return res.data;
    } else {
      return Promise.reject(res);
    }
  },
  (err) => {
    console.log('接口出错', err);
    // ElMessage.error("接口出错");
    // router.push({
    //   path: '/login'
    // })
    return Promise.reject(err);
  }
);

export default request; 