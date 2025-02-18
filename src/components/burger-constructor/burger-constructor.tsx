import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useDrop } from 'react-dnd';

import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ScrollablePanel from '../panels/scrollable-panel/scrollable-panel';
import BurgerConstructorDraggableCard from '../burger-constructor-draggable-card/burger-constructor-draggable-card';
import BlankConstructorElement from '../blank-constructor-element/blank-constructor-element';
import PriceBlock from '../price-block/price-block';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import DataLoader from '../data-loader/DataLoader';

import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { useGetIngredientsState } from '../../services/api/ingredients-api';
import { useCreateOrderMutation } from '../../services/api/order-api';
import { isAuth } from '../../services/slices/auth-slice';
import { addBun, addIngredient, selectedIngredientsSelector } from '../../services/slices/burger-constructor-slice';
import { INGREDIENT_TYPE } from '../../utils/consts';
import { BaseQueryFn, FetchArgs, TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react';
import { CreateOrderResponse } from '../../utils/api-types';
import { DroppedIngredient, Ingredient, SelectedIngredient, SelectedIngredientIds } from '../../utils/types';

import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isUserAuth: boolean = useAppSelector(isAuth);
  const selectedIngredientIds: SelectedIngredientIds = useAppSelector(selectedIngredientsSelector);
  const [createOrder, order] = useCreateOrderMutation<TypedUseQueryHookResult<CreateOrderResponse, FetchArgs, BaseQueryFn>>();
  const { data: { data: ingredients = [] } = {} } = useGetIngredientsState();

  const selectedBun = useMemo(
    () => ingredients.find((ingredient: Ingredient) => ingredient._id === selectedIngredientIds.bun),
    [ingredients, selectedIngredientIds.bun],
  );

  const selectedIngredients = useMemo(
    () => selectedIngredientIds.ingredients.map(
      selected => {
        const ingredient = ingredients.find((ingredient: Ingredient) => ingredient._id === selected.id);
        return { ...ingredient, posId: selected.posId } as SelectedIngredient;
      }),
    [ingredients, selectedIngredientIds.ingredients]);

  const totalPrice = useMemo(
    () => (selectedBun?.price ?? 0) * 2 +
      selectedIngredients.reduce((sum: number, ingredient: Ingredient) => sum + ingredient.price, 0),
    [selectedBun, selectedIngredients]);

  const isOrderAvailable = selectedBun && selectedIngredients.length;

  const handleCreateOrderClick = () => {
    if (!isUserAuth) {
      navigate('/login');
    }

    const ids = [
      selectedIngredientIds.bun,
      ...selectedIngredientIds.ingredients.map(selected => selected.id),
      selectedIngredientIds.bun,
    ] as string[];

    createOrder(ids);
  };

  const closeOrderDetails = () => {
    order.reset();
  };

  const [{ canDrop }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient: DroppedIngredient) {
      if (ingredient.type === INGREDIENT_TYPE.BUN) {
        dispatch(addBun(ingredient.id));
      } else {
        dispatch(addIngredient(ingredient.id));
      }
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const dropClass = canDrop ? styles.hover : undefined;

  const orderId = order.data?.order.number || 0;

  return (
    <section>
      <div className={`${styles.constructor} ml-4 mt-25`} ref={dropTarget} data-test="constructor-container">
        {selectedBun ?
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${selectedBun.name} (верх)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
            extraClass={dropClass}
          /> :
          <BlankConstructorElement
            type="top"
            text="Выберите булки"
            extraClass={dropClass}
          />
        }

        <>
          {selectedIngredients.length ?
            <ScrollablePanel extraClass={styles.scrollablePanelPosition}>
              <ul className={styles.constructorList}>
                {selectedIngredients.map((selectedIngredient, index) =>
                  <li key={selectedIngredient.posId}>
                    <BurgerConstructorDraggableCard
                      id={selectedIngredient.posId}
                      index={index}
                      text={selectedIngredient.name}
                      price={selectedIngredient.price}
                      image={selectedIngredient.image}
                      extraClass={dropClass}
                    />
                  </li>,
                )}
              </ul>
            </ScrollablePanel> :
            <BlankConstructorElement text="Выберите начинку" extraClass={dropClass} />
          }
        </>

        {selectedBun ?
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${selectedBun.name} (низ)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
            extraClass={dropClass}
          /> :
          <BlankConstructorElement
            type="bottom"
            text="Выберите булки"
            extraClass={dropClass} />
        }
      </div>

      <div className={`${styles.summaryBlock} mt-10`} data-test='total-price'>
        <PriceBlock
          price={totalPrice}
          textClass="text_type_digits-medium"
          iconClass={styles.summaryPriceIcon}
        />

        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleCreateOrderClick}
          disabled={!isOrderAvailable}
          data-test='create-order'
        >
          Оформить заказ
        </Button>

        {!order.isUninitialized &&
          <Modal onClose={closeOrderDetails}>
            <DataLoader data={order} onRetry={handleCreateOrderClick}>
              <OrderDetails orderId={orderId} />
            </DataLoader>
          </Modal>
        }
      </div>
    </section>
  );
};

export default BurgerConstructor;
