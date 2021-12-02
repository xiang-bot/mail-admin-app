import Cookies from 'js-cookie';

export function setCookie(info) {
  // 这里的info就是你的vuex里的数据;
  const arr = Object.entries(info);
  for (let i = 0; i < arr.length; i += 1) {
    Cookies.set(arr[i][0], arr[i][1]);
    // 这里的set是添加
  }
  return true;
}

export function getUserCookie() {
// 这里的get是取值
  return {
    username: Cookies.get('username'),
    appkey: Cookies.get('appkey'),
    role: Cookies.get('role'),
    email: Cookies.get('email'),
  };
}

export function removeUserCookie() {
  Cookies.remove('username');
  Cookies.remove('appkey');
  Cookies.remove('role');
  Cookies.remove('email');
  return true;
}
