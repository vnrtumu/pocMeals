export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';
export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';

export const toggleFavorite = id => {
  return {
    type: TOGGLE_FAVORITE,
    mealId: id,
  };
};

export const setFilters = filtereSettings => {
  return {
    type: SET_FILTERS,
    filters: filtereSettings,
  };
};


export const addItemToCart = id => {
  return {
    type: ADD_ITEM_TO_CART,
    mealId: id,
  };
};