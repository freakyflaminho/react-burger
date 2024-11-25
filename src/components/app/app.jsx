import AppHeader from '../app-header/app-header';
import ConstructorPage from '../pages/constructor-page/constructor-page';
import withDataLoading from '../../hocs/with-data-loading';
import { getIngredients } from '../../utils/api';
import selectedIngredientIds from '../../utils/selectedIngredientIds.json';
import styles from './app.module.css';

const App = () => {
  const ConstructorPageWithData = withDataLoading(getIngredients)(ConstructorPage);

  return (
    <div className={styles.container}>
      <AppHeader />
      <ConstructorPageWithData selectedIngredientIds={selectedIngredientIds} />
    </div>
  );
};

export default App;
