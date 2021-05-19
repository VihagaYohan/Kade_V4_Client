import client from './client';

// get all product categories
const getAllCategories = () => client.get('/api/categories/');

export default {
  getAllCategories,
};
