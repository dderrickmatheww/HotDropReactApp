import React, {Component} from 'react';
import { View, StyleSheet, Button, TextInput, Linking } from 'react-native';

export default class AboutScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Log In',
            headerStyle: {
            backgroundColor: 'rgb(1, 0, 24)',
          },
          headerTintColor: 'skyblue'
        };
      };
    
    render() {
        return(
            <View style={styles.aboutscreen}>
                <TextInput
                    style={{marginBottom: 2, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                    placeholder="Username"
                    placeholderTextColor="darkslategray"
                />
                <TextInput
                    style={{marginBottom: 2, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                    placeholder="Password"
                    placeholderTextColor="darkslategray"
                    secureTextEntry={true}
                />
                <Button
                    title="Log In
                "/>
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