import React from "react";
import { Image, Text, View, StyleSheet, ImageBackground } from 'react-native';
import { TouchableHighlight } from "react-native-gesture-handler";

export default class TwitchCom extends React.Component {
        render() {
            let pic = {
                uri: this.props.streamerBanner
              };
            return(
                <TouchableHighlight onPress={ ()=>{ Linking.openURL(this.props.streamURL)}} underlayColor="rgb(1, 0, 64)">
                    <View style={styles.card}>
                        <ImageBackground source={pic} style={{width: '100%', height: '20%'}}>
                            <Text> Watch {this.props.streamerName} streaming {this.props.streamedGame}</Text>
                        </ImageBackground>
                        <View style={styles.thumbcontainer}>
                            <Image
                                style={styles.gamelogo}
                                source={{ uri: this.props.streamPreview }}
                            />
                        </View>
                        <View style={styles.cardtext}>
                            <Text style={styles.title}>{this.props.streamerStatus}</Text>
                            <Text style={styles.info}>Viewers: {this.props.viewers}</Text>
                            <Text style={styles.info}>{this.props.streamerName}'s {this.props.streamerFollowers}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff' || this.props.streamerBackgroundColor,
        height: `auto`,
        margin: 4,
        padding: 5,
        borderRadius: 3,
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