import loader from '../../images/loader.svg';
import styles from './loader.module.css';

const Loader = () => {
  return (
    <img src={loader} alt="Загрузка" className={styles.loader} />
  );
};

export default Loader;
