import React, { Component } from 'react';
import { ImageBackground, View, StyleSheet, Text } from 'react-native';


export default class Header extends Component {
  render() {
    return (
        <View style={{flex: 1, left: 0}}>
            <ImageBackground source={require("../../assets/banner.png")} style={{width: '100%', borderBottomColor: 'black', borderBottomWidth: 1}}>
              <View style={{ paddingVertical: 30, justifyContent: 'center', alignItems: 'center'}}>
              </View> 
            </ImageBackground>
      </View>
    );
  }
}