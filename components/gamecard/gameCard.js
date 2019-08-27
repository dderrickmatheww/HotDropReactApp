import React from "react";
import { Image, StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import Divider from "../Divider/Divider";

export default class GameCard extends React.Component {
    state = {
        isVisible: false
    }

    closeModalFunc = () => {
        this.setState({isVisible: false});
    }

    render() {
        return(
            <View>
                <View style={styles.card}>
                    <View style={styles.cardupper}>
                        <TouchableOpacity 
                            style={styles.thumbcontainer}
                            onPress={() => this.setState({isVisible: true})}
                        >
                            <Image
                                style={styles.gamelogo}
                                source={{ uri: this.props.picture }}
                            />
                        </TouchableOpacity>
                        <View style={styles.cardtext}>
                            <Text style={styles.title}>{this.props.title}</Text>
                            <Text style={styles.info}><Text style={{fontWeight: 'bold'}}>Platforms: </Text> {this.props.platforms}</Text>
                            <Text style={styles.info}><Text style={{fontWeight: 'bold'}}>Release Date: </Text> {this.props.releasedate}</Text>
                        </View>
                    </View>
                    <View style={styles.cardlower}>
                    <Divider color='rgb(6, 5, 72)'/>

                    
                        <Text style={styles.description}>{this.props.description}</Text>
                    </View>
                </View> 

                <View style={styles.container}>
                    <Modal
                        animationType='slide'
                        onRequestClose={() => console.log('no warning')}
                        transparent={true}
                        visible={this.state.isVisible}
                    >
                        <View style={{backgroundColor: 'rgba(96, 96, 128, 0.66)', height: '100%'}}>
                            <View style={styles.modalView} >
                                <TouchableOpacity
                                    onPress={this.closeModalFunc}
                                >
                                    <Text style={styles.closeText}>X</Text>
                                </TouchableOpacity>
                                <View style={styles.modalContent}>
                                <Image 
                                    style={styles.modalImage}
                                    source={{ uri: this.props.modal}}
                                    resizeMode='contain'
                                />
                                
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
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
    gamelogo: {
        width: 140,
        height: 210,
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
    modalImage: {
        backgroundColor: `transparent`,
        width: '95%',
        height: '95%',
        resizeMode: "contain"
    },
    modalView: {
        backgroundColor: `rgb(1, 0, 32)`,
        height: `90%`,
        width: `90%`,
        margin: `5%`,
        padding: 5,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: 'rgb(206, 212, 218)',
        elevation: 20,
        justifyContent: 'center'
    },
    closeText: {
        color: 'rgb(135, 206, 250)',
        backgroundColor: 'rgb(1, 0, 128)',
        borderRadius: 1,
        width: 32,
        padding: 6,
        alignSelf: 'flex-end',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'darkslategray',
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})