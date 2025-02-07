import { useMemo } from 'react';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import DataLoader from '../data-loader/DataLoader';
import ScrollablePanel from '../panels/scrollable-panel/scrollable-panel';
import IngredientCard from './ingredient-card/ingredient-card';
import PriceBlock from '../price-block/price-block';

import { useGetOrdersState, useLazyGetOrderQuery } from '../../services/api/order-api';
import { useGetIngredientsState, useLazyGetIngredientsQuery } from '../../services/api/ingredients-api';
import { useGetAllOrdersState, useGetUserOrdersState } from '../../services/api/websocket/ws-orders-api.ts';
import { ORDER_STATUS } from '../../utils/consts';
import { BaseQueryFn, FetchArgs, TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react';
import { combineIngredients, prepareOrderIngredients } from '../../utils/utils.ts';
import { Ingredient, ObjectMap } from '../../utils/types';
import { GetIngredientsResponse } from '../../utils/api-types.ts';

import styles from './order-info.module.css';

type Props = {
  number: number;
};

const OrderInfo = ({ number }: Props) => {

  const [getIngredients, ingredientsData] = useLazyGetIngredientsQuery<TypedUseQueryHookResult<GetIngredientsResponse, FetchArgs, BaseQueryFn>>();
  const [getOrder] = useLazyGetOrderQuery();

  const ingredientsState = useGetIngredientsState();
  const allOrdersState = useGetAllOrdersState();
  const userOrdersState = useGetUserOrdersState();
  const orderState = useGetOrdersState(number);

  const order = allOrdersState.data?.orders?.find(order => order.number === number)
    || userOrdersState.data?.orders?.find(order => order.number === number)
    || orderState.data?.orders[0];

  if (!order && orderState.isUninitialized) {
    getOrder(number);
  }

  if (ingredientsState.isUninitialized) {
    getIngredients();
  }

  const { name = '', status = 'created', createdAt = '' } = order || {};

  const ingredientsMap = useMemo(() => {
    const ingredients = ingredientsState?.data?.data || [];
    return ingredients.reduce(
      (result: ObjectMap<Ingredient>, ingredient) => {
        result[ingredient._id] = ingredient;
        return result;
      }, {});
  }, [ingredientsState]);

  const combinedIngredients = useMemo(() => {
    return order && combineIngredients(prepareOrderIngredients(order.ingredients, ingredientsMap)) || [];
  }, [order, ingredientsMap]);

  const totalPrice = combinedIngredients.reduce((result, ingredient) =>
      result + ingredient.price * ingredient.count
    , 0);

  return (
    <DataLoader data={ingredientsData} onRetry={() => getIngredients()}>
      <div className={styles.topSection}>
        <p className={styles.name}>
          {name}
        </p>
        <p className={`${styles.status} ${status === 'done' && styles.doneStatus}`}>
          {ORDER_STATUS[status]}
        </p>
      </div>

      <div className={styles.centerSection}>
        <p className={styles.ingredientsHeader}>Состав:</p>
        <ScrollablePanel extraClass={styles.scrollableBlock}>
          {combinedIngredients.map((ingredient, index) =>
            <IngredientCard
              key={index}
              name={ingredient.name}
              image={ingredient.image_mobile}
              count={ingredient.count}
              price={ingredient.price}
            />,
          )}
        </ScrollablePanel>
      </div>

      <div className={styles.bottomSection}>
        <FormattedDate className={styles.createdDate} date={new Date(createdAt)} />
        <PriceBlock price={totalPrice} />
      </div>
    </DataLoader>
  );
};

export default OrderInfo;
