import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../burger-constructor/burger-constructor';

import styles from './constructor-page.module.css';

const ConstructorPage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.page}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </DndProvider>
  );
};

export default ConstructorPage;
