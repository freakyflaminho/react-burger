import React from 'react';
import { NavLink } from 'react-router';
import PropTypes from 'prop-types';

import styles from './custom-link.module.css';

const CustomLink = ({ to, icon: Icon, children }) => {
  return (
    <NavLink
      to={to}
      className={`${styles.link} pt-4 pb-4 pl-5 pr-5`}
    >
      {({ isActive }) => (
        <>
          <Icon />
          <span className={`text text_type_main-default ml-2 ${isActive ? styles.active : 'text_color_inactive'}`}>
            {children}
          </span>
        </>
      )}
    </NavLink>
  );
};

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.func,
  children: PropTypes.node,
};

export default React.memo(CustomLink);
