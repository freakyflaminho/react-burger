import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './error-message.module.css';

const DEFAULT_ERROR_MESSAGE = 'Ошибка загрузки данных...';

type Props = {
  text?: string;
  onRetry: () => void;
};

const ErrorMessage = ({ text = DEFAULT_ERROR_MESSAGE, onRetry }: Props) => {
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

export default ErrorMessage;
