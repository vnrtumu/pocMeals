import React from 'react';
import {Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckOutScreen';
import OrderPlaced from '../screens/OrderPlaced';


const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.accentColor,
  },
  headerTintColor: 'white',
  headerTitle: 'A Screen',
};

const cartStackNavigator = {
  headerStyle: {
    backgroundColor: Colors.cartColor,
  },
  headerTintColor: 'white',
  headerTitle: 'A Screen',
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
    },
    CategoryMeals: CategoryMealsScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: 'white',
    },
  },
);

const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen,
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions,
  },
);

const CartNavigator = createStackNavigator(
  {
    Cart: CartScreen,
    MealDetail: MealDetailScreen,
    Checkout: CheckoutScreen,
    Order: OrderPlaced,
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: cartStackNavigator,
  },
);


const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: '#000',
      tabBarLabel: 'Meals',
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel: 'Favorites',
    },
  },
  Cart: {
    screen: CartNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-cart" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.cartColor,
      tabBarLabel: 'Cart',
    },
  },
};

const MealsFavTabNavigator = createMaterialBottomTabNavigator(tabScreenConfig, {
  activeTintColor: 'white',
  shifting: true,
  barStyle: {
    backgroundColor: Colors.primaryColor,
  },
});

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen,
  },
  {
    // navigationOptions: {
    //   drawerLabel: 'Filters!!!!'
    // },
    defaultNavigationOptions: defaultStackNavOptions,
  },
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: 'Meals',
      },
    },
    Filters: FiltersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: 'open-sans-bold',
      },
    },
  },
);

export default createAppContainer(MainNavigator);
