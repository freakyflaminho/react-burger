import DataLoader from '../../data-loader/DataLoader';
import Orders from '../../orders/orders';
import { useMemo } from 'react';

import OrdersSummary from '../../orders-summary/orders-summary';
import { useGetAllOrdersQuery } from '../../../services/api/websocket/ws-orders-api';
import { useGetIngredientsQuery } from '../../../services/api/ingredients-api.ts';
import { BaseQueryFn, FetchArgs, TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react';
import { WSAllOrdersResponse } from '../../../utils/websocket/ws-api-types';

import { Ingredient, ObjectMap } from '../../../utils/types.ts';
import styles from './orders-feed-page.module.css';

const OrdersFeedPage = () => {
  const ordersData = useGetAllOrdersQuery<TypedUseQueryHookResult<WSAllOrdersResponse, FetchArgs, BaseQueryFn>>();
  const ingredientsData = useGetIngredientsQuery();

  const ingredientsMap = useMemo(() => {
    const ingredients = ingredientsData?.data?.data || [];
    return ingredients.reduce(
      (result: ObjectMap<Ingredient>, ingredient) => {
        result[ingredient._id] = ingredient;
        return result;
      }, {});
  }, [ingredientsData]);

  const {
    data: {
      orders = [],
      total = 0,
      totalToday = 0,
    } = {},
  } = ordersData;

  return (
    <DataLoader data={ordersData} onRetry={ordersData.refetch}>
      <main className={styles.page}>
        <Orders header="Лента заказов" orders={orders} ingredients={ingredientsMap} />
        <OrdersSummary orders={orders} total={total} totalToday={totalToday} />
      </main>
    </DataLoader>
  );
};

export default OrdersFeedPage;
