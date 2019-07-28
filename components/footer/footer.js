import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import FooterTab from "./footertab";
import Firebase from "../loginmodule/firebase";

export default class Footer extends Component {
    state = {
        loggedIn: false
    }

    logIn = () => {
        this.props.navigation('LoginScreen');
        if(this.props.userAuth) {
            this.setState({loggedIn: true});
        }
        
    }

    logOut = () => {
        if(this.props.userAuth === false) {
            this.setState({loggedIn: false})
        }
        Firebase.auth.signOut().then(function() {
            this.props.navigation('HomeScreen');
            this.setState({loggedIn: false})
          }).catch(function(error) {
            // An error happened.
          });
    } 

    render() {
        return (
            <View>
                {this.state.loggedIn ? 
                    <View style={styles.footer}>
                        <FooterTab tablabel='Home'/>
                        <FooterTab tablabel='Account' /> 
                        <FooterTab tablabel='Log Out' tabaction={this.logOut}/>
                    </View>
                :
                    <View style={styles.footer}>
                        <FooterTab tablabel='Home'/>
                        <FooterTab tablabel='Login' tabaction={this.logIn}/>
                    </View>
                }
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        flex: 1,
        width: `100%`,
        backgroundColor: `#000`,
        flexDirection: 'row',
        justifyContent: 'center',
        height: `auto`,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: `darkslategray`,
        borderBottomColor: `darkslategray`
    }
})