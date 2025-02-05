import DataLoader from '../../data-loader/DataLoader';
import Orders from '../../orders/orders';
import OrdersSummary from '../../orders-summary/orders-summary';

import { BaseQueryFn, FetchArgs, TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react';
import { useGetAllOrdersQuery } from '../../../services/api/websocket/ws-orders-api';
import { WSAllOrdersResponse } from '../../../utils/websocket/ws-api-types';

import styles from './orders-feed-page.module.css';

const OrdersFeedPage = () => {
  const data = useGetAllOrdersQuery<TypedUseQueryHookResult<WSAllOrdersResponse, FetchArgs, BaseQueryFn>>();

  const {
    data: {
      orders = [],
      total = 0,
      totalToday = 0,
    } = {},
  } = data;

  return (
    <DataLoader data={data} onRetry={data.refetch}>
      <main className={styles.page}>
        <Orders header="Лента заказов" />
        <OrdersSummary orders={orders} total={total} totalToday={totalToday} />
      </main>
    </DataLoader>
  );
};

export default OrdersFeedPage;
