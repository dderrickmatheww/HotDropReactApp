import React from "react";
import { Image, Text, View, StyleSheet, TouchableHighlight, Linking } from 'react-native';

export default class TwitchCom extends React.Component {
        render() {
            let pic = {
                uri: this.props.streamerPreview
              };
            return(
                <TouchableHighlight style={styles.card} onPress={ ()=>{ Linking.openURL(this.props.streamURL)}} underlayColor="rgb(1, 0, 96)">
                    <View style={styles.cardcontainer}>
                        <View style={styles.subcontainer}>
                            <View style={styles.thumbcontainer}>
                                <Image
                                    style={styles.gamelogo}
                                    source={pic}
                                />
                            </View>
                            <View style={styles.cardtext}>
                                <Text style={styles.title}>Watch {this.props.streamerName} streaming {this.props.streamedGame}</Text>
                                <Text style={styles.description}>{this.props.streamerStatus}</Text>
                                <Text style={styles.info}>Current Viewers: {this.props.streamerFollowers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        }
}

const styles = StyleSheet.create({
    cardcontainer: {
        flexDirection: `column`,
    },
    subcontainer: {
        flexDirection: 'row'
    }, 
    card: {
        backgroundColor: 'rgb(1, 0, 64)',
        height: `auto`,
        margin: 4,
        padding: 5,
        borderRadius: 3,
        borderColor: `rgb(1, 0, 128)`,
        borderWidth: 1,
        width: 350,
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
        fontSize: 16,
        flexWrap: 'wrap',
        textShadowColor: `#000`,
        textShadowRadius: 2,
        textShadowOffset: {
            height: 2,
            width: 1,
        }
    },
    info: {
        fontWeight: `100`,
        color:`rgb(135, 206, 250)`,
        fontSize: 10,
        textShadowColor: `#000`,
        textShadowRadius: 2,
        textShadowOffset: {
            height: 2,
            width: 1,
        }
    },
    description: {
        color:`rgb(135, 206, 250)`,
        fontSize: 12,
        textShadowColor: `#000`,
        textShadowRadius: 2,
        textShadowOffset: {
            height: 2,
            width: 1,
        }
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
        borderColor: `rgb(1, 0, 218)`,
        borderWidth: 2
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
        flex: 1,
        padding: 4,
        margin: 2,
        borderRadius: 3,
        backgroundColor: `rgba(1, 0, 24, 0.4)`
    }

})