import React, { useState } from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomLink from '../custom-link/custom-link';
import styles from './menu.module.css';

const Menu = () => {
  const [active, setActive] = useState('constructor');

  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <CustomLink
            to="/constructor"
            isActive={active === '/constructor'}
            setActive={setActive}
            icon={BurgerIcon}
          >
            Конструктор
          </CustomLink>
        </li>
        <li className={styles.listItem}>
          <CustomLink
            to="/orders"
            isActive={active === '/orders'}
            setActive={setActive}
            icon={ListIcon}
          >
            Лента заказов
          </CustomLink>
        </li>
        <li className={`${styles.listItem} ${styles.logo}`}>
          <CustomLink
            to="/"
            isActive={active === '/'}
            setActive={setActive}
            icon={Logo}
          />
        </li>
        <li className={`${styles.listItem} ${styles.listItemLast}`}>
          <CustomLink
            to="/profile"
            isActive={active === '/profile'}
            setActive={setActive}
            icon={ProfileIcon}
          >
            Личный кабинет
          </CustomLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
