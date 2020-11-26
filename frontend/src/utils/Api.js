class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _getResponseData(res, errorText) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`${errorText}: ${res.status}`));
  }

  getInitialUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res, 'Ошибка загрузки информации профиля');
    });
  }

  editUserInfo(name, about) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((res) => {
      return this._getResponseData(res, 'Ошибка редактирования профиля');
    });
  }

  editAvatar(avatar) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then((res) => {
      return this._getResponseData(res, 'Ошибка редактирования аватара');
    });
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res, 'Ошибка загрузки карточек с сервера');
    });
  }

  addNewCard(name, link) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => {
      return this._getResponseData(res, 'Ошибка добавления катрочки');
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res, 'Ошибка удаления катрочки');
    });
  }

  putLike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res, 'Ошибка');
    });
  }

  deleteLike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res, 'Ошибка');
    });
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-14/',
  headers: {
    authorization: 'f2667db3-62f1-4353-ba47-9cfe92bd36f8',
    'Content-Type': 'application/json'
  }
});

export default api;
