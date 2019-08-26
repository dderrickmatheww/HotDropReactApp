import React, {Component} from "react";
import { View, StyleSheet, Text, Image } from "react-native"
import Divider from "../Divider/Divider";

export default class ProfileCard extends Component {
    render() {
        return(
        <View style={{backgroundColor: "#363534"}}>
            <View style={styles.card}>
                <View style={styles.cardcontainer}>
                    
                    <Image style={styles.thumb} source={{uri: this.props.avatar}}/>

                    <Text style={styles.cardHead}>
                        {this.props.username}
                    </Text>
                    <Divider color='rgb(6, 5, 72)'/>
                    <Text style={styles.cardBody}>
                        {this.props.description}
                    </Text>
                </View>
            </View>
        </View>
        )
    }
} 

const styles = StyleSheet.create({
    cardcontainer: {
        flexDirection: `row`,
    },
    card: {
        backgroundColor: `rgb(1, 0, 24)`,
        height: `auto`,
        margin: 4,
        padding: 5,
        borderRadius: 3,
        borderColor: `darkslategray`,
        borderWidth: 0.66,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    cardHead: {
        fontFamily:`'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        color:`white`,
        fontWeight: `bold`,
        fontSize: 16,
    },
    cardSubhead: {
        fontFamily:`'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        color:`rgb(135, 206, 250)`,
        fontSize: 12
    },
    cardBody: {
        color:`rgb(135, 206, 250)`,
        fontSize: 12
    },
    thumb: {
        width: 150,
        height: 150,
        borderColor: `rgb(2, 0, 144)`,
        borderWidth: 0.66,
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
    }
})