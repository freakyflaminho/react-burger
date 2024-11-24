import BurgerIngredients from '../../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../burger-constructor/burger-constructor';
import { ingredientsPropType, selectedIngredientIdsPropType } from '../../../utils/prop-types';
import styles from './constructor-page.module.css';

const ConstructorPage = ({ data: ingredients, selectedIngredientIds }) => {
  return (
    <main className={styles.page}>
      <BurgerIngredients
        ingredients={ingredients}
        selectedIngredientIds={selectedIngredientIds}
      />
      <BurgerConstructor
        ingredients={ingredients}
        selectedIngredientIds={selectedIngredientIds}
      />
    </main>
  );
};

ConstructorPage.propTypes = {
  data: ingredientsPropType,
  selectedIngredientIds: selectedIngredientIdsPropType,
};

export default ConstructorPage;
