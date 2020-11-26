import React from 'react';
import PageWithForm from './PageWithForm.js';

function Login({ onLogin }) {
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

    onLogin(data.email, data.password);

    setData({
      email: '',
      password: ''
    });
  }

  return (
    <PageWithForm title="Вход" buttonText="Войти"
      onChange={handleChange} data={data} onSubmit={handleSubmit} />
  );
}

export default Login;
