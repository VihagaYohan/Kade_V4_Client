import client from './client';

// get products by category
const getProductsByCategory = categoryId =>
  client.get('/api/categories/' + categoryId + '/products');

// get product by product ID
const getProuct = (productId) => client.get('/api/products/'+productId)

export default {
  getProductsByCategory,
  getProuct
};
