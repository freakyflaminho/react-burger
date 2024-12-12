import AppHeader from '../app-header/app-header';
import ConstructorPage from '../pages/constructor-page/constructor-page';

import styles from './app.module.css';
import withDataLoading from '../../hocs/with-data-loading';
import { useGetIngredientsQuery } from '../../services/burger-ingredients';

const App = () => {
  const data = useGetIngredientsQuery();
  const WithDataLoadingConstructorPage = withDataLoading(data, data.refetch)(ConstructorPage);

  return (
    <div className={styles.container}>
      <AppHeader />
      <WithDataLoadingConstructorPage />
    </div>
  );
};

export default App;
