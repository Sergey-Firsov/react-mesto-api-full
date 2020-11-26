import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function DeletingCardPopup({ onClose, isOpen, onCardDelete, card }) {

  function handleSubmit(event) {
    event.preventDefault();

    onCardDelete(card);
  }

	return (
    <PopupWithForm title="Вы уверены?" buttonText="Да" name="deleting-card"
      onClose={onClose} isOpen={isOpen} onSubmit={handleSubmit} />
	);
}

export default DeletingCardPopup;
