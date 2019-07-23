import React from "react";
import { Image, StyleSheet, TouchableHighlight, Text, View, Linking } from 'react-native';

export default class ArticleCard extends React.Component {
    render() {
        return (
            <TouchableHighlight style={styles.card} onPress={ ()=>{ Linking.openURL(this.props.link)}} underlayColor="rgb(1, 0, 64)">
                <View style={styles.cardcontainer}>
                    <View style={styles.thumbcontainer}>
                        <Image
                            style={styles.articlethumb}
                            source={{uri: this.props.pic }}
                        />
                    </View>
                    <View style={styles.articletext}>
                        <Text style={styles.cardHead}>{this.props.cardhead}</Text>
                        <Text style={styles.cardSubhead}>By {this.props.cardauthor} for {this.props.source}</Text>
                        <Text style={styles.cardBody}>{this.props.cardbody}</Text>
                    </View>
                </View>
            </TouchableHighlight>
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
        borderBottomRightRadius: 25,
        borderColor: `darkslategray`,
        borderWidth: 1,
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
        fontSize: 18,
    },
    cardSubhead: {
        fontFamily:`'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        color:`rgb(135, 206, 250)`,
        fontSize: 14
    },
    cardBody: {
        color:`white`,
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
        flex: 1
    }

})