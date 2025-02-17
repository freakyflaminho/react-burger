import { Ingredient, IngredientWithCount, ObjectMap } from './types.ts';

export const prepareOrderIngredients = (ingredientIds: string[], availableIngredients: ObjectMap<Ingredient>): Ingredient[] => {
  return ingredientIds.reduce((result, id) => {
    if (availableIngredients[id]) {
      result.push(availableIngredients[id]);
    }
    return result;
  }, [] as Ingredient[]);
};

export const combineIngredients = (ingredients: Ingredient[]) => {
  const result: ObjectMap<IngredientWithCount> = {};
  ingredients.forEach(ingredient => result[ingredient._id]
    ? result[ingredient._id].count++
    : result[ingredient._id] = { ...ingredient, count: 1 });
  return Object.values(result);
};
