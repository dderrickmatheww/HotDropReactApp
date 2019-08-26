import React from "react";
import { Image, StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';

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
                        <Text style={styles.info}>Platforms: {this.props.platforms}</Text>
                        <Text style={styles.info}>Release Date: {this.props.releasedate}</Text>
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
        margin: 3,
        padding: 5,
        borderRadius: 3,
        borderColor: `darkslategray`,
        borderWidth: 0.66,
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
        color:`white`,
        fontWeight: `bold`,
        fontSize: 16,
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
        marginRight: 4,
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
        flex: 1
    },
    modalImage: {
        backgroundColor: `transparent`,
        height: 500,
        width: 300
    },
    modalView: {
        backgroundColor: `rgb(1, 0, 32)`,
        margin: 40,
        padding: 10,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: 'rgb(206, 212, 218)',
        elevation: 20
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