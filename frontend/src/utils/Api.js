class Api {
  constructor({url}) {
    this._url = url;
  }

  _getResponseData(res, errorText) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`${errorText}: ${res.status}`));
  }

  getInitialUserInfo(token) {
    return fetch(`${this._url}users/me`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res) => {
      return this._getResponseData(res, 'Ошибка загрузки информации профиля');
    });
  }

  editUserInfo(name, about, token) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((res) => {
      return this._getResponseData(res, 'Ошибка редактирования профиля');
    });
  }

  editAvatar(avatar, token) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then((res) => {
      return this._getResponseData(res, 'Ошибка редактирования аватара');
    });
  }

  getInitialCards(token) {
    return fetch(`${this._url}cards`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res) => {
      return this._getResponseData(res, 'Ошибка загрузки карточек с сервера');
    });
  }

  addNewCard(name, link, token) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => {
      return this._getResponseData(res, 'Ошибка добавления катрочки');
    });
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res) => {
      return this._getResponseData(res, 'Ошибка удаления катрочки');
    });
  }

  putLike(cardId, token) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res) => {
      return this._getResponseData(res, 'Ошибка');
    });
  }

  deleteLike(cardId, token) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
    .then((res) => {
      return this._getResponseData(res, 'Ошибка');
    });
  }
}

const api = new Api({
  url: 'http://localhost:3000/'
});

export default api;
