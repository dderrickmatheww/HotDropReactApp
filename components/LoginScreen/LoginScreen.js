import React from 'react';
import { View, TextInput, Button, KeyboardAvoidingView } from 'react-native';


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
                style={{height: 40, width: '100%', backgroundColor: 'white', borderColor: 'yellow', borderWidth: 1}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
            />
            <TextInput
                style={{height: 40, width: '100%', backgroundColor: 'white', borderColor: 'yellow', borderWidth: 1}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
            />
            <Button title='Search' onPress={() => this.props.getSearchResults(this.state.text)}/>
        </View>
      );
    }
  
}