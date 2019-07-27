import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import FooterTab from "./footertab";


export default class Footer extends Component {
    state = {
        loggedIn: false
    }
    
    logIn = () => {
        this.setState({loggedIn: true});
    }

    logOut = () => {
        this.setState({loggedIn: false});
    }

    render() {
        return (
            <View>
                {this.state.loggedIn ? 
                    <View style={styles.footer}>
                        <FooterTab tablabel='Home' tabaction={this.props.scrollfunc}/>
                        <FooterTab tablabel='Account' /> 
                        <FooterTab tablabel='Log Out' tabaction={this.logOut}/>
                        <FooterTab tablabel='About' />
                    </View>
                :
                    <View style={styles.footer}>
                        <FooterTab tablabel='Home' tabaction={this.props.scrollfunc}/>
                        <FooterTab tablabel='Login' tabaction={this.logIn}/>
                        <FooterTab tablabel='About' />
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