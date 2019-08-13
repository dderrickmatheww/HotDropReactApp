import React, {Component} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
export default class CommentsRender extends Component {
    static propTypes = {
        commentData: PropTypes.array.isRequired
    }
    render () {
        return(
            <View>
                { 
                    this.props.commentData.length > 0 ?
                    this.props.commentData.map((comment) => {
                        return (
                            <View>
                                <Text>Name: {comment.authorName}</Text>
                                <Text>comment: {comment.comment}</Text>
                            </View>
                        )
                    }) : <Text>No comments yet</Text>
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