import React from "react";
import { Image, StyleSheet, Text, View, Linking } from 'react-native';

export default class ArticleCard extends React.Component {
    render() {
        return (
            <View style={styles.card}>
                <View style={styles.thumbcontainer}>
                    <Image
                        style={styles.articlethumb}
                        source={{uri: 'https://raw.githubusercontent.com/dderrickmatheww/Project1/master/assets/images/thumbnailph.jpg'}}
                    />
                </View>
                <View style={styles.articletext}>
                    <Text style={styles.cardHead} onPress={ ()=>{ Linking.openURL(props.link)}}>{this.props.cardhead}</Text>
                    <Text style={styles.cardSubhead}>{this.props.cardsubhead}</Text>
                    <Text style={styles.cardBody}>{this.props.cardbody}</Text>
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
        borderBottomRightRadius: 75,
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
    cardHead: {
        fontFamily:`'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        color:`rgb(135, 206, 250)`,
        fontWeight: `bold`,
        fontSize: 20,
    },
    cardSubhead: {
        fontFamily:`'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        color:`rgb(135, 206, 250)`,
        fontSize: 16
    },
    cardBody: {
        color:`rgb(135, 206, 250)`,
        fontSize: 12
    },
    articlethumb: {
        width: 100,
        height: 100,
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
    articletext: {
        width: `66%`
    }

})