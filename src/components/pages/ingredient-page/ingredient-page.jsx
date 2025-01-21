import IngredientDetails from '../../ingredient-details/ingredient-details';
import styles from './ingredient-page.module.css';

const IngredientPage = () => {
  return (
    <main className={styles.container}>
      <h1 className={styles.header}>Детали ингредиента</h1>
      <IngredientDetails />
    </main>
  );
};

export default IngredientPage;
