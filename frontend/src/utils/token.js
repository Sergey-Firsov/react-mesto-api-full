const TOKEN_KEY = 'token';

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function removeToken() {
  return localStorage.removeItem(TOKEN_KEY);
}

export { setToken, getToken, removeToken };
