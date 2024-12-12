import PropTypes from 'prop-types';
import doneImage from '../../images/done.svg';
import styles from './order-details.module.css';

const OrderDetails = ({ orderId }) => {
  return (
    <>
      <h3 className={`${styles.order_number} text text_type_digits-large mb-8`}>
        {orderId}
      </h3>
      <p className="text text_type_main-medium">
        идентификатор заказа
      </p>
      <img src={doneImage} alt="заказ создан" className="mt-15 mb-15" />
      <p className="text text_type_main-default">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};

OrderDetails.propTypes = {
  orderId: PropTypes.number.isRequired,
};

export default OrderDetails;