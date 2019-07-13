import React from "react";
import { Image, TouchableHighlight, StyleSheet, Text, View, Linking } from 'react-native';

export default function ArticleCard(props){
    return(
        <TouchableHighlight onPress={ ()=>{ Linking.openURL(props.link)}} style={styles.card} underlayColor='rgb(1, 0, 64)'>
            <View style={styles.cardwrapper}>
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
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: `rgb(1, 0, 24)`,
        height: `auto`,
        margin: 4,
        padding: 5,
        borderRadius: 3,
        borderBottomRightRadius: 75,
        border: `solid`,
        borderColor: `darkslategray`,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 5,
    },
    cardwrapper: {
        flexDirection: `row`,
    },
    cardHead: {
        fontFamily:`'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        color:`rgb(135, 206, 250)`,
        fontWeight: `bold`,
        fontSize: 20,
    },
    cardSubhead: {
        fontFamily:`'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        color:`rgb(135, 206, 250)`,
        fontSize: 16,
        textShadowColor: 'rgba(255, 255, 255, 1)',
        textShadowRadius: 3,
    },
    cardBody: {
        color:`rgb(255, 255, 255)`,
        fontSize: 12,
        textShadowColor: 'rgba(255, 255, 255, 1)',
        textShadowRadius: 5,
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
        elevation: 3
    },
    articletext: {
        width: `66%`
    }

})