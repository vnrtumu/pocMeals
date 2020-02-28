import React from 'react';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';
import {View, Text} from 'react-native';

const CartScreen = props => {
  const cartMeals = useSelector(state => state.meals.cartItems);

  if (cartMeals.length === 0 || !cartMeals) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> No Cart Items are available</Text>
      </View>
    );
  }
  return (
    <MealList
      listData={cartMeals}
      navigation={props.navigation}
      imageUrl={cartMeals.url}
    />
  );
};

CartScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Cart Items',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Checkout"
          iconName="ios-checkmark-circle-outline"
          onPress={() => {
            navData.navigation.navigate('Checkout');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default CartScreen;
