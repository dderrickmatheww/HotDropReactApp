import React, {Component} from 'react';
import { View, StyleSheet, Text, Linking } from 'react-native';

export default class AboutScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'About',
            headerStyle: {
            backgroundColor: 'rgb(1, 0, 24)',
          },
          headerTintColor: 'skyblue'
        };
      };
    
    render() {
        return(
            <View style={styles.aboutscreen}>
                <Text style={styles.text}>
                    Hot Drop is an app designed to be a one stop spot for info about any game you can think of.{"\n"}{"\n"}
                    News aggregation provided by <Text style={styles.link} onPress={ ()=>{ Linking.openURL('https://newsapi.org/')}}>News API</Text>.{"\n"}{"\n"}
                    Game database powered by <Text  style={styles.link}  onPress={ ()=>{ Linking.openURL('https://giantbomb.com/')}}>Giant Bomb</Text>.{"\n"}{"\n"}
                    Login/authentication provided by <Text  style={styles.link} onPress={ ()=>{ Linking.openURL('https://firebase.google.com/')}}>Google Firebase</Text>.
                    {"\n"}{"\n"}{"\n"}
                    <Text style={styles.link} onPress={ ()=>{ Linking.openURL('https://github.com/dderrickmatheww/HotDropReactApp')}}>Our GitHub Repo</Text>
                </Text>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    aboutscreen: {
        padding: 20,
        flex: 1,
        backgroundColor: '#545251',
        height: `100%`,
    },
    text:{
        fontSize: 16,
        color: `skyblue`,
        textAlign: `center`
    },
    link: {
        fontSize: 16,
        color: `yellow`,
        fontWeight: `bold`
    }
})