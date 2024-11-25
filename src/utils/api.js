const BASE_URL = 'https://norma.nomoreparties.space/api';

const INGREDIENTS_URL = `${BASE_URL}/ingredients`;

export const getIngredients = async () => {
  return fetch(INGREDIENTS_URL)
    .then(resp =>
      resp.ok ? resp.json() : Promise.reject(resp))
    .then(data =>
      data.success ? data.data : Promise.reject(data));
};
