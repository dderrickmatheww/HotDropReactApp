import React, {Component} from 'react';
import { View, StyleSheet, Text, Linking } from 'react-native';

export default class AboutScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('text'),
            headerStyle: {
            backgroundColor: 'rgb(1, 0, 24)',
          },
          headerTintColor: 'skyblue'
        };
      };
    
    render() {
        return(
            <View style={styles.aboutscreen}>
                <Text>Hot Drop is an app designed to be a one stop spot for info about any game you can think of.</Text>
                <Text>News aggregation provided by <Text onPress={ ()=>{ Linking.openURL('https://newsapi.org/')}}>News API</Text>.</Text>
                <Text>Game database powered by <Text onPress={ ()=>{ Linking.openURL('https://giantbomb.com/')}}>Giant Bomb</Text>.</Text>
                <Text>Login/authentication provided by <Text onPress={ ()=>{ Linking.openURL('https://firebase.google.com/')}}>Google Firebase</Text>.</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    aboutscreen: {
        backgroundColor: '#545251'
    },
    text: {
        color: 'skyblue'
    }
})