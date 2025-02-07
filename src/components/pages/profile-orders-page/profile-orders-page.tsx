import { useMemo } from 'react';
import DataLoader from '../../data-loader/DataLoader';
import Orders from '../../orders/orders';

import { useGetUserOrdersQuery } from '../../../services/api/websocket/ws-orders-api';
import { useGetIngredientsQuery } from '../../../services/api/ingredients-api';

import { BaseQueryFn, FetchArgs, TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react';
import { WSAllOrdersResponse } from '../../../utils/websocket/ws-api-types';
import { Ingredient, ObjectMap } from '../../../utils/types';

const ProfileOrdersPage = () => {

  const ordersData = useGetUserOrdersQuery<TypedUseQueryHookResult<WSAllOrdersResponse, FetchArgs, BaseQueryFn>>();
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
    } = {},
  } = ordersData;

  return (
    <DataLoader data={ordersData} onRetry={ordersData.refetch}>
      <Orders orders={orders} ingredients={ingredientsMap} />
    </DataLoader>
  );
};

export default ProfileOrdersPage;
