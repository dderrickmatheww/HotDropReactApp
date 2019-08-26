import React from "react";
import { Image, StyleSheet, TouchableHighlight, Text, View, Linking } from 'react-native';
import Divider from "../Divider/Divider";

export default class ArticleCard extends React.Component {
    everyOther = (index) => {
        if (index % 2 === 0) {
            return `rgb(1, 0, 24)`
        } else {
            return `rgb(1, 0, 42)`
        }
    }

    render() {
        return (
            <TouchableHighlight style={[styles.card, {backgroundColor: this.everyOther(this.props.index)}]} onPress={ ()=>{ Linking.openURL(this.props.link)}} underlayColor="rgb(1, 0, 96)">
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
                        <Divider color='rgb(6, 5, 72)'/>
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
        height: `auto`,
        margin: 2,
        marginTop: 1,
        marginBottom: 0,
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
        fontSize: 12,
        fontStyle: 'italic'
    },
    cardBody: {
        color:`rgb(135, 206, 250)`,
        fontSize: 12,
    },
    articlethumb: {
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
    articletext: {
        flex: 1
    }

})