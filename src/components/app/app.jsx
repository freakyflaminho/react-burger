import React from 'react';
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
import OrdersFeedPage from '../pages/orders-feed-page/orders-feed-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import Modal from '../modal/modal';

import styles from './app.module.css';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  const closeIngredientModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <AppHeader />
      <Routes location={background || location}>
        <Route
          index
          element={<ConstructorPage />}
        />

        <Route
          path="/feed"
          element={
            <ProtectedRouteElement forAuth={true}>
              <OrdersFeedPage />
            </ProtectedRouteElement>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRouteElement forAuth={true}>
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
            <ProtectedRouteElement forAuth={false}>
              <LoginPage />
            </ProtectedRouteElement>
          }
        />

        <Route
          path="register"
          element={
            <ProtectedRouteElement forAuth={false}>
              <RegisterPage />
            </ProtectedRouteElement>
          }
        />

        <Route
          path="forgot-password"
          element={
            <ProtectedRouteElement forAuth={false}>
              <ForgotPasswordPage />
            </ProtectedRouteElement>
          }
        />

        <Route
          path="reset-password"
          element={
            <ProtectedRouteElement forAuth={false}>
              <ResetPasswordPage />
            </ProtectedRouteElement>
          }
        />

        <Route
          path="ingredients/:id"
          element={<IngredientPage />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
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
