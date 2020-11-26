import React from 'react';
import { Route, Redirect } from "react-router-dom";
import ROUTES_MAP from '../utils/routesMap.js';

function ProtectedRoute({ component: Component, ...props  }) {
  return (
    <Route>
      {
        () => props.loggedIn ? <Component {...props} /> : <Redirect to={ROUTES_MAP.SIGN_IN} />
      }
    </Route>
)}

export default ProtectedRoute;
