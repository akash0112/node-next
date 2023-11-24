import {
    FETCH_EMPLOYEES_SUCCESS,
    SET_PAGE,
    SET_NAME_FILTER,
    SET_LOCATION_FILTER,
    SET_SORT_BY,
    SET_SORT_ORDER,
  } from "../types/actionTypes";
  
  const initialState = {
    employees: [],
    loading: false,
    error: null,
    filters: {
      page: 1,
      name: '',
      location: '',
      sortBy: 'name',
      sortOrder: 'asc',
    },
  };
  
  const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_EMPLOYEES_SUCCESS:
        return {
          ...state,
          loading: false,
          employees: action.payload,
          error: null,
        };
      case SET_PAGE:
        return {
          ...state,
          filters: {
            ...state.filters,
            page: action.payload,
          },
        };
      case SET_NAME_FILTER:
        return {
          ...state,
          filters: {
            ...state.filters,
            name: action.payload,
          },
        };
      case SET_LOCATION_FILTER:
        return {
          ...state,
          filters: {
            ...state.filters,
            location: action.payload,
          },
        };
      case SET_SORT_BY:
        return {
          ...state,
          filters: {
            ...state.filters,
            sortBy: action.payload,
          },
        };
      case SET_SORT_ORDER:
        return {
          ...state,
          filters: {
            ...state.filters,
            sortOrder: action.payload,
          },
        };
      default:
        return state;
    }
  };
  
  export default employeeReducer;
  