import React, {Component} from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native"
import Divider from "../Divider/Divider";
import PropTypes from 'prop-types';


export default class ProfileCard extends Component {
    static propTypes = {
        favGameData: PropTypes.array.isRequired
    }
    render() {
        console.log(this.props.favGameData)
        return(
            <View style={styles.card}>
                <View style={styles.cardupper}>
                    <Image style={styles.avatar} source={{ uri: this.props.data.imageURL }}/>
                    <View style={styles.cardtext}>
                        <Text style={styles.title}>{this.props.data.userName}</Text>
                        <Text style={styles.info}>My name is <Text style={{fontWeight: 'bold'}}>{this.props.data.firstName} {this.props.data.lastName}</Text>.</Text>
                        <Text style={styles.info}>I play on <Text style={{fontWeight: 'bold'}}>{this.props.data.platform}</Text>.</Text>


                        {/* favorite games should be an array of ids, converted back into titles and then joined by commas; except the last one is preceded by "and"
                    
                            ie, {user.favoritegames: ["id-0001", "id-0002", "id-0003"]} becomes "My favorite games are Game1, Game2, and Game3."]
                        */}
                    </View>
                </View>
                <View style={styles.cardlower}>
                    <Divider color='rgb(6, 5, 72)'/>
                    <Text style={styles.description}>{null}</Text>
                </View>
                
                {   
                    this.props.favGameData.length > 0 ?
                        this.props.favGameData.map((game) => {
                            return(
                                <View>
                                    <Text><Text style={styles.favInfo}>These are your favorited games ⬎</Text></Text>
                                    <View >
                                        <TouchableOpacity 
                                            style={styles.bottombutton}
                                            onPress={() => {this.props.cardScreen.navigate('CardScreen', { text: game.gameName })}}
                                        >
                                            <Text style={styles.bottombuttontext}>{game.gameName}</Text>
                                            <Text style={styles.bottombuttontext}>Date added: {game.dateAdded}</Text>
                                            <Text style={styles.bottombuttontext}>Touch here to view more!</Text>
                                            <Image style={styles.gamePic} source={{uri: game.image}}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }) : <Text><Text style={styles.favInfo}>You have no favorited games, swipe right on the heart to favorite and they will appear down here ⬎</Text></Text>
                }
            </View>
        )
    }
} 
const styles = StyleSheet.create({
    card: {
        backgroundColor: `rgb(1, 0, 24)`,
        height: `auto`,
        margin: 0,
        padding: 5,
        borderColor: `darkslategray`,
        borderTopWidth: 0.66,
        borderBottomWidth: 0.66,
        flexDirection: `column`,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    cardupper :{
        flexDirection: 'row'
    },
    title: {
        fontFamily: "sans-serif-medium",
        color:`lightskyblue`,
        fontWeight: `bold`,
        fontSize: 20,
        marginBottom: 3
    },
    info: {
        fontStyle: 'italic',
        fontFamily: "sans-serif-thin",
        color:`rgb(135, 206, 250)`,
        fontSize: 14,
        marginBottom: 2
    },
    description: {
        paddingHorizontal: 2,
        fontFamily:`sans-serif-light`,
        color:`rgb(135, 206, 250)`,
        fontSize: 14,
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
        marginRight: 4,
        bottom: 0
    },
    bottombuttontext: {
        color:`rgb(135, 206, 250)`,
        fontWeight: `bold`,
    },
    avatar: {
        width: 140,
        height: 140,
        borderColor: `darkslategray`,
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
        flex: 1
    },
    bottombutton: {
        backgroundColor: `darkslategray`,
        padding: 5,
        fontSize: 14,
        borderRadius: 2,
        marginRight: 5,
        bottom: 0,
        marginTop: 10,

    },
    favInfo: {
        fontStyle: 'italic',
        fontFamily: "sans-serif-thin",
        color:`rgb(135, 206, 250)`,
        fontSize: 16,
        marginBottom: 5,
        marginTop: 5
    },
    bottombuttontext: {
        color:`rgb(135, 206, 250)`,
        fontWeight: `bold`,
    },
    gamePic: {
        width: 140,
        height: 140,
        borderColor: `darkslategray`,
        borderWidth: 1
    }
})