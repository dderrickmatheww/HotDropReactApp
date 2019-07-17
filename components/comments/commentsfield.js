import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Button } from "react-native";

export default class CommentsField extends Component {
    constructor(props) {
      super(props);
      this.state = { text: '' };
    }
  
    render() {
      return (
        <View style={styles.commentfield}>
            <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                placeholder='Type comment here'
                placeholderTextColor='white'
            />
            <Button title="Submit"/>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    commentfield: {
        margin: 4
    },
    input: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        color: `white`
    }
})