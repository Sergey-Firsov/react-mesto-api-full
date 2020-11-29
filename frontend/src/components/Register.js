import React from 'react';
import PageWithForm from './PageWithForm.js';

function Register({ onRegister }) {
  const [data, setData] = React.useState({
    email: '',
    password: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault()

    if(!data.email || !data.password) {
      return;
    }

    onRegister(data.email, data.password, () => setData({ email: '', password: '' }));
  }

  return (
    <PageWithForm title="Регистрация" buttonText="Зарегистрироваться" linkText="Уже зарегистрированы? Войти"
      onChange={handleChange} data={data} onSubmit={handleSubmit} />
  );
}

export default Register;
