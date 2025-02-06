import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientComposition from './ingredient-composition/ingredient-composition.tsx';
import PriceBlock from '../../price-block/price-block';

import { ORDER_STATUS } from '../../../utils/consts.ts';
import { OrderStatusType } from '../../../utils/websocket/ws-api-types.ts';

import styles from './order-details-block.module.css';

type Props = {
  number: number;
  createdDate: string;
  name: string;
  status?: OrderStatusType;
  ingredients: string[];
  price: number;
  onClick: (orderNumber: number) => void;
};

const OrderDetailsBlock = ({ number, createdDate, name, status, ingredients, price, onClick }: Props) => {
  const handleOnClick = () => {
    onClick(number);
  };

  return (
    <article className={styles.container} onClick={handleOnClick}>

      <div className={styles.topSection}>
        <p className={styles.number}>{`#${number.toString().padStart(6, '0')}`}</p>
        <p><FormattedDate className={styles.createdData} date={new Date(createdDate)} /></p>
      </div>

      <div className={styles.centerSection}>
        <p className={styles.name}>{name}</p>
        {status &&
          <p className={`${styles.status} ${status === 'done' && styles.doneStatus}`}>{ORDER_STATUS[status]}</p>}
      </div>

      <div className={styles.bottomSection}>
        <IngredientComposition images={ingredients} />
        <PriceBlock price={price} />
      </div>

    </article>
  );
};

export default OrderDetailsBlock;
