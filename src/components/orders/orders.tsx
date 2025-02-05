import ScrollablePanel from '../panels/scrollable-panel/scrollable-panel';
import OrderDetailsBlock from './order-details-block/order-details-block';

import { WSOrder } from '../../utils/websocket/ws-api-types';

import styles from './orders.module.css';
import { Ingredient, ObjectMap } from '../../utils/types.ts';

type Props = {
  header: string;
  orders: WSOrder[];
  ingredients: ObjectMap<Ingredient>;
};

const Orders = ({ header, orders, ingredients }: Props) => {
  return (
    <section>
      {header &&
        <h1 className={styles.header}>
          {header}
        </h1>
      }
      <ScrollablePanel extraClass={styles.scrollableBlock}>
        {orders.map((order) => {
            const ingredientsImages = order.ingredients.map((id) => ingredients[id]?.image_mobile);
            const totalPrice = order.ingredients.reduce((result, id) => result += ingredients[id]?.price, 0);
            return (
              <OrderDetailsBlock
                key={order._id}
                number={order.number}
                createdDate={order.createdAt}
                name={order.name}
                status={order.status}
                ingredients={ingredientsImages}
                price={totalPrice}
              />
            );
          },
        )}
      </ScrollablePanel>
    </section>
  );
};

export default Orders;
