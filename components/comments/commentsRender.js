import React, {Component} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
export default class CommentsRender extends Component {
    static propTypes = {
        commentData: PropTypes.array.isRequired
    }

    everyOther = (index) => {
        if (index % 2 === 0) {
            return `rgb(1, 0, 24)`
        } else {
            return `rgb(1, 0, 48)`
        }
    }
    
    render () {
        return(
            <View>
                { 
                    this.props.commentData.length > 0 ?
                    this.props.commentData.map((comment) => {
                        return (
                            <View style={[styles.card, {backgroundColor: this.everyOther(this.props.commentData.indexOf(comment))}]}>
                                    <Text style={styles.author}>{comment.authorName}</Text>
                                    <Text style={styles.comment}>{comment.comment}</Text>
                            </View>
                        )
                    }) : <Text style={styles.nocomments}>No comments here yet -- try leaving one!</Text>
               }
            </View>   
        )
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: `rgb(1, 0, 24)`,
        height: `auto`,
        marginVertical: 1,
        padding: 5,
        borderRadius: 3,
        borderColor: `darkslategray`,
        borderWidth: 0.66,
        shadowColor: "#000",
        flexDirection: `column`,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    author: {
        color:`rgb(135, 206, 250)`,
        fontWeight: `bold`,
        fontSize: 11,
    },
    comment: {
        fontWeight: `100`,
        color:`white`,
        fontSize: 11,
    },
    nocomments: {
        padding: 20,
        fontStyle: 'italic',
        color:`rgb(135, 206, 250)`,
        fontSize: 12,
    }
})