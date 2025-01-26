import React, { useCallback } from 'react';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';

import { INGREDIENT_TYPE } from '../../utils/consts';
import { Ingredient, ObjectMap, SelectedIngredient } from '../../utils/types';

import styles from './burger-ingredients-section.module.css';

type Props = {
  type: string;
  title: string;
  ingredients: Ingredient[];
  selectedIngredients: SelectedIngredient[];
  onIngredientClick: (ingredient: Ingredient) => void;
  refs: ObjectMap<HTMLElement | null>;
};

const BurgerIngredientsSection = ({
  type,
  title,
  ingredients,
  selectedIngredients,
  onIngredientClick,
  refs,
}: Props) => {

  const countSelectedIngredientsById = useCallback(
    (id: string, type: string) => {
      const selectedCount = selectedIngredients.filter(selected => selected.id === id).length;
      return type === INGREDIENT_TYPE.BUN ? selectedCount * 2 : selectedCount;
    },
    [selectedIngredients],
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
              selectedCount={countSelectedIngredientsById(ingredient._id, ingredient.type)}
              onClick={onIngredientClick}
            />
          </li>
        )}
      </ul>
    </>
  );
};

export default React.memo(BurgerIngredientsSection);
