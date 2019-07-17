import React from 'react';
import { StyleSheet, Text, ScrollView, View, KeyboardAvoidingView } from 'react-native';
import Header from './components/header/header';
import SearchBar from './components/SearchBar/SearchBar'
import { createStackNavigator, createAppContainer } from "react-navigation";

export default function App() {

  state = {
    articles: [
      {
        title: "Title 1",
        subheader: "Subhead 1",
        body: "This is an article card. Blah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blah",
        link: "https://ign.com"
      },
      {
        title: "Title 2",
        subheader: "Subhead 2",
        body: "This is an article card. Blah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blah",
        link: "https://ign.com"
      },
      {
        title: "Title 3",
        subheader: "Subhead 3",
        body: "This is an article card. Blah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blah",
        link: "https://ign.com" 
      },
      {
        title: "Title 4",
        subheader: "Subhead 4",
        body: "This is an article card. Blah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blah",
        link: "https://ign.com" 
      },
      {
        title: "Title 5",
        subheader: "Subhead 5",
        body: "This is an article card. Blah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blah",
        link: "https://ign.com" 
      },
      {
        title: "Title 6",
        subheader: "Subhead 6",
        body: "This is an article card. Blah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blah",
        link: "https://ign.com" 
      }
    ]
}
  class Home extends React.Component {
            
    getSearchResults = (text) => {
      // this.setState({onCall: true});
      this.props.navigation.navigate('Card', {
        text: text
      });
      
  }
    render() {
      return (
        <View style={{flex: 1, backgroundColor: "grey"}}>

          <Header />

          <KeyboardAvoidingView>
            <ScrollView>

              <SearchBar getSearchResults={this.getSearchResults}  />

              {this.state.articles.map(article => (
              
              <ArticleCard
                cardhead={article.title}
                cardsubhead={article.subheader}
                cardbody={article.body}
                link={article.link}
              />
              ))}
            </ScrollView>

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
                        console.log('Grabbed from cache')
                        console.log(value);
                    } 
                    else {
                        await AsyncStorage.setItem(cacheName, JSON.stringify(data.results));
                        value = data.results;
                        console.log('Add to cache')
                        console.log(value);
                    }
                    this.setState({searchResults: value});
                })
            })
            .catch(function() {
                if (err) {

                }
            });

      }
  
 
  
    render() {
      return (
        <View style={{flex: 1, backgroundColor: "grey"}}>

          <Header />

          <KeyboardAvoidingView>
              <ScrollView>
              {/* The GameCard below shouldn't be on the homepage, obviously, it's just here to see styling and components until we get routing and pages set up */}

              <GameCard
                title="Apex Legends"
                platforms="PC, PS4, XBO"
                releasedate="2019"
                description="This battle royale from Respawn Entertainment is focused on teams and special abilities"
              />
            </ScrollView>
          </KeyboardAvoidingView>
        <Footer/>
      </View>
      )
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
}

