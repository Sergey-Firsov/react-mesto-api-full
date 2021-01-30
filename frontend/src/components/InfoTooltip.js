import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import successIcon from '../images/form/success-icon.jpg';
import failIcon from '../images/form/fail-icon.jpg';

function InfoTooltip({ onClose, isOpen, status }) {

	return (
    <PopupWithForm
      title={status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
      name="info-tooltip" onClose={onClose} isOpen={isOpen}>
      <img className="form__icon" src={status ? successIcon : failIcon} alt={status ? 'Успех!' : 'Неудача.'}
        onClick={onClose} />
    </PopupWithForm>
	);
}

export default InfoTooltip;
