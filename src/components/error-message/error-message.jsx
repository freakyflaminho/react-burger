import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './error-message.module.css';
import PropTypes from 'prop-types';

const DEFAULT_ERROR_MESSAGE = 'Ошибка загрузки данных...';

const ErrorMessage = ({ text = DEFAULT_ERROR_MESSAGE, onRetry }) => {
  return (
    <div className={styles.error}>
      <p className="text text_type_main-medium">
        {text}
      </p>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={onRetry}
      >
        Попробовать ещё раз
      </Button>
    </div>
  );
};

ErrorMessage.propTypes = {
  text: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorMessage;
