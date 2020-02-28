import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const OrderPlaced = props => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.imgContainer}>
                <Text style={styles.approvedText}>Order Approved</Text>
                <Image source={require('../assets/tenor.gif')} style={{width: 80, height: 80}} />
            </View>
            <View style={styles.summaryContainer}>
                    
            </View>
        </View>
    );
}

OrderPlaced.navigationOptions = navData => {
    return {
        headerTitle: 'Complete Order',
    };
};


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    imgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    approvedText: {
        fontSize: 22,
        fontWeight: 'bold'
    },
})
export default OrderPlaced;