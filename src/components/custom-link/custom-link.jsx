import React from 'react';
import PropTypes from 'prop-types';
import styles from './custom-link.module.css';

const CustomLink = ({ to, isActive, setActive, icon: Icon, children }) => {

  const handleClick = e => {
    e.preventDefault();
    history.pushState(null, '', to);
    setActive(to);
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={`${styles.link} pt-4 pb-4 pl-5 pr-5`}
    >
      <Icon />
      <span className={`text text_type_main-default ml-2 ${isActive ? styles.active : 'text_color_inactive'}`}>
        {children}
      </span>
    </a>
  );
};

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  icon: PropTypes.func,
  children: PropTypes.node,
};

export default React.memo(CustomLink);
