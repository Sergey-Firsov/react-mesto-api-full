import React from 'react';

function PopupWithImage({ card, onClose }) {

  if(card._id) {
    document.addEventListener('keydown', onClose);
  }

	return (
		<section className={`popup ${card._id && 'popup_visible'}`} onClick={onClose}>
      <div className="popup__wrapper">
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__description">{card.name}</p>
        <button className="popup__close-button" type="button" onClick={onClose}></button>
      </div>
    </section>
	);
}

export default PopupWithImage;
