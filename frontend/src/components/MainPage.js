import React from 'react';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeletingCardPopup from './DeletingCardPopup';
import PopupWithImage from './PopupWithImage.js';

function MainPage({ loggedIn, onEditAvatar, onEditProfile, onAddPlace, onCardClick,
  cards, onCardLike, onCardDelete, onClose, isOpenEditAvatar, onUpdateAvatar,
  isOpenEditProfile, onUpdateUser, isOpenAddPlace, onAddPlaceSubmit, isOpenDeletingCard,
  onCardDeleteSubmit, deletedСard, selectedCard }) {

  return (
    <>
      <Main loggedIn={loggedIn}
        onEditAvatar={onEditAvatar}
        onEditProfile={onEditProfile}
        onAddPlace={onAddPlace}
        onCardClick={onCardClick}
        cards={cards}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete} />
      <Footer loggedIn={loggedIn} />
      <EditAvatarPopup loggedIn={loggedIn}
        onClose={onClose}
        isOpen={isOpenEditAvatar}
        onUpdateAvatar={onUpdateAvatar} />
      <EditProfilePopup loggedIn={loggedIn}
        onClose={onClose}
        isOpen={isOpenEditProfile}
        onUpdateUser={onUpdateUser} />
      <AddPlacePopup loggedIn={loggedIn}
        onClose={onClose}
        isOpen={isOpenAddPlace}
        onAddPlace={onAddPlaceSubmit} />
      <DeletingCardPopup loggedIn={loggedIn}
        onClose={onClose}
        isOpen={isOpenDeletingCard}
        onCardDelete={onCardDeleteSubmit}
        card={deletedСard} />
      <PopupWithImage loggedIn={loggedIn}
        onClose={onClose}
        card={selectedCard} />
    </>
  )
}

export default MainPage;
