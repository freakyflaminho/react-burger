import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price-block.module.css';

type Props = {
  price: number,
  textClass?: string,
  iconClass?: string,
};

const PriceBlock = ({ price, textClass, iconClass }: Props) => {
  return (
    <div className={styles.priceBlock}>
      <p className={`text ${textClass ? textClass : 'text_type_digits-default'}`}>
        {price}
      </p>
      <CurrencyIcon type="primary" className={iconClass} />
    </div>
  );
};

export default React.memo(PriceBlock);
