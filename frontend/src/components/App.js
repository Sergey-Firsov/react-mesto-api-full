import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header.js';
import MainPage from './MainPage.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRout.js';
import Login from './Login.js';
import Register from './Register.js';
import PageNotFound from './PageNotFound.js';
import * as auth from '../utils/auth.js';
import { setToken, getToken, removeToken } from '../utils/token.js';
import ROUTES_MAP from '../utils/routesMap.js';
import api from '../utils/Api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isDeletingCardPopupOpen, setDeletingCardPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [registrationStatus, setRegistrationStatus] = React.useState(false);
  const [userData, setUserData] = React.useState({
    loggedIn: false,
    email: ''
  });
  const [deletedСard, setDeletedСard] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const history = useHistory();

  React.useEffect(tokenCheck, []);

  React.useEffect(() => {
    Promise.all([
      api.getInitialUserInfo(),

      api.getInitialCards()
    ])
    .then(([ userData, cards ]) => {
      setCurrentUser(userData);

      setCards(cards);
    })
    .catch((error) => {
      alert(error);
    });
  }, []);

  function tokenCheck() {
    const token = getToken();

    if (!token) {
      return;
    }

    auth.getUserData(token)
    .then((data) => {
      setUserData({
        loggedIn: true,
        email: data.data.email
      })

      history.push(ROUTES_MAP.MAIN);
    })
    .catch((err) => alert(err));
  }

  function handleRegister(email, password, resetingForm) {
    auth.register(email, password)
    .then((res) => {

      if(res.data._id) {
        setRegistrationStatus(true);

        history.push(ROUTES_MAP.SIGN_IN);
      } else {
        return;
      }
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setInfoTooltipOpen(true)

      resetingForm();
    });
  }

  function handleLogin(email, password, resetingForm) {

    auth.authorize(email, password)
    .then((res) => {

      if(res.token) {
        setToken(res.token);

        tokenCheck();

      } else {
        return;
      }
    })
    .catch((err) => alert(err))
    .finally(() => resetingForm());
  }

  function signOut(){
    setUserData({
      loggedIn: false,
      email: ''
    });

    removeToken();

    history.push(ROUTES_MAP.SIGN_IN);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);

    if(!isLiked) {
      api.putLike(card._id)
      .then((newCard) => {
        const newCards = cards.map(cardItem => cardItem._id === card._id ? newCard : cardItem);
        setCards(newCards);
      })
      .catch((error) => {
        alert(error);
      });
    } else {
      api.deleteLike(card._id)
      .then((newCard) => {
        const newCards = cards.map(cardItem => cardItem._id === card._id ? newCard : cardItem);
        setCards(newCards);
      })
      .catch((error) => {
        alert(error);
      });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      const newCards = cards.filter(cardItem => {
        return cardItem._id !== card._id;
      });
      setCards(newCards);
    })
    .catch((error) => {
      alert(error);
    });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleDeletingCardClick(card) {
    setDeletingCardPopupOpen(true);
    setDeletedСard(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups(event) {
    if(event.target === event.currentTarget || event.key === 'Escape') {

      document.removeEventListener('keydown', closeAllPopups);

      setEditAvatarPopupOpen(false);
      setEditProfilePopupOpen(false);
      setAddPlacePopupOpen(false);
      setDeletingCardPopupOpen(false);
      setInfoTooltipOpen(false);
      setRegistrationStatus(false);
      setSelectedCard({});
    }
  }

  function handleUpdateUser(dataUser) {
    api.editUserInfo(dataUser.name, dataUser.about)
    .then((result) => {
      setCurrentUser(result);
    })
    .catch((error) => {
      alert(error);
    });
  }

  function handleUpdateAvatar(dataUser) {
    api.editAvatar(dataUser.avatar)
    .then((result) => {
      setCurrentUser(result);
    })
    .catch((error) => {
      alert(error);
    });
  }

  function handleAddPlaceSubmit(dataCard) {
    api.addNewCard(dataCard.name, dataCard.link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
    })
    .catch((error) => {
      alert(error);
    });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header userData={userData} onSignOut={signOut} />
        <Switch>
          <ProtectedRoute exact path={ROUTES_MAP.MAIN} component={MainPage}
            loggedIn={userData.loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeletingCardClick}
            onClose={closeAllPopups}
            isOpenEditAvatar={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            isOpenEditProfile={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            isOpenAddPlace={isAddPlacePopupOpen}
            onAddPlaceSubmit={handleAddPlaceSubmit}
            isOpenDeletingCard={isDeletingCardPopupOpen}
            onCardDeleteSubmit={handleCardDelete}
            deletedСard={deletedСard}
            selectedCard={selectedCard} />
          <Route path={ROUTES_MAP.SIGN_UP}>
            <Register onRegister={handleRegister} />
            <InfoTooltip onClose={closeAllPopups}
              isOpen={isInfoTooltipOpen}
              status={registrationStatus} />
          </Route>
          <Route path={ROUTES_MAP.SIGN_IN}>
            <Login onLogin={handleLogin} />
            <InfoTooltip onClose={closeAllPopups}
              isOpen={isInfoTooltipOpen}
              status={registrationStatus} />
          </Route>
          <Route path={ROUTES_MAP.ALL}>
            <PageNotFound userData={userData} />
          </Route>
          <Route>
            {userData.loggedIn ? <Redirect to={ROUTES_MAP.MAIN} /> : <Redirect to={ROUTES_MAP.SIGN_IN} />}
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
