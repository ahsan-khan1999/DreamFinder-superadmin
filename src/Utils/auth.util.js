/* eslint-disable */
import localStore from './localstore.util';
import { updateHeaders } from '../services/HttpProvider';
import { NotificationManager } from 'components/common/react-notifications';

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

export const mySearch = (data, keyword) => {
  let finalResult = [];
  data.forEach((item) => {
    console.log(item?.name,"name");
    if (item.name.toLowerCase().indexOf(keyword) !== -1) {
      finalResult.push(item);
    }
  });
  return finalResult;
};
/* eslint-disable */
export const logout = async () => {
  await localStore.remove_data('token');
  await localStore.remove_data('user');
  await updateHeaders();
  return true;
};
export const Check_Authentication = async (response) => {
  if (response?.data?.response_code === 401) {
    NotificationManager.error('Authentication Failed', 'Error', 5000, null, '');
    setTimeout(() => {
      logout();
      window.location.href = '/';
    }, 2000);
  }
};

export const Check_Validation = async (response) => {
  if (response?.data?.response_code === 4003) {
    response?.data?.response_data?.map((item) => {
      NotificationManager.error(Object.values(item), 'Error', 5000, null, '');
    });
  } else {
    NotificationManager.error(
      response?.data?.response_message,
      'Error',
      5000,
      null,
      ''
    );
  }
};

export const Check_Validation_Update = async (response) => {
  if (response?.response_code === 4003) {
    response?.response_data?.map((item) => {
      NotificationManager.error(Object.values(item), 'Error', 5000, null, '');
    });
  } else {
    NotificationManager.error(
      response?.response_message,
      'Error',
      5000,
      null,
      ''
    );
  }
};
export function testSearch(arrayOfAllObjects, searchText) {
  let arrayOfMatchedObjects = arrayOfAllObjects.filter((object) => {
    return JSON.stringify(object).toString().toLowerCase().includes(searchText.toLowerCase());
  });
  return arrayOfMatchedObjects;
}

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
