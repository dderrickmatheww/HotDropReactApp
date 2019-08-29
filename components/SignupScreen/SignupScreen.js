import React, {Component} from 'react';
import { View, StyleSheet, Button, TextInput, AsyncStorage, Picker } from 'react-native';
import Firebase from '../LoginScreen/firebase';
import { ScrollView } from 'react-native-gesture-handler';

export default class AboutScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Sign Up',
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
        passwordComfirm: '',
        userExist: false,
        platformSelectors: []
    }
    items = [
        {
            id: 0,
            name: 'PS4'
        },
        {
            id: 1,
            name: 'Xbox One'
        },
        {
            id: 2,
            name: 'Nitendo Switch'
        },
        {
            id: 3,
            name: 'PC (master race)'
        },
        {
            id: 4,
            name: 'Xbox 360'
        },
        {
            id: 5,
            name: 'PS3'
        },
        {
            id: 6,
            name: 'Other'
        }
    ]
    onSelectedItemsChange = selectedItems => {
        this.setState({ platformSelectors: selectedItems });
      };
    
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

                    await Firebase.auth.createUserWithEmailAndPassword(Firebase.signupInfo.email, Firebase.signupInfo.password )
                    
                    Firebase.auth.onAuthStateChanged( async (user) => {
                        if (user) {
                            await Firebase.database.ref('users').once('value').then((snap) => {this.setState({userExist: snap.child(Firebase.signupInfo.username).exists()})})
                            if(!this.state.userExist){
                                Firebase.database.ref('users').child(Firebase.signupInfo.username).child('userData').push({
                
                                    firstName: Firebase.signupInfo.firstName,
                                    lastName: Firebase.signupInfo.lastName,
                                    userName: Firebase.signupInfo.username
        
                                })
                                await AsyncStorage.setItem('user', JSON.stringify(user));
                            }
                            this.props.navigation.goBack();
                        } 
                        else {

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
             <ScrollView style={styles.aboutscreen}>
                <View>
                    <TextInput
                        style={{marginBottom: 2, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                        placeholder="First Name"
                        placeholderTextColor="darkslategray"
                        onChangeText={(text) => this.setState({firstName: text})}
                        returnKeyType = { "next" }
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    />
                    <TextInput
                        style={{marginBottom: 2, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                        placeholder="Last Name"
                        placeholderTextColor="darkslategray"
                        onChangeText={(text) => this.setState({lastName: text})}
                        ref={(input) => { this.secondTextInput = input; }}
                        returnKeyType = { "next" }
                        onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                    />
                    <TextInput
                        style={{marginBottom: 2, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                        placeholder="Email"
                        placeholderTextColor="darkslategray"
                        keyboardType={'email-address'}
                        onChangeText={(text) => this.setState({email: text})}
                        ref={(input) => { this.thirdTextInput = input; }}
                        returnKeyType = { "next" }
                        onSubmitEditing={() => { this.fourthTextInput.focus(); }}
                    />
                    <TextInput
                        style={{marginBottom: 2, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                        placeholder="Username"
                        placeholderTextColor="darkslategray"
                        onChangeText={(text) => this.setState({userName: text})}
                        ref={(input) => { this.fourthTextInput = input; }}
                        returnKeyType = { "next" }
                        onSubmitEditing={() => { this.fifthTextInput.focus(); }}
                    />
                    <TextInput
                        style={{marginBottom: 2, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                        placeholder="Password"
                        placeholderTextColor="darkslategray"
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({password: text})}
                        ref={(input) => { this.fifthTextInput = input; }}
                        returnKeyType = { "next" }
                        onSubmitEditing={() => { this.sixthTextInput.focus(); }}
                    />
                    <TextInput
                        style={{marginBottom: 2, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                        placeholder="Password again"
                        placeholderTextColor="darkslategray"
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({passwordComfirm: text})}
                        ref={(input) => { this.sixthTextInput = input; }}
                        onSubmitEditing={this.signup}
                    />
                    <Picker
                        selectedValue={this.state.platformSelectors}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({platformSelectors: itemValue})
                        }}
                    >

                    </Picker>
                    <Button
                        title="Sign-Up"
                        onPress={this.signup}
                    /> 
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