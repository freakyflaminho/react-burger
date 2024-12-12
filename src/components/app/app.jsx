import AppHeader from '../app-header/app-header';
import ConstructorPage from '../pages/constructor-page/constructor-page';

import styles from './app.module.css';

const App = () => {
  return (
    <div className={styles.container}>
      <AppHeader />
      <ConstructorPage />
    </div>
  );
};

export default App;
