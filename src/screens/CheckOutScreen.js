import React from 'react';
import { useSelector } from 'react-redux';

import MealList from '../components/MealList';
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';

function Item({ title }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const CheckoutScreen = props => {
    const cartMeals = useSelector(state => state.meals.cartItems);

    if (cartMeals.length === 0 || !cartMeals) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text> No Cart Items are available</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={cartMeals}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity style={styles.placeOrder} onPress={() => { props.navigation.navigate('Order') }}>
                <Text style={styles.placeOrderText}>Place Order</Text>
            </TouchableOpacity>
        </SafeAreaView>

    );
};



CheckoutScreen.navigationOptions = navData => {
    return {
        headerTitle: 'CheckOut',
    };
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 16,
    },
    placeOrder: {
        backgroundColor: 'blue',
        padding: 15,
        margin: 30,
        borderRadius: 20,
        alignItems: 'center',
    },
    placeOrderText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default CheckoutScreen;
