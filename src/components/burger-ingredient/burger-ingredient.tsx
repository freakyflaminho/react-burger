import React from 'react';
import { useDrag } from 'react-dnd';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceBlock from '../price-block/price-block';
import { Ingredient } from '../../utils/types.ts';

import styles from './burger-ingredient.module.css';

type Props = {
  data: Ingredient;
  selectedCount: number;
  onClick: (ingredient: Ingredient) => void;
};

const BurgerIngredient = ({ data, selectedCount, onClick }: Props) => {
  const handleOnClick = () => onClick(data);

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: {
      id: data._id,
      type: data.type,
    },
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <div className={`${styles.ingredientCard} ${isDrag && styles.drag}`}
         onClick={handleOnClick}
         ref={dragRef}
         data-testid={data._id}
    >
      {selectedCount > 0 && <Counter count={selectedCount} size="default" />}
      <img
        src={data.image}
        alt={data.name}
        className="pl-4 pr-4"
      />
      <PriceBlock price={data.price} />
      <p className={`${styles.ingredientCardText} text text_type_main-default`}>
        {data.name}
      </p>
    </div>
  );
};

export default React.memo(BurgerIngredient);
