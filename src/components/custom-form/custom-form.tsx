import React, { FormEvent } from 'react';
import { Link } from 'react-router';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Loader from '../loader/loader';

import styles from './custom-form.module.css';

type Props = {
  title: string;
  additionalActions: {
    text: string;
    link: {
      text: string;
      to: string;
    }
  }[];
  submitButtonText: string;
  onSubmit: () => void;
  isFetching: boolean;
  children: React.ReactNode;
};

const CustomForm = ({
  title,
  additionalActions,
  submitButtonText,
  onSubmit,
  isFetching,
  children
}: Props) => {

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
