import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price-block.module.css';

const PriceBlock = ({ price, textClass, iconClass, }) => {
  return (
    <div className={`${styles.priceBlock} mt-1 mb-1`}>
      <p className={`text ${textClass ? textClass : 'text_type_digits-default'}`}>
        {price}
      </p>
      <CurrencyIcon type="primary" className={iconClass} />
    </div>
  );
};

PriceBlock.propTypes = {
  price: PropTypes.number.isRequired,
  textClass: PropTypes.string,
  iconClass: PropTypes.string,
};

export default React.memo(PriceBlock);