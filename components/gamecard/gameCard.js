import React from "react";
import { Image, StyleSheet, Text, View } from 'react-native';

export default class GameCard extends React.Component {
        render() {
            return(
                <View style={styles.card}>
                    <View style={styles.thumbcontainer}>
                        <Image
                            style={styles.gamelogo}
                            source={{ uri: this.props.picture }}
                        />
                    </View>
                    <View style={styles.cardtext}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.info}>Platforms: {this.props.platforms}</Text>
                        <Text style={styles.info}>Release Date: {this.props.releasedate}</Text>
                        <Text style={styles.description}>{this.props.description}</Text>
                    </View>
                </View>  
            )
        }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: `rgb(1, 0, 48)`,
        height: `auto`,
        margin: 4,
        padding: 5,
        borderRadius: 3,
        borderBottomRightRadius: 100,
        borderColor: `darkslategray`,
        borderWidth: 1,
        flexDirection: `row`,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    title: {
        fontFamily:`'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        color:`rgb(135, 206, 250)`,
        fontWeight: `bold`,
        fontSize: 20,
    },
    info: {
        fontWeight: `100`,
        color:`rgb(135, 206, 250)`,
        fontSize: 10,
    },
    description: {
        color:`rgb(135, 206, 250)`,
        fontSize: 12,
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
        marginRight: 5,
        bottom: 0
    },
    bottombuttontext: {
        color:`rgb(135, 206, 250)`,
        fontWeight: `bold`,
    },
    gamelogo: {
        width: 100,
        height: 150,
        borderColor: `rgb(2, 0, 144)`,
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
        width: '66%',
    }

})