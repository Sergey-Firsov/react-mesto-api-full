import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import ROUTES_MAP from '../utils/routesMap.js';
import headerLogo from '../images/header/header-logo.svg';

function Header({ userData, onSignOut }) {
	return (
    <header className="header page__header">
      <img className="header__logo" src={headerLogo} alt="Логотип проекта Mesto" />
      <div className="header__container">
        <Switch>
          <Route exact path={ROUTES_MAP.MAIN}>
            <p className="header__username">{userData.email}</p>
            <Link to={ROUTES_MAP.SIGN_IN} className="header__link" onClick={onSignOut}>Выйти</Link>
          </Route>
          <Route exact path={ROUTES_MAP.SIGN_IN}>
            <Link to={ROUTES_MAP.SIGN_UP} className="header__link">Регистрация</Link>
          </Route>
          <Route exact path={ROUTES_MAP.SIGN_UP}>
            <Link to={ROUTES_MAP.SIGN_IN} className="header__link">Войти</Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
