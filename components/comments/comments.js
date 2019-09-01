import React, {Component} from 'react';
import { View, StyleSheet, Button, TextInput, AsyncStorage, Text, KeyboardAvoidingView, Modal, TouchableOpacity } from 'react-native';
import Firebase from '../LoginScreen/firebase';
import CommentsRender from './commentsRender';
import { AirbnbRating } from 'react-native-ratings';

export default class commentsCom extends Component {
    state = {
        author: '',
        comment: '',
        starCount: 0,
        gameExists: false,
        searchedGame: this.props.game,
        commentData: [],
        isVisible: false,
    };
    async shouldComponentUpdate() {
        let userName = await AsyncStorage.getItem('userUserName');
        if (userName){
            this.setState({author: userName});
            return false;
        }
        else {
            return true;
        }
    }
    async componentDidMount() {
        let searchedGame = this.state.searchedGame.toLowerCase();
        await this.grabbingComments(searchedGame);
    }
   
    postComment = async () => {
        let searchedGame = this.state.searchedGame.toLowerCase();
        await Firebase.database.ref('game').once("value").then((snapshot) => {this.setState({gameExists: snapshot.child(searchedGame).exists()})});
        let user = await AsyncStorage.getItem('user');
            if (user) {
                Firebase.comments.authorName = this.state.author
                Firebase.comments.comment = this.state.comment
                Firebase.comments.rating = this.state.starCount
                if(this.state.comment === '') {
                    alert('Please enter a comment')
                } 
                else if (this.state.author === ''){
                    alert('Please enter an author name');
                }
                else {
                    if (this.state.gameExists) {
                        await Firebase.gameRef.child(searchedGame).push({
                            comment: Firebase.comments.comment,
                            authorName: Firebase.comments.authorName,
                            rating: Firebase.comments.rating
                        });
                        this.grabbingComments(searchedGame)
                    }
                    else {
                        await Firebase.gameRef.child(searchedGame).push({
                            comment: Firebase.comments.comment,
                            authorName: Firebase.comments.authorName,
                            rating: Firebase.comments.rating
                        });
                        this.grabbingComments(searchedGame)
                    }
                }
            }
            else {
                this.secondTextInput.clear();
                this.setState({comment: ''});
                this.setState({isVisible: true});
            }
    }
    grabbingComments = (searchedGame) => {
        Firebase.gameRef.child(searchedGame).on('value', (snap) => {
                let child = snap.val();
                if(child) {
                    let items = Object.values(child);
                    this.setState({commentData: items}); 
                    console.log(items);
                }
        }, 
        function(errorObject) {
        })
    }
    onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
      }
    closeModalFunc = () => {
        this.setState({isVisible: false});
    }
    render () {
        return(
            <View style={styles.commentsection}>
                <Text style={styles.commentheader}>Comments</Text>
                <View style={styles.commentcontainer}>
                    <CommentsRender commentData={this.state.commentData} />
                </View>
                <Text style={styles.commentinst}>What rating would you give this game out of 5 stars? ↴ </Text>
                <AirbnbRating
                    count={5}
                    reviews={["Terrible", "Bad", "Meh", "Very Good", "Unbelievable"]}
                    defaultRating={3}
                    showRating={true}
                    size={20}
                    onFinishRating={(rating) => {this.onStarRatingPress(rating)}}
                />
                <Text style={styles.commentinst}>Have something to say? Post a comment below ↴ </Text>
                <KeyboardAvoidingView enabled> 
                    <TextInput
                        style={{marginBottom: 15, backgroundColor: `rgb(76, 82, 88)`, borderColor: `rgb(206, 212, 218)`, borderBottomWidth: 1, color: 'white'}}
                        placeholder={this.state.author}
                        editable={false}
                        placeholderTextColor="gray"
                        value={this.state.author}
                        returnKeyType = { "next" }
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        ref={(input) => { this.firstTextInput = input; }}
                    />
                    
                    <TextInput
                        style={{marginTop: 15, marginBottom: 15, textAlignVertical: "top", backgroundColor: `rgb(76, 82, 88)`, borderColor: `rgb(206, 212, 218)`, borderBottomWidth: 1, color: 'white'}}
                        placeholder="What do you have to say?"
                        placeholderTextColor="gray"
                        ref={(input) => { this.secondTextInput = input; }}
                        multiline = {true}
                        numberOfLines = {4}
                        onChangeText={(text) => this.setState({comment: text})}
                        onSubmitEditing={this.postComment}
                    />
                    <Button
                        title="Post"
                        color='rgb(1, 0, 64)'
                        onPress={this.postComment}
                    />
                </KeyboardAvoidingView>
                <View style={styles.container}>
                    <Modal
                        animationType='slide'
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
                                <Text 
                                    style={styles.modalTitle}
                                >
                                    Please log in (or sign up) in order to post comments.
                                </Text>
                        
                                <View style={styles.modalDivider}></View>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({isVisible: false});
                                        this.props.navigate.navigate('LoginScreen')
                                    }}
                                    style={styles.modalButton}
                                >
                                    <Text style={styles.modalText}>Login here</Text>
                                </TouchableOpacity>
                                <Text style={styles.modalText}>OR</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({isVisible: false});
                                        this.props.navigate.navigate('SignupScreen')
                                    }}
                                    style={styles.modalButton}
                                >
                                    <Text style={styles.modalText}>Sign-up here</Text>
                                </TouchableOpacity>
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
    commentsection: {
        marginHorizontal: 5,
        flex: 1,
        backgroundColor: '#363534',
        height: `100%`,
        marginBottom: 15
    },
    commentheader: {
        marginTop: 10, 
        color: 'skyblue', 
        fontWeight: `bold`,
        fontSize: 20,
        marginBottom: 2,
        paddingHorizontal: 7,
        paddingBottom: 2,
        textShadowColor: `#000`,
        textShadowRadius: 2,
        textShadowOffset: {
            height: 2,
            width: 1,
        },
        backgroundColor: 'darkslategray',
        borderRadius: 15,
        alignSelf: 'flex-start'
    },
    commentcontainer: {
        borderWidth: 0.5,
        borderColor: 'darkslategray',
        padding: 1
    },
    commentinst: {
        marginTop: 20,
        marginBottom: 20, 
        fontFamily:`sans-serif-thin`,
        fontStyle: `italic`,
        fontSize: 12,
        color: `lightgray`,
        paddingVertical: 1,
        marginVertical: 1,
        marginLeft: 4
    },
    container: {
         backgroundColor: 'gray',
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
    },
    modalButton: {
        marginTop: 10,
        backgroundColor: `darkslategray`,
        padding: 5,
        fontSize: 14,
        borderRadius: 2,
        marginVertical: 1,
        borderWidth: 1,
        borderColor: 'rgb(1, 0, 64)',
        marginHorizontal: 5,
        bottom: 0,
        justifyContent: 'center',
        alignContent: 'center'
    },
    modalText: {
        color:`rgb(135, 206, 250)`,
        fontWeight: `bold`,
    },
    modalTitle: {
        marginTop: 10, 
        marginBottom: 1, 
        textAlign: `center`,
        color: 'skyblue', 
        fontSize: 15,
        fontWeight: `bold`,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalDivider: {
        marginVertical: 3,
        height: 1,
        width: `95%`,
        borderWidth: 0.5,
        borderColor: `darkslategray`,
        backgroundColor: 'darkslategray'
    },
    myStarStyle: {
        color: 'yellow'
    }
        
})