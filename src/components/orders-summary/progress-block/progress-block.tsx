import { useMemo } from 'react';
import styles from './progress-block.module.css';

type Props = {
  header: string;
  orders: number[];
  orderClass?: string;
};

const ProgressBlock = ({ header, orders, orderClass }: Props) => {

  const ordersChunks = useMemo(() => {
    const chunkSize = 10;
    const result: number[][] = [];
    for (let i = 0; i < orders.length; i += chunkSize) {
      result.push(orders.slice(i, i + chunkSize));
    }
    return result;
  }, [orders]);

  return (
    <article>
      <p className={styles.title}>{header}</p>
      <div className={styles.ordersBlocksSection}>
        {ordersChunks.map((orders, index) => (
          <div key={index} className={styles.ordersBlock}>
            {orders.map((order) => (
              <p key={order} className={`${styles.order} ${orderClass}`}>
                {order.toString().padStart(6, '0')}
              </p>
            ))}
          </div>
        ))}
      </div>
    </article>
  );
};

export default ProgressBlock;
