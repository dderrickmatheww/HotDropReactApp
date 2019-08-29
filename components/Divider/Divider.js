import React, {Component} from 'react';
import {View, StyleSheet } from 'react-native';

export default class Divider extends Component {
    render(){
        return(
            <View style={[styles.hr, {borderBottomColor: this.props.color}]}>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    hr: {
        marginHorizontal: 2,
        marginVertical: 7,
        borderBottomWidth: 1,
    }
})