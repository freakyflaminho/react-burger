import { useLocation, useNavigate } from 'react-router';
import ScrollablePanel from '../panels/scrollable-panel/scrollable-panel';
import OrderDetailsBlock from './order-details-block/order-details-block';

import { prepareOrderIngredients } from '../../utils/utils.ts';
import { WSOrder } from '../../utils/websocket/ws-api-types';
import { Ingredient, ObjectMap } from '../../utils/types.ts';

import styles from './orders.module.css';

type Props = {
  header?: string;
  orders: WSOrder[];
  ingredients: ObjectMap<Ingredient>;
};

const Orders = ({ header, orders, ingredients }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOnOrderClick = (orderNumber: number) => {
    navigate(`${location.pathname}/${orderNumber}`, { state: { background: location } });
  };

  return (
    <section>
      {header &&
        <h1 className={styles.header}>
          {header}
        </h1>
      }

      <ScrollablePanel extraClass={styles.scrollableBlock}>
        {orders.map((order) => {
            const preparedIngredients = prepareOrderIngredients(order.ingredients, ingredients)
            const ingredientsImages = preparedIngredients.map((ingredient) => ingredient.image_mobile);
            const totalPrice = preparedIngredients.reduce((result, ingredient) => result + ingredient.price, 0);
            return (
              <OrderDetailsBlock
                key={order._id}
                number={order.number}
                createdDate={order.createdAt}
                name={order.name}
                ingredients={ingredientsImages}
                price={totalPrice}
                onClick={handleOnOrderClick}
              />
            );
          },
        )}
      </ScrollablePanel>
    </section>
  );
};

export default Orders;
