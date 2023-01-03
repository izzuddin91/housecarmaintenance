export const ENCODED_LOGIN_INFO = 'ENCODED_LOGIN_INFO';
export const USER_MANAGEMENT_SELECTED_USER_PROFILE = 'SELECTED_USER_PROFILE';
export const KEY_USER_PERMISSION_IDS = 'USER_PERMISSION_IDS';
export const KEY_USER_INFO = 'user';

export const save = (key: string, value: any) => {
  const str = JSON.stringify(value);
  sessionStorage.setItem(key, str);
};

export const retrieve = (key: string) => {
  const value = sessionStorage.getItem(key);
  return JSON.parse(value!);
};

export const remove = (key: string) => {
  const str = JSON.stringify(key);
  sessionStorage.removeItem(key);
};
