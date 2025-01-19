import { BrowserRouter, Route, Routes } from 'react-router';

import AppHeader from '../app-header/app-header';
import ConstructorPage from '../pages/constructor-page/constructor-page';
import LoginPage from '../pages/login-page/login-page';
import RegisterPage from '../pages/register-page/register-page';
import ForgotPasswordPage from '../pages/forgot-password-page/forgot-password';
import ResetPasswordPage from '../pages/reset-password-page/reset-password-page';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';

import withDataLoading from '../../hocs/with-data-loading';
import { useGetIngredientsQuery } from '../../services/burger-ingredients';

import styles from './app.module.css';
import { useEffect } from 'react';
import { checkAuth, isAuth } from '../../services/slices/auth-slice';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const data = useGetIngredientsQuery();
  const WithDataLoadingConstructorPage = withDataLoading(data, data.refetch)(ConstructorPage);
  const dispatch = useDispatch();
  const isUserAuth = useSelector(isAuth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch, checkAuth]);

  return (
    <div className={styles.container}>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route index element={<WithDataLoadingConstructorPage />} />
          <Route
            path="login"
            element={
              <ProtectedRouteElement forAuth={false} isAuth={isUserAuth}>
                <LoginPage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="register"
            element={
              <ProtectedRouteElement forAuth={false} isAuth={isUserAuth}>
                <RegisterPage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="forgot-password"
            element={
              <ProtectedRouteElement forAuth={false} isAuth={isUserAuth}>
                <ForgotPasswordPage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="reset-password"
            element={
              <ProtectedRouteElement forAuth={false} isAuth={isUserAuth}>
                <ResetPasswordPage />
              </ProtectedRouteElement>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
