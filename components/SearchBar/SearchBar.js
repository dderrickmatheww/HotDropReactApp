import React, { Component } from 'react';
import { View, TextInput, Button, AsyncStorage } from 'react-native';

export default class SearchBar extends Component {
    
        state = {
            onCall: true,
            text: ''
        }
        

        getSearchResults = () => {
            this.setState({onCall: true});
            let searchQuery = this.state.text;
            let cacheName = this.state.text.toLowerCase();
            searchQuery = searchQuery.toLowerCase().replace(' ', '%');
            let url = 'https://www.giantbomb.com/api/search/?format=json&api_key=99ec1d8980f419c59250e12a72f3b31d084e9bf9&query=' + searchQuery + '&resources=game&limit=1'
            
            fetch(url)
            .then(function(response) {
               
                response.json().then(async data => {

                    let value = await AsyncStorage.getItem(cacheName);

                    if ( value ) {

                        console.log(value);
                        value = JSON.parse(value);

                    } 
                    else {

                        await AsyncStorage.setItem(cacheName, JSON.stringify(data.results))
                        value = data.results;
                        console.log('its running');

                    }
                    
                })

            })
            .catch(function() {
                if (err) {

                }
            });
        }
      
        getCard = () => {
            console.log('hello')
        }

        render() {
          return (
              <View>
                <TextInput
                style={{height: 40, width: '100%', backgroundColor: 'white', borderColor: 'yellow', borderWidth: 1}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                />
                <Button title='Search' onPress={this.getSearchResults() && this.getCard()}/>
            </View>
          );
        }
      
}

