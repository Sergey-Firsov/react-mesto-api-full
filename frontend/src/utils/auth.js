import ROUTES_MAP from './routesMap.js';

function getResponseData(res, errorText) {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`${res.status}: ${errorText}`));
}

const register = (email, password) => {
  return fetch(`${ROUTES_MAP.BASE_URL}signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then((res) => {
    return getResponseData(res, 'некорректно заполнено одно из полей');
  })
}

const authorize = (email, password) => {
  return fetch(`${ROUTES_MAP.BASE_URL}signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then((res) => {
    return getResponseData(res, 'не передано одно из полей');
  })
}

const getUserData = (token) => {
  return fetch(`${ROUTES_MAP.BASE_URL}users/me`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
  .then((res) => {
    return getResponseData(res, 'Токен не передан или передан не в том формате');
  })
}

export { register, authorize, getUserData };
