import { NavLink, Outlet, useLocation } from 'react-router';
import { useLogoutMutation } from '../../../services/api/user-api';

import styles from './profile-page.module.css';

const ProfilePage = () => {
  const location = useLocation();
  const [logout] = useLogoutMutation();

  const handleExit = () => {
    logout();
  };

  return (
    <main className={styles.page}>
      <nav className={styles.menu}>
        <ul>
          <li>
            <NavLink
              to="/profile"
              end
              className={({ isActive }) => isActive ? styles.activeLink : styles.inactiveLink}
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              to="orders"
              className={({ isActive }) => isActive ? styles.activeLink : styles.inactiveLink}
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              onClick={handleExit}
              className={({ isActive }) => isActive ? styles.activeLink : styles.inactiveLink}
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <p className={styles.remark}>
          {location.pathname === '/profile' ? 'В этом разделе вы можете изменить свои персональные данные'
            : location.pathname === '/profile/orders' ? 'В этом разделе вы можете просмотреть свою историю заказов'
              : ''}
        </p>
      </nav>
      <div className={styles.content}>
        <Outlet />
      </div>
    </main>
  );
};

export default ProfilePage;
