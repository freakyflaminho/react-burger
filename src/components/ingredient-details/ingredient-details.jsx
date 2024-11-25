import { ingredientPropType } from '../../utils/prop-types';
import styles from './ingredient-details.module.css';

const IngredientDetails = ({ ingredient }) => {
  const { image_large, name, calories, proteins, fat, carbohydrates } = ingredient;

  return (
    <>
      <img src={image_large} alt={name} />
      <p className="text text_type_main-medium mt-4 mb-8">
        {name}
      </p>
      <ul className={`${styles.nutritionalValueList} mb-15`}>
        <li className="text text_type_main-default text_color_inactive">
          <p>Калории, ккал</p>
          <p>{calories}</p>
        </li>
        <li className="text text_type_main-default text_color_inactive">
          <p>Белки, г</p>
          <p>{proteins}</p>
        </li>
        <li className="text text_type_main-default text_color_inactive">
          <p>Жиры, г</p>
          <p>{fat}</p>
        </li>
        <li className="text text_type_main-default text_color_inactive">
          <p>Углеводы, г</p>
          <p>{carbohydrates}</p>
        </li>
      </ul>
    </>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientPropType,
};

export default IngredientDetails;