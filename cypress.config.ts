import { defineConfig } from 'cypress';
import { BASE_URL, INGREDIENTS_PATH, ORDER_PATH } from './src/utils/api';

export default defineConfig({
  viewportWidth: 1600,
  viewportHeight: 1200,
  e2e: {
    baseUrl: 'http://localhost:5173/',
  },
  env: {
    get_ingredients_url: `${BASE_URL}${INGREDIENTS_PATH}`,
    create_order_url: `${BASE_URL}${ORDER_PATH}`,
  },
});
