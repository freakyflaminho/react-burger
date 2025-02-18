import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import Tabs from '../tabs/tabs';
import ScrollablePanel from '../panels/scrollable-panel/scrollable-panel';
import BurgerIngredientsSection from '../burger-ingredients-section/burger-ingredients-section';

import { useAppSelector } from '../../services/hooks';
import { useGetIngredientsState } from '../../services/api/ingredients-api';
import { selectedIngredientsSelector } from '../../services/slices/burger-constructor-slice';
import { INGREDIENT_TITLE_RU, INGREDIENT_TYPE } from '../../utils/consts';
import { Ingredient, IngredientType, ObjectMap, SelectedIngredientIds } from '../../utils/types';

const BurgerIngredients = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: { data: ingredients = [] } = {} } = useGetIngredientsState();
  const selectedIngredientIds: SelectedIngredientIds = useAppSelector(selectedIngredientsSelector);

  const ingredientTypes = Object.keys(INGREDIENT_TYPE) as (IngredientType)[];
  const [activeTab, setActiveTab] = useState(ingredientTypes[0]);

  const refs: ObjectMap<HTMLElement> = ingredientTypes.reduce(
    (acc, current): ObjectMap<HTMLElement> => ({ ...acc, [current]: '' }), {});

  const getTitleByType = useCallback(
    (type: IngredientType): string => INGREDIENT_TITLE_RU[type] || INGREDIENT_TITLE_RU['DEFAULT'],
    [],
  );

  const getIngredientsByType = useCallback(
    (type: IngredientType): Ingredient[] => ingredients.filter(
      (ingredient: Ingredient) => ingredient.type === INGREDIENT_TYPE[type]),
    [ingredients],
  );

  const getSelectedIngredientsByType = useCallback(
    (type: IngredientType) => {
      const value = INGREDIENT_TYPE[type];
      return value === INGREDIENT_TYPE.BUN
        ? [{ id: selectedIngredientIds[value] }]
        : selectedIngredientIds.ingredients.filter(
          selected => ingredients.find(
            (ingredient: Ingredient) => ingredient.type === value && ingredient._id === selected.id));
    },
    [ingredients, selectedIngredientIds]);

  const handleIngredientClick = (ingredient: Ingredient) => {
    navigate(`/ingredients/${ingredient._id}`, { state: { background: location } });
  };

  const handleScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    const containerPos = e.currentTarget.getBoundingClientRect().top;
    const newActiveTab = ingredientTypes.reduce((prev, curr) => {
      const prevPos = refs[prev].getBoundingClientRect().top;
      const currPos = refs[curr].getBoundingClientRect().top;
      const deltaPrev = Math.abs(containerPos - prevPos);
      const deltaCurr = Math.abs(containerPos - currPos);

      return deltaPrev < deltaCurr ? prev : curr;
    });

    setActiveTab(newActiveTab);
  };

  const handleTabClick = (value: string) => {
    refs[value].scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section data-test="ingredients-container">
      <h1 className="text text_type_main-large pt-10 pb-5">
        Соберите бургер
      </h1>

      <Tabs
        tabs={ingredientTypes}
        active={activeTab}
        onTabClick={handleTabClick}
        getTitleByType={getTitleByType}
      />

      <ScrollablePanel onScroll={handleScroll}>
        {ingredientTypes.map(type =>
          <BurgerIngredientsSection
            key={type}
            type={type}
            title={getTitleByType(type)}
            ingredients={getIngredientsByType(type)}
            selectedIngredients={getSelectedIngredientsByType(type)}
            onIngredientClick={handleIngredientClick}
            refs={refs}
          />,
        )}
      </ScrollablePanel>
    </section>
  );
};

export default React.memo(BurgerIngredients);
