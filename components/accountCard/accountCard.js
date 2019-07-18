import React from "react";
import { View, Stylesheet, Image, Text } from "react-native";

export default class accountCard extends React.Component {
    render() {
        return (
            <View style={styles.card}>
                <View style={styles.thumbcontainer}>
                    <Image
                        style={styles.profilethumb}
                        source={{uri: 'https://raw.githubusercontent.com/dderrickmatheww/Project1/master/assets/images/thumbnailph.jpg'}}
                    />
                </View>
                <View styles={styles.profiletext}>
                    <Text style={styles.cardHead}>Username</Text>
                    <Text style={styles.cardBody}>Profile Details</Text>
                    <Text style={styles.cardBody}>Favorite Games</Text>
                </View>
            </View>
        )
    }
}

const styles = Stylesheet.create({
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
    profilethumb: {
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
    profiletext: {
        width: `66%`
    }

})