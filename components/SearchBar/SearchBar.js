import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, AsyncStorage } from 'react-native';
import {Autocomplete} from 'react-native-autocomplete-input';


export default class SearchBar extends Component {
    
        state = {
            onCall: true,
            text: '',
            page: ''
        }

    
        render() {
          return(
            <View>
              <View style={styles.autocompleteContainer}>
                <Autocomplete 
                  data={data}
                  defaultValue={query}
                  onChangeText={text => this.setState({ query: text })}
                  renderItem={({ item, i }) => (
                    <TouchableOpacity onPress={() => this.setState({ query: item })}>
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  )}
                  onChangeText={(text) => this.setState({text})}
                  value={this.state.text}
                  placeholder='Where we droppin&#39;?'
                  placeholderTextColor='gray'/>
              </View>
              <View>
                <Text>Some content</Text>
              </View>            
              <Button title='DEPLOY!' style={styles.searchbutton} color='rgb(1, 0, 48)' onPress={() => this.props.getSearchResults(this.state.text)}/>
            </View>            
            

          )};
          
      
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  }
});