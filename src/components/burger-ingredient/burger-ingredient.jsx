import React from 'react';
import PropTypes from 'prop-types';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceBlock from '../price-block/price-block';
import styles from './burger-ingredient.module.css';

const BurgerIngredient = ({ name, price, image, selectedCount }) => {
  return (
    <div className={styles.ingredientCard}>
      {selectedCount > 0 && <Counter count={selectedCount} size="default" />}
      <img
        src={image}
        alt={name}
        className="pl-4 pr-4"
      />
      <PriceBlock price={price} />
      <p className={`${styles.ingredientCardText} text text_type_main-default`}>
        {name}
      </p>
    </div>
  );
};

BurgerIngredient.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  selectedCount: PropTypes.number.isRequired,
};

export default React.memo(BurgerIngredient);
