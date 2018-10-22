import { AsyncStorage } from 'react-native';
import api from '../lib/api';

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('client.accessToken');
    const refreshToken = await AsyncStorage.getItem('client.refreshToken');
    const type = await AsyncStorage.getItem('client.type');

    if (token === null) {
      return {};
    }

    // test access token
    const res = await api('get', '/client/me', null, { Authorization: `Bearer ${token}` });
    if (res.status !== 200) {
      const res2 = await api('get', '/client/token', { refreshToken });
      if (res2.status === 200) {
        setToken(res.token, type);
      } else {
        return {};
      }
    }

    return {
      token,
      type,
    };
  } catch (error) {
    console.tron.error(error);
  }

  return {};
};

const setToken = async (token, type) => {
  try {
    await AsyncStorage.setItem('client.accessToken', token.accessToken);
    await AsyncStorage.setItem('client.refreshToken', token.refreshToken);
    await AsyncStorage.setItem('client.type', type);
  } catch (error) {
    console.tron.error(error);
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('client.accessToken');
    await AsyncStorage.removeItem('client.refreshToken');
    await AsyncStorage.removeItem('client.type');
  } catch (error) {
    console.tron.error(error);
  }
};

export {
  getToken,
  setToken,
  removeToken,
};
