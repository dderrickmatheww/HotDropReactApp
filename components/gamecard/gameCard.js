import React from "react";
import { Image, StyleSheet, Text, View } from 'react-native';

export default function GameCard(props){
    return(
        <View style={styles.card}>
            <View style={styles.thumbcontainer}>
                <Image
                    style={styles.gamelogo}
                    source={{uri: 'https://raw.githubusercontent.com/dderrickmatheww/Project1/master/assets/images/thumbnailph.jpg'}}
                />
            </View>
            <View style={styles.cardtext}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.info}>Platforms: {props.platforms}</Text>
                <Text style={styles.info}>Release Date: {props.releasedate}</Text>
                <Text style={styles.description}>{props.description}</Text>
                <View style={styles.bottom}>
                    <Text style={styles.bottombutton}>More News</Text>
                    <Text style={styles.bottombutton}>YouTube</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: `rgb(1, 0, 48)`,
        height: `auto`,
        margin: 4,
        padding: 5,
        borderRadius: 3,
        borderBottomRightRadius: 100,
        border: `solid`,
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
        textShadow: `.6pt 1.2pt 4pt white`,
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
        color:`rgb(135, 206, 250)`,
        fontWeight: `bold`,
        padding: 5,
        fontSize: 14,
        borderRadius: 2,
        marginRight: 5,
        bottom: 0
    },
    gamelogo: {
        width: 100,
        height: 150,
        border: `solid`,
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