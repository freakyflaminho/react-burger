import BurgerIngredients from '../../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../burger-constructor/burger-constructor';

import styles from './constructor-page.module.css';

const ConstructorPage = () => {
  return (
    <main className={styles.page}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
};

export default ConstructorPage;
