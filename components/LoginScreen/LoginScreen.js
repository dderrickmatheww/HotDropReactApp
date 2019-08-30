import React, {Component} from 'react';
import { View, StyleSheet, Button, TextInput, AsyncStorage } from 'react-native';
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
        userName: '',
        userExist: false
    }
      login = async () => {
        await Firebase.database.ref('users').once('value').then((snap) => { this.setState({userExist: snap.child(this.state.userName).exists()})})
        if(!this.state.email || !this.state.password || !this.state.userName) {
            alert('Please enter correct login information')
        }
        else if (!this.state.userExist){
            alert('Username does not exist, please enter valid username')
        }
        else {
            Firebase.loginInfo.email = this.state.email
            Firebase.loginInfo.password = this.state.password
            Firebase.loginInfo.userName = this.state.userName
            try {
                await Firebase.auth.signInWithEmailAndPassword(Firebase.loginInfo.email, Firebase.loginInfo.password);
                Firebase.auth.onAuthStateChanged( async (user) => {
                    if (user) {
                        await AsyncStorage.setItem('userUserName', Firebase.loginInfo.userName);
                        await AsyncStorage.setItem('user', JSON.stringify(user));
                        this.props.navigation.goBack();
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
                    returnKeyType = { "next" }
                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                />
                <TextInput
                    style={{marginBottom: 2, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                    placeholder="Username"
                    placeholderTextColor="darkslategray"
                    returnKeyType = { "next" }
                    onChangeText={(text) => this.setState({userName: text})}
                    ref={(input) => { this.secondTextInput = input; }}
                    onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                />
                <TextInput
                    style={{marginBottom: 2, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                    placeholder="Password"
                    placeholderTextColor="darkslategray"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}
                    ref={(input) => { this.thirdTextInput = input; }}
                    onSubmitEditing={this.login}
                />
                <Button
                    title="Log In"
                    onPress={this.login}
                />
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