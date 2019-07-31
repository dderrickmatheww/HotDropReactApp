import React, {Component} from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import Firebase from '../LoginScreen/firebase';
import { ScrollView } from 'react-native-gesture-handler';

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
    state = {
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordComfirm: ''
    }
      signup = async () => {
        if(this.state.password === this.state.passwordComfirm) {
            if(!this.state.email || !this.state.password) {
                alert('Please enter correct sign-up information')
            }
            else {
                Firebase.signupInfo.email = this.state.email
                Firebase.signupInfo.firstName = this.state.firstName
                Firebase.signupInfo.lastName = this.state.lastName
                Firebase.signupInfo.username = this.state.userName
                Firebase.signupInfo.password = this.state.password
                try {
                    await Firebase.auth.createUserWithEmailAndPassword(Firebase.signupInfo.email,  Firebase.signupInfo.password);
                    Firebase.auth.onAuthStateChanged((user) => {
                        if (user) {
                            this.props.navigation.popToTop('HomeScreen');
                        } else {
                            alert('Unsuccessful sign-up try again later');
                        }
                    });
                } 
                catch (err) {
                    alert(err);
                }
            }
        } else {
            alert("Passwords do not match");
        }
    }

    
    render() {
        return(
             <ScrollView>
                <View style={styles.aboutscreen}>
                    <TextInput
                        style={{marginBottom: 2, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                        placeholder="First Name"
                        placeholderTextColor="darkslategray"
                        onChangeText={(text) => this.setState({firstName: text})}
                    />
                    <TextInput
                        style={{marginBottom: 2, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                        placeholder="Last Name"
                        placeholderTextColor="darkslategray"
                        onChangeText={(text) => this.setState({lastName: text})}
                    />
                    <TextInput
                        style={{marginBottom: 2, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                        placeholder="Email"
                        placeholderTextColor="darkslategray"
                        keyboardType={'email-address'}
                        onChangeText={(text) => this.setState({email: text})}
                    />
                    <TextInput
                        style={{marginBottom: 2, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                        placeholder="Username"
                        placeholderTextColor="darkslategray"
                        onChangeText={(text) => this.setState({userName: text})}
                    />
                    <TextInput
                        style={{marginBottom: 2, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                        placeholder="Password"
                        placeholderTextColor="darkslategray"
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({password: text})}
                    />
                    <TextInput
                        style={{marginBottom: 2, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                        placeholder="Password again"
                        placeholderTextColor="darkslategray"
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({passwordComfirm: text})}
                    />
                    <Button
                        title="Sign-Up"
                        onPress={this.signup}/> 
                </View> 
            </ScrollView>
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