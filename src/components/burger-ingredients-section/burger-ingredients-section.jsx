import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { tabRefsPropType } from '../../utils/prop-types';
import styles from './burger-ingredients-section.module.css';

const BurgerIngredientsSection = ({
  type,
  title,
  ingredients,
  selectedIngredients,
  onIngredientClick,
  refs,
}) => {
  const countSelectedIngredientsById = useCallback(
    id => selectedIngredients.filter(selectedId => selectedId === id).length,
    [selectedIngredients]
  );

  return (
    <>
      <h2 className="text text_type_main-medium pt-10 pb-6"
          ref={element => refs[type] = element}>
        {title}
      </h2>

      <ul className={`${styles.ingredientsSectionList} pl-4 pr-4`}>
        {ingredients.map(ingredient =>
          <li key={ingredient._id}>
            <BurgerIngredient
              data={ingredient}
              selectedCount={countSelectedIngredientsById(ingredient._id)}
              onClick={onIngredientClick}
            />
          </li>
        )}
      </ul>
    </>
  );
};

BurgerIngredientsSection.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  selectedIngredients: PropTypes.array.isRequired,
  onIngredientClick: PropTypes.func.isRequired,
  refs: tabRefsPropType,
};

export default React.memo(BurgerIngredientsSection);
