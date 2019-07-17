import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Comments(props){
    return (
        <View style={styles.container}>
        <View style={styles.commentcard}>
            <Text style={styles.author}>{props.author}</Text>
            <Text style={styles.body}>{props.comment}</Text>
            <Text style={styles.datetime}>Posted at: {props.datetime}</Text>
        </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        margin: 4,
    },
    commentcard: {
        backgroundColor: `rgb(1, 0, 24)`,
        height: `auto`,
        padding: 5,
        borderRadius: 3,
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
    author: {
        fontSize: 14,
        fontWeight: `bold`,
        color: `skyblue`
    },
    body: {
        fontSize: 12,
        color: `white`
    },
    datetime: {
        fontSize: 9,
        fontWeight: `100`,
        color: `lightgray`
    }
})