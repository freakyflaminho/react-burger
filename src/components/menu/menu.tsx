import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomLink from '../custom-link/custom-link';

import styles from './menu.module.css';

const Menu = () => {
  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <CustomLink to="/" icon={BurgerIcon}>
            Конструктор
          </CustomLink>
        </li>
        <li className={styles.listItem}>
          <CustomLink to="/feed" icon={ListIcon}>
            Лента заказов
          </CustomLink>
        </li>
        <li className={`${styles.listItem} ${styles.logo}`}>
          <CustomLink to="/" icon={Logo} />
        </li>
        <li className={`${styles.listItem} ${styles.listItemLast}`}>
          <CustomLink to="/profile" icon={ProfileIcon}>
            Личный кабинет
          </CustomLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
