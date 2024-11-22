import AppHeader from '../app-header/app-header';
import ConstructorPage from '../pages/constructor-page/constructor-page';
import ingredients from '../../utils/data.json';
import selectedIngredientIds from '../../utils/selectedIngredientIds.json';
import styles from './app.module.css';

const App = () => {
  return (
    <div className={styles.container}>
      <AppHeader />
      <ConstructorPage
        ingredients={ingredients}
        selectedIngredientIds={selectedIngredientIds}
      />
    </div>
  );
};

export default App;
