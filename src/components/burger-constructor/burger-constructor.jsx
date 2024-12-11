import { useMemo, useState } from 'react';
import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ScrollablePanel from '../panels/scrollable-panel/scrollable-panel';
import BurgerConstructorDraggableCard from '../burger-constructor-draggable-card/burger-constructor-draggable-card';
import BlankConstructorElement from '../blank-constructor-element/blank-constructor-element';
import PriceBlock from '../price-block/price-block';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { selectedIngredientIdsPropType } from '../../utils/prop-types';
import { useGetIngredientsQuery } from '../../services/burger-ingredients';
import styles from './burger-constructor.module.css';

const BurgerIngredients = ({ selectedIngredientIds }) => {

  const [isOrderDetailsVisible, setOrderDetailsVisible] = useState(false);
  const { data: { data: ingredients } } = useGetIngredientsQuery();

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
    () => selectedBun?.price ?? 0 +
      selectedIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0),
    [selectedBun, selectedIngredients]);

  const openOrderDetails = () => setOrderDetailsVisible(true);
  const closeOrderDetails = () => setOrderDetailsVisible(false);

  return (
    <section>
      <div className={`${styles.constructor} ml-4 mt-25`}>
        {selectedBun ?
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${selectedBun.name} (верх)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
            extraClass="mr-4"
          /> :
          <BlankConstructorElement type="top" text="Выберите булки" />}

        <>
          {selectedIngredients.length ?
            <ScrollablePanel>
              <ul className={styles.constructorList}>
                {selectedIngredients.map((selectedIngredient, index) =>
                  <li key={index}>
                    <BurgerConstructorDraggableCard
                      text={selectedIngredient.name}
                      price={selectedIngredient.price}
                      image={selectedIngredient.image}
                    />
                  </li>
                )}
              </ul>
            </ScrollablePanel> :
            <BlankConstructorElement text="Выберите начинку" />
          }
        </>

        {selectedBun ?
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${selectedBun.name} (низ)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
            extraClass="mr-4"
          /> :
          <BlankConstructorElement type="bottom" text="Выберите булки" />}
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
          onClick={openOrderDetails}
        >
          Оформить заказ
        </Button>

        {isOrderDetailsVisible &&
          <Modal onClose={closeOrderDetails}>
            <OrderDetails orderId="034536" />
          </Modal>
        }
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  selectedIngredientIds: selectedIngredientIdsPropType,
};

export default BurgerIngredients;
