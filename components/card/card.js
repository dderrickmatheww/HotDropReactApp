import React from "react";
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Card(props){
    return(
        <View style={styles.card}>
            <View style={styles.thumbcontainer}>
                <Image
                    style={styles.articlethumb}
                    source={{uri: 'https://raw.githubusercontent.com/dderrickmatheww/Project1/master/assets/images/thumbnailph.jpg'}}
                />
            </View>
            <View style={styles.articletext}>
                <Text style={styles.cardHead}>{props.cardhead}</Text>
                <Text style={styles.cardSubhead}>{props.cardsubhead}</Text>
                <Text style={styles.cardBody}>{props.cardbody}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: `rgb(1, 0, 66)`,
        height: `auto`,
        margin: 4,
        padding: 5,
        borderRadius: 2,
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

        elevation: 4
    },
    cardHead: {
        fontFamily:`'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        color:`rgb(135, 206, 250)`,
        fontWeight: `bold`,
        fontSize: 20,
        textShadow: `.6pt 1.2pt 4pt white`,
    },
    cardSubhead: {
        fontFamily:`'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        color:`rgb(135, 206, 250)`,
        textShadow: `.6pt 1.2pt 4pt white`,
        fontSize: 16
    },
    cardBody: {
        color:`rgb(135, 206, 250)`,
        fontSize: 12,
    },
    articlethumb: {
        width: 100,
        height: 100,
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
    }

})