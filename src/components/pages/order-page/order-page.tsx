import { useParams } from 'react-router';
import OrderInfo from '../../order-info/order-info';
import styles from './order-page.module.css';

const OrderPage = () => {
  const { number = '' } = useParams();

  return (
    <main className={styles.container}>
      <h1 className={styles.header}>{`#${number?.toString().padStart(6, '0')}`}</h1>
      <OrderInfo number={Number(number)} />
    </main>
  );
};

export default OrderPage;
