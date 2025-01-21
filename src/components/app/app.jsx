import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router';

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
import IngredientPage from '../pages/ingredient-page/ingredient-page';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { checkAuth, isAuth } from '../../services/slices/auth-slice';

import styles from './app.module.css';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isUserAuth = useSelector(isAuth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch, checkAuth]);

  const closeIngredientModal = () => {
    navigate(-1);
  };

  const background = location.state && location.state.background;

  return (
    <div className={styles.container}>
      <AppHeader />
      <Routes location={background || location}>
        <Route index element={<ConstructorPage />} />

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

        <Route path="ingredients/:id" element={<IngredientPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="ingredients/:id" element={
            <Modal onClose={closeIngredientModal} title="Детали ингредиента">
              <IngredientDetails />
            </Modal>}
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
