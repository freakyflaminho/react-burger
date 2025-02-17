import { useParams } from 'react-router';
import Modal from '../modal/modal';
import OrderInfo from '../order-info/order-info';

import styles from './order-modal.module.css';

type Props = {
  onClose: () => void;
}

const OrderModal = ({ onClose }: Props) => {
  const { number = '' } = useParams();
  const orderNumber = `#${number?.toString().padStart(6, '0')}`;

  return (
    <Modal
      onClose={onClose}
      title={orderNumber}
      headerTextClass={styles.headerTextClass}
      contentClass={styles.contentClass}
    >
      <OrderInfo number={Number(number)} />
    </Modal>
  );
};

export default OrderModal;
