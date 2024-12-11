import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor-draggable-card.module.css';

const BurgerConstructorDraggableCard = ({ text, price, image, extraClass }) => {
  return (
    <div className={styles.draggableCard}>
      <DragIcon
        type="primary"
        className={styles.draggableIcon}
      />
      <ConstructorElement
        text={text}
        price={price}
        thumbnail={image}
        extraClass={`${extraClass} mr-2`}
      />
    </div>
  );
};

BurgerConstructorDraggableCard.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
};

export default React.memo(BurgerConstructorDraggableCard);
