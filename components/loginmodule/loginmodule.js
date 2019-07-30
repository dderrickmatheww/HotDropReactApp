import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, TextInput} from 'react-native';
import Firebase from './firebase';

  
export default class Login extends React.Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
          title: 'Login or Sign up',
          headerStyle: {
            backgroundColor: 'rgb(1, 0, 24)',
          },
          headerTintColor: 'skyblue'
        };
      };
    state = {
        loginTog: false,
        signupTog: false,
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordComfirm: ''
    }
    LoginTog = () => {
        const newState = !this.state.loginTog
        this.setState({loginTog: newState});
        this.setState({signupTog: !newState});
    }
    SignupTog = () => {
        const newState = !this.state.signupTog
        this.setState({signupTog: newState});
        this.setState({loginTog: !newState});
    }

    login = async () => {
        Firebase.loginInfo.username = this.state.userName
        Firebase.loginInfo.password = this.state.password
        try {
            await Firebase.auth.signInWithEmailAndPassword(Firebase.loginInfo.username, Firebase.loginInfo.password);
            this.props.navigation.navigate('HomeScreen');
        }
        catch (err) {
            alert(err);
        }
    }
    FBlogin = async () => {
        var provider = new Firebase.auth.FacebookAuthProvider();
        provider.addScope('user_birthday', 'email', 'user_age_range', 'user_gender', 'user_hometown');
        Firebase.auth.signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            console.log(errorCode);
            var errorMessage = error.message;
            console.log(errorMessage);
            // The email of the user's account used.
            var email = error.email;
            console.log(email);
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(credential);
            // ...
          });
    }
    signup = async () => {
        
            Firebase.signupInfo.email = this.state.email
            Firebase.signupInfo.firstName = this.state.firstName
            Firebase.signupInfo.lastName = this.state.lastName
            Firebase.signupInfo.username = this.state.userName
            Firebase.signupInfo.password = this.state.password

        try {
            await Firebase.auth.createUserWithEmailAndPassword(Firebase.signupInfo.email,  Firebase.signupInfo.password);
            this.props.navigation.navigate('HomeScreen');
        } 
        catch (err) {
            alert(err);
        }
    }

    render() {
        return(
                <View style={{justifyContent: 'center', alignContent: 'center', backgroundColor: "#363534"}}>
                    <TouchableOpacity style={{ 
                            backgroundColor: `darkslategray`,
                            padding: 5,
                            fontSize: 14,
                            borderRadius: 2,
                            marginRight: 5,
                            bottom: 0,
                            justifyContent: 'center',
                            alignContent: 'center'
                            }} onPress={this.LoginTog}><Text>Login</Text></TouchableOpacity>
                    
                    { this.state.loginTog ? 
                    <View style={{justifyContent: 'center', alignContent: 'center'}}> 
                        <TextInput keyboardType={'email-address'} placeholder='Username' placeholderTextColor='gray' style={{height: 40, width: '100%', backgroundColor: 'rgb(52, 58, 64)', borderColor: 'rgb(206, 212, 218);', fontWeight:'bold', borderWidth: 1, color: 'white'}} onChangeText={(text) => this.setState({userName: text})}/>
                        <TextInput placeholder='Password' secureTextEntry={true} placeholderTextColor='gray' style={{height: 40, width: '100%', backgroundColor: 'rgb(52, 58, 64)', borderColor: 'rgb(206, 212, 218);', fontWeight:'bold', borderWidth: 1, color: 'white'}} onChangeText={(text) => this.setState({password: text})}/>
                        <TouchableOpacity
                            onPress={this.login}
                            title="Login"
                            style={{justifyContent: 'center', alignContent: 'center'}}
                        >
                            <Text style={{alignContent: 'center'}}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                        : null 
                    }

                    <TouchableOpacity style={{ 
                            backgroundColor: `darkslategray`,
                            padding: 5,
                            fontSize: 14,
                            borderRadius: 2,
                            marginRight: 5,
                            bottom: 0,
                            justifyContent: 'center',
                            alignContent: 'center'
                    }} onPress={this.SignupTog}><Text>Not a member? Sign up</Text></TouchableOpacity>

                    { this.state.signupTog ? 
                    <View style={{justifyContent: 'center', alignContent: 'center'}}>   
                        <TextInput placeholder='First Name' placeholderTextColor='gray'  style={{height: 40, width: '100%', backgroundColor: 'rgb(52, 58, 64)', borderColor: 'rgb(206, 212, 218);', fontWeight:'bold', borderWidth: 1, color: 'white'}} onChangeText={(text) => this.setState({firstName: text})}/>
                        <TextInput placeholder='Last Name' placeholderTextColor='gray' style={{height: 40, width: '100%', backgroundColor: 'rgb(52, 58, 64)', borderColor: 'rgb(206, 212, 218);', fontWeight:'bold', borderWidth: 1, color: 'white'}} onChangeText={(text) => this.setState({lastName: text})}/>
                        <TextInput placeholder='Email' keyboardType={'email-address'} placeholderTextColor='gray' style={{height: 40, width: '100%', backgroundColor: 'rgb(52, 58, 64)', borderColor: 'rgb(206, 212, 218);', fontWeight:'bold', borderWidth: 1, color: 'white'}} onChangeText={(text) => this.setState({email: text})}/>
                        <TextInput placeholder='Username' placeholderTextColor='gray' style={{height: 40, width: '100%', backgroundColor: 'rgb(52, 58, 64)', borderColor: 'rgb(206, 212, 218);', fontWeight:'bold', borderWidth: 1, color: 'white'}} onChangeText={(text) => this.setState({userName: text})}/>
                        <TextInput placeholder='Password' secureTextEntry={true} placeholderTextColor='gray' style={{height: 40, width: '100%', backgroundColor: 'rgb(52, 58, 64)', borderColor: 'rgb(206, 212, 218);', fontWeight:'bold', borderWidth: 1, color: 'white'}} onChangeText={(text) => this.setState({password: text})}/>
                        <TextInput placeholder='Password Comfirm' secureTextEntry={true} placeholderTextColor='gray' style={{height: 40, width: '100%', backgroundColor: 'rgb(52, 58, 64)', borderColor: 'rgb(206, 212, 218);', fontWeight:'bold', borderWidth: 1, color: 'white'}} onChangeText={(text) => this.setState({passwordComfirm: text})}/>
                        <TouchableOpacity
                            onPress={this.signup}
                            title="Sign up"
                            style={{height: 40, width: '100%', justifyContent: 'center', alignContent: 'center'}}
                        >
                            <Text style={{justifyContent: 'center', alignContent: 'center'}}>
                                Sign up
                            </Text>
                        </TouchableOpacity>
                    </View>  
                        : null
                    }
                    <TouchableOpacity style={{ 
                            backgroundColor: `darkslategray`,
                            padding: 5,
                            fontSize: 14,
                            borderRadius: 2,
                            marginRight: 5,
                            bottom: 0,
                            justifyContent: 'center',
                            alignContent: 'center'
                            }} onPress={this.FBlogin}><Text>Login with Facebook</Text></TouchableOpacity>
                </View>
        )
    }
    
           
}

