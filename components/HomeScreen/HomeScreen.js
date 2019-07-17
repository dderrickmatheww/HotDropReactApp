import React from 'react';
import { ScrollView, View, KeyboardAvoidingView } from 'react-native';
import ArticleCard from '../articlecard/articleCard';
import SearchBar from '../SearchBar/SearchBar';
import Footer from '../footer/footer';
import CardScreen from '../CardScreen/CardScreen'
import { createStackNavigator, createAppContainer } from "react-navigation";
import Header from '../header/header';


export default class HomeScreen extends React.Component {

    static navigationOptions = {

        headerTitle: <Header />,
        footerTitle: <Footer />

      };

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
    getSearchResults = (text) => {
      // this.setState({onCall: true});
      this.props.navigation.navigate('CardScreen', {
        text: text
      });
  }
  
    render() {
      return (
        <View style={{ backgroundColor: "grey"}}>

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

        </View>
      
      )
    }
  }

  const AppNavigator = createStackNavigator(
    {
      HomeScreen: HomeScreen,
      CardScreen: CardScreen
    },
    {
      initialRouteName: "HomeScreen"
    }
  );

  module.exports = createAppContainer(AppNavigator);