import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import FooterTab from "./footertab";
import Firebase from "../LoginScreen/firebase";


export default class Footer extends Component {
    state = {
        loggedIn: false,
        userAuth: this.props.user
    }
    componentDidMount() {
       this.authCheck();
    }
    componentWillMount() {
        this.authCheck();
    }
    shouldComponentUpdate() {
        this.authCheck();
        if(this.state.loggedIn){
            return false;
        }
        else {
            return true
        }
        
    }
    componentWillUnmount() {
        this.componentDidMount;
    }
    authCheck = async () => {
        try {
          let user = await AsyncStorage.getItem('user');
          user = JSON.parse(user);
          let userAuth = this.state.userAuth
          console.log(userAuth)
            if (!userAuth === []) {
                this.setState({
                    loggedIn: true
                });
            } 
            else if (user) {
                this.setState({
                    loggedIn: true
                });
            }
            else {
                this.setState({
                    loggedIn: false
                });
            }
        } 
        catch (err) {
          console.log(err);
        }
    }
    signout = () => {
        Firebase.auth.signOut()
        .then(() => {
            AsyncStorage.removeItem('user');
            this.setState({loggedIn: false})
            this.setState({userAuth: []});
        })
        .catch((error) => {console.log(error)})
    }

    render() {
        console.log(this.state.loggedIn);
        return (
            <View>
                {this.state.loggedIn ? 
                    <View style={styles.footer}>
                        <FooterTab tablabel='Home' tabaction={this.props.scrollfunc}/>
                        <FooterTab tablabel='Log Out' tabaction={this.signout}/>
                        <FooterTab tablabel='About' tabaction={this.props.about} />
                    </View>
                :
                    <View style={styles.footer}>
                        <FooterTab tablabel='Home' tabaction={this.props.scrollfunc}/>
                        <FooterTab tablabel='Login' tabaction={this.props.login}/>
                        <FooterTab tablabel='Sign-Up' tabaction={this.props.signup}/>
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