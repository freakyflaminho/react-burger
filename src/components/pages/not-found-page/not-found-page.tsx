import { Link } from 'react-router';
import styles from './not-found-page.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-large">Страница не найдена</h1>
      <Link className={styles.link} to="/">На главную</Link>
    </div>
  );
};

export default NotFoundPage;
