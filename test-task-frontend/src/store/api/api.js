import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_UR; 

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getHeaders = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};


instance.interceptors.request.use(
  (config) => {
    getHeaders();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (credentials) => {
  try {
    const response = await instance.post('/api/user/login', credentials);
    if (!response.data) {
      throw new Error('Login failed');
    }
    localStorage.setItem('accessToken', response.data.user.accessToken);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const logoutUser = async () => {
  try {
    localStorage.removeItem('accessToken');
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getEmployees = async ({ page = 1, name, location, sortBy = 'name', sortOrder = 'asc' }) => {
  try {
    const response = await instance.get('/api/employee', {
      params: { page, name, location, sortBy, sortOrder }, 
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching employees: ${error.message}`);
  }
};


export const signupUser = async (userData) => {
  try {
    const response = await instance.post('/api/user/signup', userData);
    if (!response.data) {
      throw new Error('Signup failed');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
