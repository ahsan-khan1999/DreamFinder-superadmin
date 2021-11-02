/* eslint-disable */
import localStore from './localstore.util';
import { updateHeaders } from '../services/HttpProvider';

export const getToken = () => localStore.get_data('token');

export const setToken = (token) => localStore.store_data('token', token);

export const getUser = () => localStore.get_data('user');

export const saveUser = (user) => localStore.store_data('user', user);
export const searchArray = (data, keyword) => {
  const result = [];

  data.forEach((item) => {
    let matched = false;
    Object.keys(item).forEach((key) => {
      if (
        item &&
        typeof item[key] == 'string' &&
        item[key]?.toLowerCase().match(keyword.toLowerCase())
      ) {
        matched = true;
      }
    });

    if (matched) result.push(item);
  });

  // console.log(result);
  return result;
};
/* eslint-disable */
export const logout = async () => {
  await localStore.remove_data('token');
  await localStore.remove_data('user');
  await updateHeaders();
  return true;
};
export const Check_Authentication = async (response,history) => {
  if (response?.data?.response_code === 401) {
    history.push('/user/login');
  }
};

class Auth {
  constructor() {
    this.user = {};
  }

  async setUserFromLocal() {
    const user = await getToken();
    this.user = user ? user : {};
  }

  set setUser(user) {
    this.user = user;
  }

  get getUser() {
    return this.user;
  }

  async logout() {
    await logout();
    this.user = {};
  }
}

export const authClass = new Auth();
