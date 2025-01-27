import React from 'react';
import { NavLink } from 'react-router';

import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';

import styles from './custom-link.module.css';

type Props = {
  to: string;
  icon: React.FC<TIconProps>;
  children?: React.ReactNode;
};

const CustomLink = ({ to, icon: Icon, children }: Props) => {
  return (
    <NavLink to={to} className={styles.link}>
      {({ isActive }) => (
        <>
          <Icon type="primary" className={styles.icon} />
          <span className={`${isActive ? styles.activeLink : styles.inactiveLink}`}>
            {children}
          </span>
        </>
      )}
    </NavLink>
  );
};

export default React.memo(CustomLink);
