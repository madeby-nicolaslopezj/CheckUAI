import store from 'react-native-simple-store';

var defaultAppToken = '';
var defaultBaseUrl = 'http://webapi.uai.cl/';
if (__DEV__) {
  defaultBaseUrl = 'http://webapitest.uai.cl/';
}

export const getSetting = async function(name) {
  const value = await store.get(name);
  if (!value) {
    if (name == 'token') {
      return defaultAppToken;
    } else if (name == 'apiUrl') {
      return defaultBaseUrl;
    } else {
      return null;
    }
  }
  return value;
}

export const setSetting = async function(name, value) {
  return await store.save(name, value);
}
