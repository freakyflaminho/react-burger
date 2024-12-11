import BurgerIngredients from '../../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../burger-constructor/burger-constructor';
import { selectedIngredientIdsPropType } from '../../../utils/prop-types';
import styles from './constructor-page.module.css';

const ConstructorPage = ({ selectedIngredientIds }) => {
  return (
    <main className={styles.page}>
      <BurgerIngredients
        selectedIngredientIds={selectedIngredientIds}
      />
      <BurgerConstructor
        selectedIngredientIds={selectedIngredientIds}
      />
    </main>
  );
};

ConstructorPage.propTypes = {
  selectedIngredientIds: selectedIngredientIdsPropType,
};

export default ConstructorPage;
