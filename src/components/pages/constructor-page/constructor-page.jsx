import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../burger-constructor/burger-constructor';
import DataLoader from '../../data-loader/DataLoader';

import { useGetIngredientsQuery } from '../../../services/api/ingredients-api';

import styles from './constructor-page.module.css';

const ConstructorPage = () => {
  const data = useGetIngredientsQuery();

  return (
    <DataLoader data={data} onRetry={data.refetch}>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.page}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
    </DataLoader>
  );
};

export default ConstructorPage;
