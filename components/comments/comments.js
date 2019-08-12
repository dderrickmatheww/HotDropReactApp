import React, {Component} from 'react';
import { View, StyleSheet, Button, TextInput, AsyncStorage, Text } from 'react-native';
import Firebase from '../LoginScreen/firebase';

export default class commentsCom extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Log In',
            headerStyle: {
            backgroundColor: 'rgb(1, 0, 24)',
          },
          headerTintColor: 'skyblue'
        };
    };
    componmentWillMount() {
        this.renderComments();
    }
    state = {
        author: '',
        comment: '',
        gameExists: false,
        searchedGame: this.props.game,
        commentData: [],
        authorData: []    
    }
      postComment = async () => {
        let searchedGame = this.state.searchedGame.toLowerCase();
        await Firebase.database.ref('game').once("value").then((snapshot) => {this.setState({gameExists: snapshot.child(searchedGame).exists()}); console.log(snapshot.child(this.state.searchedGame).exists())});
        let user = await AsyncStorage.getItem('user');
            if (user) {
                Firebase.comments.authorName = this.state.author
                Firebase.comments.comment = this.state.comment
                if(this.state.comment === '') {
                    alert('Please enter a comment')
                } 
                else if (this.state.author === ''){
                    alert('Please enter an author name');
                }
                else {
                    if (this.state.gameExists) {
                        console.log('here/if')
                        await Firebase.gameRef.child(searchedGame).push({

                            comment: Firebase.comments.comment,
                            authorName: Firebase.comments.authorName
            
                        });
                        this.renderComments(searchedGame);
                    }
                    else {
                        console.log('here/else');
                        console.log(searchedGame)
                        await Firebase.gameRef.child(searchedGame).push({

                            comment: Firebase.comments.comment,
                            authorName: Firebase.comments.authorName

                        });
                        this.renderComments(searchedGame)
                    }
                }
            }
            else {
                alert('You must be signed in to post comments');
            }
    }
    renderComments = (searchedGame) => {
        Firebase.gameRef.child(searchedGame).on('child_added', (snap) => {
            let author = snap.node_.children_.root_.left.value.value_;
            let comment = snap.node_.children_.root_.value.value_
            let authorData = []
            let commentData = []
            authorData.push(author);
            commentData.push(comment);
            this.setState({authorData: authorData})
            this.setState({commentData: commentData}) 
            console.log(this.state.commentDate)
            console.log(this.state.authorData)
        }, 
        function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
        })
    }
    
    render() {
        return(
            <View style={styles.aboutscreen}>
                <Text style={{marginBottom: 10}}>Have something to say? Post a comment below ↴ </Text>
                <TextInput
                    style={{marginBottom: 5, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                    placeholder="Your name"
                    placeholderTextColor="darkslategray"
                    onChangeText={(text) => this.setState({author: text})}
                    onSubmitEditing={this.postComment}
                />
                <TextInput
                    style={{marginBottom: 5, backgroundColor: 'rgb(52, 58, 64)', borderColor: 'skyblue', borderWidth: 1, color: 'white'}}
                    placeholder="What do you have to say?"
                    placeholderTextColor="darkslategray"
                    multiline = {true}
                    numberOfLines = {4}
                    onChangeText={(text) => this.setState({comment: text})}
                    onSubmitEditing={this.postComment}
                />
                <Button
                    title="Post"
                    onPress={this.postComment}
                    style={{marginBottom: 10}}
                />

                <Text style={{marginBottom: 2, textDecorationLine: 'underline'}}>all comments</Text>
                
                    { 
                        this.state.authorData.map((author) => {
                            <View>
                                <Text>Name: {author}</Text>
                            </View>
                        })
                    }
                    { 
                        this.state.commentData.map((comment) => {
                            <View>
                                <Text>Comment: {comment}</Text>
                            </View>
                        })
                    }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    aboutscreen: {
        padding: 20,
        flex: 1,
        backgroundColor: '#545251',
        height: `100%`,
    },
    text:{
        fontSize: 16,
        color: `skyblue`,
        textAlign: `center`
    },
    link: {
        fontSize: 16,
        color: `yellow`,
        fontWeight: `bold`
    }
})