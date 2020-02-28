import {MEALS} from '../../data/dummy-data';
import {TOGGLE_FAVORITE, SET_FILTERS, ADD_ITEM_TO_CART} from '../actions/meals';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
  cartItems: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingMealIndex = state.favoriteMeals.findIndex(
        meal => meal.id === action.mealId,
      );
      if (existingMealIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingMealIndex, 1);
        return {...state, favoriteMeals: updatedFavMeals};
      } else {
        const meal = state.meals.find(meal => meal.id === action.mealId);
        return {...state, favoriteMeals: state.favoriteMeals.concat(meal)};
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredMeals = state.meals.filter(meal => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        if (appliedFilters.vegetarian && !meal.isVegitarian) {
          return false;
        }
        return true;
      });
      return {...state, filteredMeals: updatedFilteredMeals};

      case ADD_ITEM_TO_CART:
        const existingCartItem = state.cartItems.findIndex(
          meal => meal.id === action.mealId,
        );
        if (existingCartItem >= 0) {
          const updatedCartItems= [...state.cartItems];
          updatedCartItems.splice(existingCartItem, 1);
          return {...state, cartItems: updatedCartItems};
        } else {
          const meal = state.meals.find(meal => meal.id === action.mealId);
          return {...state, cartItems: state.cartItems.concat(meal)};
        }
    default:
      return state;
  }
  // return state;
};

export default mealsReducer;
