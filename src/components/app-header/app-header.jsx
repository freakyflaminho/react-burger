import Menu from '../menu/menu';
import styles from './app-header.module.css';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <Menu />
    </header>
  );
};

export default AppHeader;
