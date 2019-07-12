import React, { Component } from 'react';
import { ImageBackground, View, StyleSheet, Text } from 'react-native';


export default class Header extends Component {
  render() {
    let pic = {
      uri: 'https://raw.githubusercontent.com/dderrickmatheww/Project1/master/assets/images/banner.png'
    };
    return (
        <View>
            <ImageBackground source={pic} style={styles.header}>
              <View style={styles.headerText}>
                <Text style={{fontWeight: 'bold', color: 'yellow', textShadowOffset:{width: 5, height: 5}, textShadowRadius:10}}>HOT DROP</Text>
                <Text style={{color: 'yellow', textShadowOffset:{width: 5, height: 5}}}>"Where we droppin'?"</Text>
              </View> 
            </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
   top: 0,
   left: 0,
   right: 0,
   width: '100%',
   justifyContent: 'center',
   alignItems: 'center',
  },
  headerText: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
  
});