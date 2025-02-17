import { useEffect } from 'react';
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
import OrderPage from '../pages/order-page/order-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import OrderModal from '../order-modal/order-modal';
import Modal from '../modal/modal';

import { useAppDispatch } from '../../services/hooks';
import { checkAuth } from '../../services/slices/auth-slice';

import styles from './app.module.css';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;
  if (background) {
    background.state = location;
  }

  const closeModal = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <AppHeader />
      <Routes location={background || location}>
        <Route
          index
          element={<ConstructorPage />}
        />

        <Route path="/feed" element={<OrdersFeedPage />} />

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
          path="/profile/orders/:number"
          element={
            <ProtectedRouteElement forAuth={true}>
              <OrderPage />
            </ProtectedRouteElement>
          }
        />

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
          path="feed/:number"
          element={<OrderPage />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              <Modal onClose={closeModal} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>}
          />
          <Route
            path="feed/:number"
            element={<OrderModal onClose={closeModal} />}
          />
          <Route
            path="profile/orders/:number"
            element={<OrderModal onClose={closeModal} />}
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
