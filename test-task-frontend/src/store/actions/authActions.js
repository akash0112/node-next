import * as types from '../types/actionTypes';
import { loginUser, logoutUser } from '../api/api';

export const login = (credentials) => async (dispatch) => {
  try {
    const user = await loginUser(credentials);
    dispatch({
      type: types.LOGIN,
      payload: user,
    });
  } catch (error) {
    throw error
  }
};

export const logout = () => async (dispatch) => {
  try {
    await logoutUser();
    dispatch({
      type: types.LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};


export const fetchEmployeesSuccess = (employees) => ({
  type: types.FETCH_EMPLOYEES_SUCCESS,
  payload: employees,
});

