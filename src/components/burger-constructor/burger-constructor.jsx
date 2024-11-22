import { useMemo } from 'react';
import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ScrollablePanel from '../panels/scrollable-panel/scrollable-panel';
import BurgerConstructorDraggableCard from '../burger-constructor-draggable-card/burger-constructor-draggable-card';
import PriceBlock from '../price-block/price-block';
import { ingredientsPropType, selectedIngredientIdsPropType } from '../../utils/prop-types';
import styles from './burger-constructor.module.css';

const BurgerIngredients = ({ ingredients, selectedIngredientIds }) => {

  const selectedBun = useMemo(
    () => ingredients.find(ingredients => ingredients._id === selectedIngredientIds.bun),
    [ingredients, selectedIngredientIds.bun]
  );

  const selectedIngredients = useMemo(
    () => selectedIngredientIds.ingredients.map(
      selectedId => ingredients.find(
        ingredient => ingredient._id === selectedId)),
    [ingredients, selectedIngredientIds.ingredients]);

  const totalPrice = useMemo(
    () => selectedBun && selectedBun.price +
      selectedIngredients.reduce((acc, ingredient) => acc + ingredient.price, 0),
    [selectedBun, selectedIngredients]);

  return (
    <section>
      <div className={`${styles.constructor} ml-4 mt-25`}>
        {selectedBun &&
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${selectedBun.name} (верх)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
            extraClass="mr-4"
          />}

        <ScrollablePanel>
          <ul className={styles.constructorList}>
            {selectedIngredients && selectedIngredients.map((selectedIngredient, index) =>
              <li key={index}>
                <BurgerConstructorDraggableCard
                  text={selectedIngredient.name}
                  price={selectedIngredient.price}
                  image={selectedIngredient.image}
                />
              </li>
            )}
          </ul>
        </ScrollablePanel>

        {selectedBun &&
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${selectedBun.name} (низ)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
            extraClass="mr-4"
          />}
      </div>

      <div className={`${styles.summaryBlock} mt-10`}>
        <PriceBlock
          price={totalPrice}
          textClass="text_type_digits-medium"
          iconClass={styles.summaryPriceIcon}
        />

        <Button
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: ingredientsPropType,
  selectedIngredientIds: selectedIngredientIdsPropType,
};

export default BurgerIngredients;
