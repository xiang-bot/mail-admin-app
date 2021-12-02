// 对于用户的接口管理
import axios from '@/axios';

export default {
  login(params) {
    return axios.post('/passport/login', params);
  },
  logon(params) {
    return axios.post('/passport/logon', params);
  },
};
