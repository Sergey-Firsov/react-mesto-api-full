import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditPlacePopup({ onClose, isOpen, onAddPlace }) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeLink(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name: name,
      link: link
    });
  }

	return (
		<PopupWithForm title="Новое место" buttonText="Создать" onClose={onClose} isOpen={isOpen} onSubmit={handleSubmit}>
      <div className="form__section">
        <input className="form__field-input" value={name || ''} onChange={handleChangeName} type="text" name="inputPlaceDescription" minLength="1" maxLength="30" placeholder="Название" required />
        <span className="form__input-error"></span>
      </div>
      <div className="form__section">
        <input className="form__field-input" value={link || ''} onChange={handleChangeLink} type="url" name="inputPlaceUrl" placeholder="Ссылка на картинку" required />
        <span className="form__input-error"></span>
      </div>
    </PopupWithForm>
	);
}

export default EditPlacePopup;
