import React from 'react';
import {useSelector} from 'react-redux';

import {CATEGORIES} from '../data/dummy-data';
import MealList from '../components/MealList';
import {View, Text} from 'react-native';

const CategoryMealsScreen = props => {
  const catId = props.navigation.getParam('categoryId');
  const availableMeals = useSelector(state => state.meals.filteredMeals);
  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0,
  );
  if (displayedMeals.length === 0) {
    return (
      <View>
        <Text>No recepies are available. Please check Your Filters</Text>
      </View>
    );
  }
  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
  };
};

export default CategoryMealsScreen;