import { useParams } from 'react-router';
import DataLoader from '../data-loader/DataLoader';

import { useGetIngredientsQuery } from '../../services/api/ingredients-api';
import { Ingredient } from '../../utils/types.ts';

import styles from './ingredient-details.module.css';
import { BaseQueryFn, FetchArgs, TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react';
import { GetIngredientsResponse } from '../../utils/api-types.ts';

const IngredientDetails = () => {
  const { id } = useParams();
  const data = useGetIngredientsQuery<TypedUseQueryHookResult<GetIngredientsResponse, FetchArgs, BaseQueryFn>>();

  const ingredients = data?.data?.data;
  const ingredient = ingredients?.find((el: Ingredient) => el._id === id);
  const { image_large, name, calories, proteins, fat, carbohydrates } = ingredient || {};

  return (
    <DataLoader data={data} onRetry={data.refetch}>
      <img src={image_large} alt={ingredient?.name} />
      <p className="text text_type_main-medium mt-4 mb-8">
        {name}
      </p>
      <ul className={`${styles.nutritionalValueList} mb-15`}>
        <li className="text text_type_main-default text_color_inactive">
          <p>Калории, ккал</p>
          <p>{calories}</p>
        </li>
        <li className="text text_type_main-default text_color_inactive">
          <p>Белки, г</p>
          <p>{proteins}</p>
        </li>
        <li className="text text_type_main-default text_color_inactive">
          <p>Жиры, г</p>
          <p>{fat}</p>
        </li>
        <li className="text text_type_main-default text_color_inactive">
          <p>Углеводы, г</p>
          <p>{carbohydrates}</p>
        </li>
      </ul>
    </DataLoader>
  );
};

export default IngredientDetails;
