import PropTypes from 'prop-types';
import { INGREDIENT_TYPE } from './consts';

export const ingredientPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(INGREDIENT_TYPE)).isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
});

export const ingredientsPropType = PropTypes.arrayOf(ingredientPropType.isRequired).isRequired;

export const selectedIngredientIdsPropType = PropTypes.shape({
  bun: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.string),
});

export const tabRefsPropType = PropTypes.shape(
  Object.keys(INGREDIENT_TYPE).reduce(
    (acc, key) => ({
      ...acc,
      [key]: PropTypes.node.isRequired
    }),
    {}
  )
);
