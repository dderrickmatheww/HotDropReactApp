import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import FooterTab from "./footertab";
import Firebase from "../loginmodule/firebase";



export default class Footer extends Component {
    state = {
        loggedIn: Firebase.auth.currentUser
    }
    
    //this is a placeholder function to test the ternary statement
    logIn = () => {
        this.props.navigation('LoginScreen');
        this.setState({loggedIn: Firebase.auth.currentUser});
    }

    logOut = async () => {
        Firebase.auth.signOut().then(() => {
            this.props.navigation('HomeScreen');
            this.setState({loggedIn: Firebase.auth.currentUser});
          }).catch(function(error) {
            console.log(error);
          });
    } 

    render() {
        return (
            <View>
                {this.state.loggedIn ? 
                    <View style={styles.footer}>
                        <FooterTab tablabel='Home' tabaction={this.props.scrollfunc}/>
                        <FooterTab tablabel='Log Out' tabaction={this.logOut}/>
                        <FooterTab tablabel='About' tabaction={this.props.about} />
                    </View>
                :
                    <View style={styles.footer}>
                        <FooterTab tablabel='Home' tabaction={this.props.scrollfunc}/>
                        <FooterTab tablabel='Login' tabaction={this.props.login}/>
                        <FooterTab tablabel='Sign-Up' tabaction={this.props.login}/>
                        <FooterTab tablabel='About' tabaction={this.props.about}/>
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