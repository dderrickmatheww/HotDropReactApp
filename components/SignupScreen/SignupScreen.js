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
        favoritePlatform: '',
        gender: '',
        imageURL: ''
    }
    
      signup = async () => {
        await Firebase.database.ref('users').once('value').then((snap) => { this.setState({userExist: snap.child(this.state.userName).exists()})})
        if(this.state.password === this.state.passwordComfirm) {
            if(!this.state.email || !this.state.password || !this.state.userName) {
                alert('Please enter correct sign-up information')
            }
            else if (this.state.userExist){
                alert('Username is already taken, please choose another one!');
            }
            else {
                Firebase.signupInfo.email = this.state.email
                Firebase.signupInfo.firstName = this.state.firstName
                Firebase.signupInfo.lastName = this.state.lastName
                Firebase.signupInfo.username = this.state.userName
                Firebase.signupInfo.password = this.state.password
                Firebase.signupInfo.platform = this.state.favoritePlatform
                Firebase.signupInfo.gender = this.state.gender
                Firebase.signupInfo.imageURL = this.state.imageURL
                try {

                    await Firebase.auth.createUserWithEmailAndPassword(Firebase.signupInfo.email, Firebase.signupInfo.password)
                    
                    Firebase.auth.onAuthStateChanged( async (user) => {
                        if (user) {
                            
                            Firebase.database.ref('users').child(Firebase.signupInfo.username).child('userData').push({
            
                                firstName: Firebase.signupInfo.firstName,
                                lastName: Firebase.signupInfo.lastName,
                                userName: Firebase.signupInfo.username,
                                platform: Firebase.signupInfo.platform,
                                gender: Firebase.signupInfo.gender,
                                email: Firebase.signupInfo.email,
                                imageURL: Firebase.signupInfo.imageURL
    
                            })
                            await AsyncStorage.setItem('user', JSON.stringify(user));
                            await AsyncStorage.setItem('userUserName', Firebase.signupInfo.username);
                            
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
                        placeholder="Profile Pic URL"
                        placeholderTextColor="darkslategray"
                        onChangeText={(text) => this.setState({imageURL: text})}
                        ref={(input) => { this.fifthTextInput = input; }}
                        returnKeyType = { "next" }
                    />
                    <Picker
                        selectedValue={this.state.favoritePlatform}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({favoritePlatform: itemValue})
                        }}
                    >
                        <Picker.Item label="Favorite gaming rig?" />
                        <Picker.Item label="PS4" value="PS4" />
                        <Picker.Item label="Xbox One" value="Xbox One" />
                        <Picker.Item label="PC (master race)" value="Master Race" />
                        <Picker.Item label="Switch" value="Switch" />
                        <Picker.Item label="PS3" value="PS3" />
                        <Picker.Item label="Xbox 360" value="Xbox 360" />
                    </Picker>
                    <Picker
                        selectedValue={this.state.gender}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({gender: itemValue})
                        }}
                        
                    >
                        <Picker.Item label="Gender?" />
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female"/>
                    </Picker>

                    <TextInput
                        style={{marginBottom: 2, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                        placeholder="Password"
                        placeholderTextColor="darkslategray"
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({password: text})}
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