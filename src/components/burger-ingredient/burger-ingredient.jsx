import React from 'react';
import PropTypes from 'prop-types';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceBlock from '../price-block/price-block';
import { ingredientPropType } from '../../utils/prop-types';
import styles from './burger-ingredient.module.css';

const BurgerIngredient = ({ data, selectedCount, onClick }) => {
  const handleOnClick = () => onClick(data);

  return (
    <div className={styles.ingredientCard} onClick={handleOnClick}>
      {selectedCount > 0 && <Counter count={selectedCount} size="default" />}
      <img
        src={data.image}
        alt={data.name}
        className="pl-4 pr-4"
      />
      <PriceBlock price={data.price} />
      <p className={`${styles.ingredientCardText} text text_type_main-default`}>
        {data.name}
      </p>
    </div>
  );
};

BurgerIngredient.propTypes = {
  data: ingredientPropType,
  selectedCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(BurgerIngredient);
