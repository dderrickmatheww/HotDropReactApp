import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet} from 'react-native';


export default class SearchBar extends Component {
    
        state = {
            onCall: true,
            text: '',
            page: ''
        }

      
        render() {
          return (
              <View style={styles.searchbar}>
                <TextInput
                  style={{height: 40, width: '100%', backgroundColor: 'rgb(52, 58, 64)', borderColor: 'rgb(206, 212, 218);', fontWeight:'bold', borderWidth: 1, color: 'white'}}
                  onChangeText={(text) => this.setState({text})}
                  value={this.state.text}
                  placeholder='Where we droppin&#39;?'
                  placeholderTextColor='gray'
                />
                <Button title='DEPLOY!' style={styles.searchbutton} color='rgb(1, 0, 64)' onPress={() => this.props.getSearchResults(this.state.text)}/>
            </View>
          );
        }
      
}

const styles = StyleSheet.create({
  searchbar: {
    margin: 4
  }
})