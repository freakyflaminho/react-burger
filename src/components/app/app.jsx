import AppHeader from '../app-header/app-header';
import ConstructorPage from '../pages/constructor-page/constructor-page';
import withDataLoading from '../../hocs/with-data-loading';

import { useGetIngredientsQuery } from '../../services/burger-ingredients';

import styles from './app.module.css';

const App = () => {
  const ConstructorPageWithData = withDataLoading(useGetIngredientsQuery)(ConstructorPage);

  return (
    <div className={styles.container}>
      <AppHeader />
      <ConstructorPageWithData />
    </div>
  );
};

export default App;
