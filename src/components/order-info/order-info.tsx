import { useMemo } from 'react';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import DataLoader from '../data-loader/DataLoader';
import ScrollablePanel from '../panels/scrollable-panel/scrollable-panel';
import IngredientCard from './ingredient-card/ingredient-card';
import PriceBlock from '../price-block/price-block';

import { useGetOrderQuery } from '../../services/api/order-api';
import { useGetIngredientsQuery } from '../../services/api/ingredients-api';
import { ORDER_STATUS } from '../../utils/consts';
import { BaseQueryFn, FetchArgs, TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react';
import { Ingredient, IngredientWithCount, ObjectMap } from '../../utils/types';
import { GetOrderResponse } from '../../utils/api-types';

import styles from './order-info.module.css';

type Props = {
  number: string;
};

const OrderInfo = ({ number }: Props) => {
  const orderData = useGetOrderQuery<TypedUseQueryHookResult<GetOrderResponse, FetchArgs, BaseQueryFn>>(number);
  const ingredientsData = useGetIngredientsQuery();

  const order = orderData?.data?.orders[0];
  const { name = '', status = 'created', createdAt = '' } = order || {};

  const ingredientsMap = useMemo(() => {
    const ingredients = ingredientsData?.data?.data || [];
    return ingredients.reduce(
      (result: ObjectMap<Ingredient>, ingredient) => {
        result[ingredient._id] = ingredient;
        return result;
      }, {});
  }, [ingredientsData]);

  const preparedIngredientsMap = useMemo(() => {
    const ingredients = order?.ingredients.map(id => ingredientsMap[id]) || [];
    return ingredients.reduce(
      (result: ObjectMap<IngredientWithCount>, ingredient) => {
        result[ingredient._id] = {
          ...ingredient,
          count: (result[ingredient._id]?.count || 0) + 1,
        };
        return result;
      }, {});
  }, [order, ingredientsMap]);

  const preparedIngredients = Object.values(preparedIngredientsMap);
  const totalPrice = preparedIngredients.reduce((result, ingredient) => result + ingredient.price * ingredient.count, 0);

  return (
    <DataLoader data={orderData} onRetry={orderData.refetch}>
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
          {Object.values(preparedIngredients).map((ingredient, index) =>
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
