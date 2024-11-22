import React, { useCallback } from 'react';
import Tabs from '../tabs/tabs';
import ScrollablePanel from '../panels/scrollable-panel/scrollable-panel';
import BurgerIngredientsSection from '../burger-ingredients-section/burger-ingredients-section';
import { INGREDIENT_TITLE_RU, INGREDIENT_TYPE } from '../../utils/consts';
import { ingredientsPropType, selectedIngredientIdsPropType } from '../../utils/prop-types';

const BurgerIngredients = ({ ingredients, selectedIngredientIds }) => {

  const ingredientTypes = Object.keys(INGREDIENT_TYPE);

  const refs = ingredientTypes.reduce(
    (acc, current) => ({ ...acc, [current]: '' }), {});

  const getTitleByType = useCallback(
    type => INGREDIENT_TITLE_RU[type] || INGREDIENT_TITLE_RU['DEFAULT'],
    []
  );

  const getIngredientsByType = useCallback(
    type => ingredients.filter(ingredient => ingredient.type === INGREDIENT_TYPE[type]),
    [ingredients]
  );

  const getSelectedIngredientsByType = useCallback(
    type => {
      const value = INGREDIENT_TYPE[type];
      return value === INGREDIENT_TYPE.BUN
        ? [selectedIngredientIds[value]]
        : selectedIngredientIds.ingredients.filter(
          selectedIngredientId => ingredients.find(
            ingredient => ingredient.type === value && ingredient._id === selectedIngredientId));
    },
    [ingredients, selectedIngredientIds]);

  return (
    <section>
      <h1 className="text text_type_main-large pt-10 pb-5">
        Соберите бургер
      </h1>

      <Tabs
        tabs={ingredientTypes}
        refs={refs}
        getTitleByType={getTitleByType}
      />

      <ScrollablePanel>
        {ingredientTypes.map(type =>
          <BurgerIngredientsSection
            key={type}
            type={type}
            title={getTitleByType(type)}
            ingredients={getIngredientsByType(type)}
            selectedIngredients={getSelectedIngredientsByType(type)}
            refs={refs}
          />
        )}
      </ScrollablePanel>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: ingredientsPropType,
  selectedIngredientIds: selectedIngredientIdsPropType,
};

export default React.memo(BurgerIngredients);
