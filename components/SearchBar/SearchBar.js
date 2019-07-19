import React, { Component } from 'react';
import { View, TextInput, Button, AsyncStorage } from 'react-native';


export default class SearchBar extends Component {
    
        state = {
            onCall: true,
            text: '',
            page: ''
        }

      
        render() {
          return (
              <View>
                <TextInput
                  style={{height: 40, width: '95%', backgroundColor: '#363534', borderColor: 'yellow', borderWidth: 1, color: 'white'}}
                  onChangeText={(text) => this.setState({text})}
                  value={this.state.text}
                  placeholder='Where we droppin&#39;?'
                  placeholderTextColor='lightgray'
                />
                <Button title='Search' onPress={() => this.props.getSearchResults(this.state.text)}/>
            </View>
          );
        }
      
}