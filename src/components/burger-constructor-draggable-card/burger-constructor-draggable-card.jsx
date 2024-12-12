import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { changeIngredientPosition, removeIngredient } from '../../services/burger-constructor';

import styles from './burger-constructor-draggable-card.module.css';

const BurgerConstructorDraggableCard = ({ id, index, text, price, image, extraClass }) => {

  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient_position',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, dropRef] = useDrop({
    accept: 'ingredient_position',

    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(changeIngredientPosition(dragIndex, hoverIndex));

      item.index = hoverIndex;
    }
  });

  dragRef(dropRef(ref));

  const handleRemove = () => {
    dispatch(removeIngredient(index));
  };

  return (
    <div className={`${styles.draggableCard} ${isDragging && styles.transparent}`} ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={text}
        price={price}
        thumbnail={image}
        extraClass={`${styles.centerContent} ${extraClass}`}
        handleClose={handleRemove}
      />
    </div>
  );
};

BurgerConstructorDraggableCard.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
};

export default React.memo(BurgerConstructorDraggableCard);
