import React from 'react';

function PopupWithForm(props) {

  if(props.isOpen) {
    document.addEventListener('keydown', props.onClose);
  }

	return (
    <section className={`popup ${props.isOpen && 'popup_visible'}`} onClick={props.onClose}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <form className={`form form_type_${props.name}`} onSubmit={props.onSubmit}>
					<h2 className={`form__heading form__heading_type_${props.name}`}>{props.title}</h2>
					{props.children}
          <button className={`form__submit-button form__submit-button_type_${props.name}`}
            type="submit" onClick={props.onClose}>{props.buttonText}</button>
        </form>
        <button className={`popup__close-button popup__close-button_type_${props.name}`} type="button"
          onClick={props.onClose}></button>
      </div>
    </section>
	);
}

export default PopupWithForm;
