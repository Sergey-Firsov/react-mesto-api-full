import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ onClose, isOpen, onUpdateUser }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

	return (
		<PopupWithForm title="Редактировать профиль" buttonText="Сохранить" onClose={onClose} isOpen={isOpen} onSubmit={handleSubmit}>
      <div className="form__section">
        <input className="form__field-input" type="text" value={name || ''} onChange={handleChangeName} minLength="2" maxLength="40" placeholder="Имя" required />
        <span className="form__input-error"></span>
      </div>
      <div className="form__section">
        <input className="form__field-input" type="text" value={description || ''} onChange={handleChangeDescription} minLength="2" maxLength="200" placeholder="Занятие" required />
        <span className="form__input-error"></span>
      </div>
    </PopupWithForm>
	);
}

export default EditProfilePopup;

