import axios from 'axios';
import { getLocalStorage } from '@/utils';

const { API_ROOT } = process.env;

export const register = async (user = {}) => {
  try {
    const { data } = await axios.post(`${API_ROOT}/register`, { user });
    return data;
  } catch (error) {
    throw error;
  }
};

export const login = async (user = {}) => {
  try {
    const { data } = await axios.put(`${API_ROOT}/login`, { user });
    return data;
  } catch (error) {
    throw error;
  }
};

export const refresh = async () => {
  try {
    const token = getLocalStorage('token');
    const { data } = await axios({
      url: `${API_ROOT}/refresh`,
      method: 'PUT',
      headers: {
        token
      }
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getTodos = async (id) => {
  try {
    const token = getLocalStorage('token');
    const { data } = await axios({
      url: `${API_ROOT}/todos?user=${id}`,
      method: 'GET',
      headers: {
        token
      }
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const addTodo = async (todo) => {
  try {
    const token = getLocalStorage('token');
    const { data } = await axios({
      url: `${API_ROOT}/todos`,
      method: 'POST',
      headers: {
        token
      },
      data: todo
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const editTodo = async (todo) => {
  try {
    const token = getLocalStorage('token');
    const { data } = await axios({
      url: `${API_ROOT}/todos/${todo.id}`,
      method: 'PUT',
      headers: {
        token
      },
      data: {
        ...todo
      }
    });
    return data;
  } catch (error) {
    throw error;
  }
};


export const removeTodo = async (id, user) => {
  try {
    const token = getLocalStorage('token');
    const { data } = await axios({
      url: `${API_ROOT}/todos/${id}`,
      method: 'DELETE',
      headers: {
        token
      },
      data: {
        user
      }
    });
    return data;
  } catch (error) {
    throw error;
  }
};
