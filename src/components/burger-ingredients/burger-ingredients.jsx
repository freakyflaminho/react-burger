import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Tabs from '../tabs/tabs';
import ScrollablePanel from '../panels/scrollable-panel/scrollable-panel';
import BurgerIngredientsSection from '../burger-ingredients-section/burger-ingredients-section';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { INGREDIENT_TITLE_RU, INGREDIENT_TYPE } from '../../utils/consts';
import { useGetIngredientsQuery } from '../../services/burger-ingredients';
import { selectedIngredientsSelector } from '../../services/burger-constructor';
import {
  closeIngredientDetails,
  ingredientDetailsSelector,
  openIngredientDetails
} from '../../services/ingredient-details';

const BurgerIngredients = () => {
  const ingredientTypes = Object.keys(INGREDIENT_TYPE);

  const [activeTab, setActiveTab] = useState(ingredientTypes[0]);
  const { data: { data: ingredients } } = useGetIngredientsQuery();
  const selectedIngredientIds = useSelector(selectedIngredientsSelector);
  const ingredientDetails = useSelector(ingredientDetailsSelector);
  const dispatch = useDispatch();

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

  const handleIngredientClick = ingredient => dispatch(openIngredientDetails(ingredient));
  const closeIngredientModal = () => dispatch(closeIngredientDetails());

  const handleScroll = e => {
    const containerPos = e.target.getBoundingClientRect().top;
    const newActiveTab = ingredientTypes.reduce((prev, curr) => {
      const prevPos = refs[prev].getBoundingClientRect().top;
      const currPos = refs[curr].getBoundingClientRect().top;
      const deltaPrev = Math.abs(containerPos - prevPos);
      const deltaCurr = Math.abs(containerPos - currPos);

      return deltaPrev < deltaCurr ? prev : curr;
    });

    setActiveTab(newActiveTab);
  };

  const handleTabClick = value => {
    refs[value].scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section>
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
          />
        )}
      </ScrollablePanel>

      {ingredientDetails &&
        <Modal onClose={closeIngredientModal} title="Детали ингредиента">
          <IngredientDetails ingredient={ingredientDetails} />
        </Modal>}
    </section>
  );
};

export default React.memo(BurgerIngredients);
