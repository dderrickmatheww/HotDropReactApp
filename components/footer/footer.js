import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import FooterTab from "./footertab";


export default class Footer extends Component {
    state = {
        loggedIn: false
    }
    
    //this is a placeholder function to test the ternary statement
    logIn = () => {
        this.setState({loggedIn: true});
    }

    //same as above
    logOut = () => {
        this.setState({loggedIn: false});
    }

    render() {
        return (
            <View>
                {this.state.loggedIn ? 
                    <View style={styles.footer}>
                        <FooterTab tablabel='Home' tabaction={this.props.scrollfunc}/>
                        <FooterTab tablabel='Account' tabaction={this.props.profile}/> 
                        <FooterTab tablabel='Log Out' tabaction={this.logOut}/>
                        <FooterTab tablabel='About' tabaction={this.props.about} />
                    </View>
                :
                    <View style={styles.footer}>
                        <FooterTab tablabel='Home' tabaction={this.props.scrollfunc}/>
                        <FooterTab tablabel='Login' tabaction={this.props.login}/>
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