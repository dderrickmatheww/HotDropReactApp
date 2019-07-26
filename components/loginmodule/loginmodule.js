import React from "react";
import { Text, View, StyleSheet, TouchableHighlight, KeyboardAvoidingView, AsyncStorage, TextInput} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'

var config = {
    apiKey: "AIzaSyAij5cJMyfiiwCGa8DptFJVgx2mNkR0rrE",
    authDomain: "hotdropauth.firebaseapp.com",
    databaseURL: "https://hotdropauth.firebaseio.com",
    projectId: "hotdropauth",
    storageBucket: "hotdropauth.appspot.com",
    messagingSenderId: "1053617876000"
  };

  firebase.initializeApp(config);
// Calling the following function will open the FB login dialogue:
export async function facebookLogin() {
  try {
    const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      // handle this however suites the flow of your app
      throw new Error('User cancelled request'); 
    }

    console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

    // get the access token
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      // handle this however suites the flow of your app
      throw new Error('Something went wrong obtaining the users access token');
    }

    // create a new firebase credential with the token
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

    // login with credential
    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

    console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))
  } catch (e) {
    console.error(e);
  }
}
  // update firestore settings
  // Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());
//   var uiConfig = {
//     callbacks: {
//       signInSuccessWithAuthResult: function(authResult, redirectUrl) {
//         // User successfully signed in.
//         // Return type determines whether we continue the redirect automatically
//         // or whether we leave that to developer to handle.
//         return false;
//       },
//       uiShown: function() {
//         // The widget is rendered.
//         // Hide the loader.
//         document.getElementById('loader').style.display = 'none';
//       }
//     },
//     // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//     signInFlow: 'popup',
//     signInSuccessUrl: 'index.html',
//     signInOptions: [
//         firebase.auth.EmailAuthProvider.PROVIDER_ID,
//       // Leave the lines as is for the providers you want to offer your users.
//     //   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//      firebase.auth.FacebookAuthProvider.PROVIDER_ID
//     //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//     //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
//     //   firebase.auth.PhoneAuthProvider.PROVIDER_ID
//     ],
//     // Terms of service url.
//     tosUrl: '<your-tos-url>',
//     // Privacy policy url.
//     privacyPolicyUrl: 'index.html'
//   };

// // The start method will wait until the DOM is loaded.
// ui.start('#firebaseui-auth-container', uiConfig);

//   var onAuth = auth.onAuthStateChanged(user => {
//     if (user) {
//       console.log('user logged in: ', user);
//       $("#login").hide()
     
    
      
//     } else {
//       console.log('user logged out');
//       $("#login").show()
      
   
//     }
//     console.log(user)
//   })
  
//   //logout
//   const logout = document.querySelector('#logout');
//   logout.addEventListener('click', (e) => {
//     e.preventDefault();
//     auth.signOut();
//   });


export default class Login extends React.Component {
    loginFacebook = () => {
        return (dispatch) => {
            LoginManager.logInWithReadPermissions(['public_profile', 'user_friends', 'email'])
              .then(
                (result) => {
                  if (result.isCancelled) {
                    Alert.alert('Whoops!', 'You cancelled the sign in.');
                  } else {
                    AccessToken.getCurrentAccessToken()
                      .then((data) => {
                        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                        firebase.auth().signInWithCredential(credential)
                          .then(loginUserSuccess(dispatch))
                          .catch((error) => {
                            loginSingUpFail(dispatch, error.message);
                          });
                      });
                  }
                },
                (error) => {
                  Alert.alert('Sign in error', error);
                },
              );
          };
    }
    onFBButtonPress = () => {
        this.props.loginFacebook();
    }
    
            render() {
                return(
                    <KeyboardAvoidingView behavior='padding'>

                        <View>

                            <Text>LOGIN</Text>

                            <TextInput placeholder='Username' onChangeText={(username) => this.setState({username: username})}/>
                            <TextInput placeholder='Password' onChangeText={(password) => this.setState({password: password})}/>

                            <TouchableHighlight onPress={this.login}> 
                                <Text>Login</Text>
                            </TouchableHighlight>
                            <TouchableOpacity
                                style={styles.FBbutton}
                                onPress={this.onFBButtonPress}
                                title="Continue with Facebook"
                            >
                            <Text style={styles.FBbuttonText}>
                                Continue with Facebook
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                )
        }
}

