import Client from './client';

// get all product categories
const getAllCatgories = () => Client.get('api/categories');

export default {
  getAllProductCategory,
};
