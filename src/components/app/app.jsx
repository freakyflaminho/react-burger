import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router';

import AppHeader from '../app-header/app-header';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import ConstructorPage from '../pages/constructor-page/constructor-page';
import ProfilePage from '../pages/profile-page/profile-page';
import ProfileEditPage from '../pages/profile-edit-page/profile-edit-page';
import ProfileOrdersPage from '../pages/profile-orders-page/profile-orders-page';
import LoginPage from '../pages/login-page/login-page';
import RegisterPage from '../pages/register-page/register-page';
import ForgotPasswordPage from '../pages/forgot-password-page/forgot-password';
import ResetPasswordPage from '../pages/reset-password-page/reset-password-page';

import withDataLoading from '../../hocs/with-data-loading';
import { useGetIngredientsQuery } from '../../services/api/ingredients-api';
import { checkAuth, isAuth } from '../../services/slices/auth-slice';

import styles from './app.module.css';

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
            path="/profile"
            element={
              <ProtectedRouteElement forAuth={true} isAuth={isUserAuth}>
                <ProfilePage />
              </ProtectedRouteElement>
            }
          >
            <Route index element={<ProfileEditPage />} />
            <Route path="orders" element={<ProfileOrdersPage />} />
          </Route>
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
