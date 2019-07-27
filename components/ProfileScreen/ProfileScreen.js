import React, {Component} from 'react';
import { Image, View, StyleSheet, Text, Linking } from 'react-native';

export default class ProfileScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Profile',
            headerStyle: {
            backgroundColor: 'rgb(1, 0, 24)',
          },
          headerTintColor: 'skyblue'
        };
      };
    
    render() {
        return(
            <View style={{backgroundColor: "#363534"}}>
                <View style={styles.card}>
                    <View style={styles.cardcontainer}>
                        
                        <Image style={styles.thumb} source={{uri: this.props.avatar}}/>

                        <Text style={styles.cardHead}>
                            {this.props.username}
                        </Text>

                    </View>
                </View>
            </View>
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
    thumb: {
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
    }
})