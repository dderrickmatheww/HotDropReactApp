import React, { Component } from 'react';
import { ImageBackground, View, StyleSheet, Text } from 'react-native';


export default class Header extends Component {
  render() {
    let pic = {
      uri: 'https://raw.githubusercontent.com/dderrickmatheww/Project1/master/assets/images/banner.png'
    };
    return (
        <View style={{flex: 1, left: 0}}>
            <ImageBackground source={pic} style={{width: '100%'}}>
              <View style={{ paddingVertical: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', color: 'yellow', textShadowOffset:{width: 5, height: 5}, textShadowRadius:10}}>HOT DROP</Text>
                <Text style={{color: 'yellow'}}>Where we droppin'?</Text>
              </View> 
            </ImageBackground>
      </View>
    );
  }
}