import server from '@/server';

/** 获取图形验证码 */
export async function getCaptcha() {
  return server.request({
    url: '/api/v1/captcha',
    method: 'get',
  });
}

/** 获取图形验证码 */
export async function login(data: User.LoginParams) {
  return server.request({
    url: '/api/v1/login',
    method: 'post',
    data,
  });
}

/** 获取个人信息 */
export async function getUserInfo() {
  return server.request({
    url: '/api/v1/getinfo',
    method: 'get',
  });
}

/** 退出登录 */
export async function logout() {
  return server.request({
    url: '/api/v1/logout',
    method: 'post',
  });
}
