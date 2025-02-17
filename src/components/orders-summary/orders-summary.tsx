import { useMemo } from 'react';

import ProgressBlock from './progress-block/progress-block';
import StatisticsBlock from './statistics-block/statistics-block';
import { WSOrder } from '../../utils/websocket/ws-api-types.ts';

import styles from './orders-summary.module.css';

type Props = {
  orders: WSOrder[];
  total: number;
  totalToday: number;
};

const OrdersSummary = ({ orders, total, totalToday }: Props) => {

  const [doneOrderNumbers, pendingOrderNumbers] = useMemo(() => {
    const done: number[] = [];
    const pending: number[] = [];

    orders.forEach((order) => {
      if (order.status === 'done') {
        done.push(order.number);
      } else if (order.status === 'pending') {
        pending.push(order.number);
      }
    });

    return [done, pending];
  }, [orders]);

  return (
    <section className={styles.container}>
      <div className={styles.progressBlocksContainer}>
        <ProgressBlock
          header="Готовы:"
          orders={doneOrderNumbers}
          orderClass={styles.orderColor}
        />
        <ProgressBlock
          header="В работе:"
          orders={pendingOrderNumbers}
        />
      </div>
      <StatisticsBlock
        header="Выполнено за все время:"
        count={total}
      />
      <StatisticsBlock
        header="Выполнено за сегодня:"
        count={totalToday}
      />
    </section>
  );
};

export default OrdersSummary;
