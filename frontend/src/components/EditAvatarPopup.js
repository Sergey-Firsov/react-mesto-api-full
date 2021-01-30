import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar }) {

  const avatarRef = React.useRef();

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

	return (
    <PopupWithForm title="Обновить аватар" buttonText="Сохранить" onClose={onClose} isOpen={isOpen}
      onSubmit={handleSubmit}>
      <div className="form__section">
        <input className="form__field-input" ref={avatarRef} type="url" placeholder="Ссылка на изображение"
          required />
        <span className="form__input-error"></span>
      </div>
    </PopupWithForm>
	);
}

export default EditAvatarPopup;
