import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import Header from './components/header/header';
import SearchBar from './components/SearchBar/SearchBar'
import { createStackNavigator, createAppContainer } from "react-navigation";

export default function App() {
  
  class Home extends React.Component {
            
    getSearchResults = (text) => {
      // this.setState({onCall: true});
      
      let searchQuery = text;
      let cacheName = text.toLowerCase();
      searchQuery = searchQuery.toLowerCase().replace(' ', '%');

      this.props.navigation.navigate('Details', {
        text: text
      });
      
  }
    render() {
      return (
        <View style={{flex: 1, backgroundColor: "grey"}}>

          <Header />

          <KeyboardAvoidingView>

              <SearchBar getSearchResults={this.getSearchResults}  />

          </KeyboardAvoidingView>

        </View>
      
      )
    }
  }
  class Card extends React.Component {
    state = {
      searchResults: []
    }
    componentDidMount() {

      const { navigation } = this.props;
      const text = navigation.getParam('text', '');
      let searchQuery = text;
      let cacheName = text.toLowerCase();
      searchQuery = searchQuery.toLowerCase().replace(' ', '%');
      let url = 'https://www.giantbomb.com/api/search/?format=json&api_key=99ec1d8980f419c59250e12a72f3b31d084e9bf9&query=' + searchQuery + '&resources=game&limit=1'
            
            fetch(url)
            .then(function(response) {
              
                response.json().then( async data => {

                    let value = await AsyncStorage.getItem(cacheName);

                    if ( value ) {
                        value = JSON.parse(value);
                    } 
                    else {
                        await AsyncStorage.setItem(cacheName, JSON.stringify(data.results));
                        value = data.results;
                    }
                    this.setState({searchResults: value});
                })
            })
            .catch(function() {
                if (err) {

                }
            });

      }
  }
  const AppNavigator = createStackNavigator(
    {
      Home: Home,
      Card: Card
    },
    {
      initialRouteName: "Home"
    }
  );

  module.exports = createAppContainer(AppNavigator);
  
  render() {
    return (
      <View style={{flex: 1, backgroundColor: "grey"}}>

        <Header />

        <KeyboardAvoidingView>

            

        </KeyboardAvoidingView>

      </View>
    
    )
  }
 
}


