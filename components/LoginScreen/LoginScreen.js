import React, {Component} from 'react';
import { View, StyleSheet, Button, TextInput, AsyncStorage, BackHandler } from 'react-native';
import Firebase from './firebase';

export default class LoginScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Log In',
            headerStyle: {
            backgroundColor: 'rgb(1, 0, 24)',
          },
          headerTintColor: 'skyblue'
        };
    };

    state = {
        email: '',
        password: '',
    }
      login = async () => {
        if(!this.state.email || !this.state.password) {
            alert('Please enter correct login information')
        }
        else {
            Firebase.loginInfo.email = this.state.email
            Firebase.loginInfo.password = this.state.password
            try {
                await Firebase.auth.signInWithEmailAndPassword(Firebase.loginInfo.email, Firebase.loginInfo.password);
                Firebase.auth.onAuthStateChanged( async (user) => {
                    if (user) {
                        await AsyncStorage.setItem('user', JSON.stringify(user));
                        let userAuth = await AsyncStorage.getItem('user');
                        this.props.navigation.state.params.onNavigateBack(userAuth);
                        this.props.navigation.navigate('HomeScreen')
                    } 
                    else {
                        alert('Unsuccessful sign-up try again later');
                    }
                });
            }
            catch (err) {
                alert(err);
            }
        }
    }

    
    render() {
        return(
            <View style={styles.aboutscreen}>
                <TextInput
                    style={{marginBottom: 2, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                    placeholder="Email"
                    placeholderTextColor="darkslategray"
                    keyboardType={'email-address'}
                    onChangeText={(text) => this.setState({email: text})}
                />
                <TextInput
                    style={{marginBottom: 2, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                    placeholder="Password"
                    placeholderTextColor="darkslategray"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}
                />
                <Button
                    title="Log In"
                    onPress={this.login}/>
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