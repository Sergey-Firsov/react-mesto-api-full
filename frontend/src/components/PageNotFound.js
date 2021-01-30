import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES_MAP from '../utils/routesMap.js';

function PageNotFound(userData) {
  return (
    <section className="not-found page__not-found">
      <h1 className="">404</h1>
      <p className="">Такой страницы не существует.</p>
      <Link to={ userData.loggedIn ? ROUTES_MAP.MAIN : ROUTES_MAP.SIGN_IN } className="not-found__link">
        Вернуться назад.
      </Link>
    </section>
  )
}

export default PageNotFound;
