import { Link } from 'react-router';
import PropTypes from 'prop-types';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Loader from '../loader/loader';

import styles from './custom-form.module.css';

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

CustomForm.propTypes = {
  title: PropTypes.string,
  additionalActions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      link: PropTypes.shape({
        text: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
  submitButtonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default CustomForm;
