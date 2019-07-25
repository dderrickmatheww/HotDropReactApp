import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import FooterTab from "./footertab";


export default class Footer extends Component {
  render() {
    return (
        <View style={styles.footer}>
            <FooterTab tablabel='Home' />
            <FooterTab tablabel='Account' />
            <FooterTab tablabel='Log Out' />
        </View> 
    );
  }
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        flex: 1,
        width: `100%`,
        backgroundColor: `#000`,
        flexDirection: 'row',
        justifyContent: 'center',
        height: `auto`,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: `darkslategray`,
        borderBottomColor: `darkslategray`
    }
})