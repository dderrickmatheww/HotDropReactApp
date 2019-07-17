import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';


export default class Footer extends Component {
  render() {
    return (
        <View style={styles.footer}>
            <View>
                <Text style={styles.tab}>Home</Text>
            </View>
            <View>
                <Text style={styles.tab}>Login</Text>
            </View>
            <View>
                <Text style={styles.tab}>Search</Text>
            </View>
        </View> 
    );
  }
}

const styles = StyleSheet.create({
    footer: {
        bottom: 0,
        width: `100%`,
        backgroundColor: `#000`,
        flexDirection: 'row',
        justifyContent: 'center',
        height: `auto`,
        borderTopWidth: 1,
        borderTopColor: `rgb(64, 64, 64)`
    },
    tab: {
        fontFamily: 'sans-serif-thin',
        paddingVertical: 4,
        paddingHorizontal: 35,
        borderRightWidth: 0.5,
        borderLeftWidth: 0.5,
        textAlign: `center`,
        borderLeftColor: `rgb(128, 128, 128)`,
        borderRightColor: `rgb(128, 128, 128)`,
        color: `rgb(128, 128, 128)`,
        fontSize: 22,
    }
})