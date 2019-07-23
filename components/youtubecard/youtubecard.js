import React from "react";
import { Image, Text, View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

export default class YoutubeCom extends React.Component {
        render() {
            return(
                <View>
                    <View style={styles.card}>
                        <WebView
                            style={ styles.WebViewStyle }
                            source={{ uri: 'https://www.youtube.com/embed/' + this.props.videoId}}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            style={{ alignSelf: 'stretch', height: 300 }}   
                        />
                    </View>  
                    <View style={styles.card}>
                        {this.props.comments.map(comments => (
                            <View style={styles.ytcontainer}>
                                <Image style={styles.yticon} source={{url: comments.snippet.topLevelComment.snippet.authorProfileImageUrl}}/>
                                <View style={styles.yttext}>
                                    <Text style={styles.ytauthor}>{comments.snippet.topLevelComment.snippet.authorDisplayName}</Text>
                                    <Text style={styles.ytbody}>{comments.snippet.topLevelComment.snippet.textDisplay}</Text>
                                </View>
                            </View>
                        ))} 
                    </View>
             </View>
            )
        }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: `rgb(1, 0, 24)`,
        height: `auto`,
        margin: 4,
        padding: 5,
        borderRadius: 3,
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
    },
    ytcontainer:{
        flexDirection: 'row',
        paddingVertical: 3
    },
    yticon:{
        width: 50,
        height: 50,
        borderColor: `rgb(2, 0, 144)`,
        borderWidth: 1,
        marginRight: 5,
    },
    yttext:{
        flex: 1
    },
    ytauthor: {
        fontWeight: `bold`,
        color:`rgb(135, 206, 250)`,
        fontSize: 12,
    },
    ytbody:{
        fontWeight: `100`,
        color:`rgb(135, 206, 250)`,
        fontSize: 10,
    }

})