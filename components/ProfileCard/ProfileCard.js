import React, {Component} from "react";
import { View, StyleSheet, Text, Image } from "react-native"
import Divider from "../Divider/Divider";

export default class ProfileCard extends Component {
    render() {
        return(
            <View style={styles.card}>

                <View style={styles.cardupper}>
                    <Image style={styles.avatar} source={{ uri: this.props.avatar }}/>
                    <View style={styles.cardtext}>
                        <Text style={styles.title}>{this.props.username}</Text>
                    </View>
                </View>

                <View style={styles.cardlower}>
                    <Divider color='rgb(6, 5, 72)'/>
                    <Text style={styles.description}>{this.props.description}</Text>
                </View>
            </View>
        )
    }
} 
const styles = StyleSheet.create({
    card: {
        backgroundColor: `rgb(1, 0, 24)`,
        height: `auto`,
        margin: 0,
        padding: 5,
        borderColor: `darkslategray`,
        borderTopWidth: 0.66,
        borderBottomWidth: 0.66,
        flexDirection: `column`,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    cardupper :{
        flexDirection: 'row'
    },
    title: {
        fontFamily: "sans-serif-medium",
        color:`lightskyblue`,
        fontWeight: `bold`,
        fontSize: 20,
        marginBottom: 3
    },
    info: {
        fontStyle: 'italic',
        fontFamily: "sans-serif-thin",
        color:`rgb(135, 206, 250)`,
        fontSize: 14,
        marginBottom: 2
    },
    description: {
        paddingHorizontal: 2,
        fontFamily:`sans-serif-light`,
        color:`rgb(135, 206, 250)`,
        fontSize: 14,
    },
    bottom: {
        lineHeight: 5,
        flexDirection: `row`
    },
    bottombutton: {
        backgroundColor: `darkslategray`,
        padding: 5,
        fontSize: 14,
        borderRadius: 2,
        marginRight: 4,
        bottom: 0
    },
    bottombuttontext: {
        color:`rgb(135, 206, 250)`,
        fontWeight: `bold`,
    },
    avatar: {
        width: 140,
        height: 140,
        borderColor: `darkslategray`,
        borderWidth: 1,
        marginRight: 5,
    },
    thumbcontainer: {
        shadowColor: `#fff`,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.66,
        shadowRadius: 2.62,
        elevation: 4
    },
    cardtext: {
        flex: 1
    }
})