const axios = require('axios');

module.exports = axios.create({
  baseURL: process.env.WEB_API_URL,
  headers: {
    authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYTdiODIyNmY1ZjM5N2MzMjFhYjZhZSIsIm5hbWUiOiJHcmF5ZmllbGQiLCJlbWFpbCI6ImdyYXlmaWVsZEBtYWlsLmNvbSIsImlhdCI6MTUzNzkyMzUyNX0.IjLGgIFLanXRD8DMVeT_roaT-U56xOvdg28gpzpb4dk'
  }
});
