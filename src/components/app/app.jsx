import { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import ConstructorPage from '../pages/constructor-page/constructor-page';
import selectedIngredientIds from '../../utils/selectedIngredientIds.json';
import { getIngredients } from '../../utils/api';
import styles from './app.module.css';

const App = () => {

  const [ingredients, setIngredients] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
      setIsLoading(true);
      getIngredients()
        .then(ingredients => {
          setIngredients(ingredients);
          setIsLoading(false);
        })
        .catch(err => {
          setIsError(true);
          setIsLoading(false);
        });
    }, []
  );

  return (
    <div className={styles.container}>
      <AppHeader />
      {!isLoading && !isError &&
        <ConstructorPage
          ingredients={ingredients}
          selectedIngredientIds={selectedIngredientIds} />
      }
    </div>
  );
};

export default App;
