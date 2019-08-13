import React, {Component} from 'react';
import { View, StyleSheet, Button, TextInput, AsyncStorage, Text, FlatList } from 'react-native';
import Firebase from '../LoginScreen/firebase';
import CommentsRender from './commentsRender';
export default class commentsCom extends Component {
    state = {
        author: '',
        comment: '',
        gameExists: false,
        searchedGame: this.props.game,
        commentData: []
    };
    async componentDidMount() {
        let searchedGame = this.state.searchedGame.toLowerCase();
        await this.grabbingComments(searchedGame);
        console.log(this.state.commentData);
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
                        this.grabbingComments(searchedGame)
                    }
                    else {
                        console.log('here/else');
                        console.log(searchedGame)
                        await Firebase.gameRef.child(searchedGame).push({
                            comment: Firebase.comments.comment,
                            authorName: Firebase.comments.authorName
                        });
                        this.grabbingComments(searchedGame)
                    }
                }
            }
            else {
                alert('You must be signed in to post comments');
            }
    }
    grabbingComments = (searchedGame) => {
        
        Firebase.gameRef.child(searchedGame).on('value', (snap) => {
                let child = snap.val();
                if(child) {
                    let items = Object.values(child);
                    this.setState({commentData: items}); 
                }
        }, 
        function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        })
    }

    render () {
        console.log('render ' + this.state.commentData)
        console.log(this.state.commentData.length)
        return(
            <View style={styles.aboutscreen}>
                <Text style={{marginTop: 10, marginBottom: 1, textDecorationLine: 'underline'}}>All comments</Text>
               
                <CommentsRender commentData={this.state.commentData} />

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