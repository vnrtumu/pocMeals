import React, { useEffect, useCallback } from 'react';
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/actions/meals';
import { addItemToCart } from '../store/actions/meals';

import HeaderButton from '../components/HeaderButton';

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

const MealDetailScreen = props => {
  const mealId = props.navigation.getParam('mealId');
  const singleMeals = useSelector(state => state.meals.meals);
  const selectedMeal = singleMeals.find(meal => meal.id === mealId);
  const dispatch = useDispatch();
  const isAdded = props.navigation.getParam('isAdded');


  const currentMealIsFavorite = useSelector(state =>
    state.meals.favoriteMeals.some(meal => meal.id === mealId),
  );

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavorite });
  }, [currentMealIsFavorite]);



  const currentMealIsCarted = useSelector(state =>
    state.meals.cartItems.some(meal => meal.id === mealId),
  );
  const addItemHandler = useCallback(() => {
    dispatch(addItemToCart(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ addItem: addItemHandler });
  }, [addItemHandler]);

  useEffect(() => {
    props.navigation.setParams({ isAdded: currentMealIsCarted });
  }, [currentMealIsCarted]);





  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text>$ {selectedMeal.duration}</Text>
        <Text>{selectedMeal.complexity.toUpperCase()}</Text>
        <Text>{selectedMeal.affordability.toUpperCase()}</Text>
      </View>
      {(() => {
        if (isAdded == true) {
          return (
          <TouchableOpacity style={styles.addToCart}>
            <Text style={styles.addToCartText}>Item Added To Cart</Text>
          </TouchableOpacity>
          );
        } else {
          return (<TouchableOpacity style={styles.addToCart} onPress={addItemHandler}>
            <Text style={styles.addToCartText}>Add To Cart</Text>
          </TouchableOpacity>);
        }
      })()}

      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = navigationData => {
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFav = navigationData.navigation.getParam('toggleFav');
  const isFavorite = navigationData.navigation.getParam('isFav');
  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFav}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  MealDetailScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
  addToCart: {
    alignSelf: 'center',
    backgroundColor: '#4a148c',
    padding: 10,
    borderRadius: 5,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MealDetailScreen;
