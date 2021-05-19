import client from './client';

// user login
const login = (email, password) =>
  client.post('/api/auth/login', {email, password});

export default {
  login,
};
