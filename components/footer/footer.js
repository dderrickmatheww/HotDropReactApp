import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import FooterTab from "./footertab";
import Firebase from "../LoginScreen/firebase";


export default class Footer extends Component {
    state = {
        loggedIn: false,
        userAuth: this.props.user
    }
    componentWillMount() {
        this.authCheck();
    }
    shouldComponentUpdate() {
        this.authCheck();
        if (this.state.loggedIn){
            return false;
        }
        else{
            return true;
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
                return false;
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
        return (
            <View style={styles.footcontainer}>
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
    footcontainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingTop: 40,
        backgroundColor: `transparent`
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: `100%`,
        backgroundColor: `#000`,
        flexDirection: 'row',
        height: `auto`,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: `darkslategray`,
        borderBottomColor: `darkslategray`
    }
})