import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwner = currentUser._id === card.owner;
  const isLiked = card.likes.some(item => item === currentUser._id);

	function handleClick() {
		onCardClick(card);
  }

  function handleLikeClick() {
		onCardLike(card);
  }

  function handleDeleteClick() {
		onCardDelete(card);
  }

	return (
		<li className="card">
			<img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
			<div className="card__description">
				<h3 className="card__text">{card.name}</h3>
				<div className="card__like-wrap">
					<button className={`card__like-button ${isLiked && 'card__like-button_active'}`} type="button" onClick={handleLikeClick}></button>
					<span className="card__like-counter">{card.likes.length}</span>
				</div>
			</div>
			<button className={`card__delete-button ${isOwner && 'card__delete-button_active'}`} type="button" onClick={handleDeleteClick}></button>
		</li>
	)
}

export default Card;
