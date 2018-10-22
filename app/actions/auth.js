import { NavigationActions } from 'react-navigation';
import * as types from './types';
import api from '../lib/api';
import * as client from '../models/client';

const resetToMain = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Splash' }),
  ],
});

export function login(email, password) {
  return dispatch => api('post', '/client/auth?permanent=true', { username: email, password })
    .then((res) => {
      if (res.data) {
        client.setToken(res.data.token, 'user');
        return dispatch(resetToMain);
      }
      return null;
    });
}

export function loginHiring(email, password) {
  return dispatch => api('post', '/company/auth?permanent=true', { username: email, password })
    .then((res) => {
      if (res.data.token) {
        client.setToken(res.data.token, 'company');
        return dispatch(resetToMain);
      }
      return null;
    });
}

export function fbLogin(fbToken) {
  return dispatch =>
    api('post', '/client/auth/facebook', null, { Authorization: `Bearer ${fbToken}` })
    .then((res) => {
      if (res.data.token) {
        client.setToken(res.data.token, 'user');
        return dispatch(resetToMain);
      }
      return null;
    });
}

export function changePassword(password) {
  return (dispatch, getState) =>
    api('post', '/client/auth/password',
    { password }, { Authorization: `Bearer ${getState().token}` })
    .then((res) => {
      if (res.data) {
        return dispatch(NavigationActions.back());
      }
      return null;
    });
}

export function logout() {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Login' }),
    ],
  });

  return (dispatch, getState) => {
    client.removeToken(null);
    api('post', '/client/logout', null, { Authorization: getState().refreshToken })
    .then(() => dispatch(resetAction))
    .catch((e) => {
      console.tron.error({ action: 'logout', error: e });
      return dispatch(resetAction);
    });
  };
}

export function token(t) {
  return {
    type: types.TOKEN,
    token: t,
  };
}

export function register({ firstName, lastName, email, password }) {
  return () => api('post', '/register', {
    firstName,
    lastName,
    email,
    password,
  });
}

export function registerHiring({ identity, name, email, password }) {
  const data = new FormData();
  data.append('picture', { uri: identity.uri, name: identity.fileName, type: identity.type });
  data.append('name', name);
  data.append('email', email);
  data.append('password', password);
  return () => api('post', '/company/register',
    data,
    { 'Content-Type': 'multipart/form-data' });
}
