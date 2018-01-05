export const header = {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
};
export const timeout = 30000;
export const SUCCESS_CODE = 0;
export const TOKEN_ERROR = {
    code: 422,
    message: '登录超时，请重新登录。'
};
export const COMMON_ERROR_TOAST = '获取数据失败';
