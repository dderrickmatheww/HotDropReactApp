import React, { Component } from 'react';
import { ImageBackground, View, StyleSheet, Text } from 'react-native';


export default class Header extends Component {
  render() {
    let pic = {
      uri: 'https://raw.githubusercontent.com/dderrickmatheww/Project1/master/assets/images/banner.png'
    };
    return (
        <View style={styles.headerText}>
            <ImageBackground source={pic} style={styles.header}>
                <Text>HOT DROP</Text>
                <Text>"Where we droppin'?"</Text>
            </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%', 
    height: '60%'
  },
  headerText: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
});