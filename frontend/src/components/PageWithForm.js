import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES_MAP from '../utils/routesMap.js';

function PageWithForm({ title, buttonText, linkText, onChange, data, onSubmit }) {

	return (
    <section className="login page__login">
      <form className="form" onSubmit={onSubmit}>
        <h2 className="form__heading form__heading_type_login">{title}</h2>
        <div className="form__section">
          <input className="form__field-input form__field-input_type_login" type="email"
            name="email" value={data.email} onChange={onChange} placeholder="Email" required />
          <span className="form__input-error"></span>
        </div>
        <div className="form__section">
          <input className="form__field-input form__field-input_type_login" type ="password" name="password"
            value={data.password} onChange={onChange} placeholder="Пароль" minLength="6" required />
          <span className="form__input-error"></span>
        </div>
        <button className="form__submit-button form__submit-button_type_login" type="submit" >
          {buttonText}
        </button>
        <Link className="form__link" to={ROUTES_MAP.SIGN_IN} disabled>{linkText}</Link>
      </form>
    </section>
	);
}

export default PageWithForm;
