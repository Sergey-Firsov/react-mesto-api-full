import React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

	return (
		<main className="content page__content">
      <section className="profile content__profile">
        <div className="profile__box">
          <div className="profile__overlay" onClick={onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватарка" />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        <ul className="cards__container">
          {cards.map(card => {
            return (<Card card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete} />)
          })}
        </ul>
      </section>
    </main>
	);
}

export default Main;
