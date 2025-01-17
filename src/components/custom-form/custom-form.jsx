import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './custom-form.module.css';
import { Link } from 'react-router';
import Loader from '../loader/loader';

const CustomForm = ({
  title,
  additionalActions,
  submitButtonText,
  onSubmit,
  isFetching,
  children
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.form}>
          {title && <p className={styles.title}>{title}</p>}
          {children}
          {isFetching ? <Loader /> : <Button htmlType="submit">{submitButtonText}</Button>}
        </div>

        {additionalActions &&
          <div className={styles.additionalActions}>
            {additionalActions.map((action, index) => (
              <p key={index} className={styles.additionalActionText}>
                {action.text} <Link className={styles.additionalActionLink}
                                    to={action.link.to}>{action.link.text}</Link>
              </p>
            ))}
          </div>
        }
      </form>
    </main>
  );
};

export default CustomForm;
