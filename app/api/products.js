import client from './client';

const getProductsByCategory = categoryId =>
  client.get('/api/categories/' + categoryId + '/products');

export default {
  getProductsByCategory,
};
