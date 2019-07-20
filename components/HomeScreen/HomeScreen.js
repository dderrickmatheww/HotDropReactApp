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
      article: []
  }

  componentWillMount() {
    let month = new Date().getMonth() + 1; 
    let year = new Date().getFullYear();
    console.log(year, month)
    let url ="https://newsapi.org/v2/top-headlines?sources=ign,polygon&from=" + year + "-" + month +"&sortBy=publishedAt&apiKey=f38cc49da4df4fd0b9ceea723e83cb15"
    fetch(url)
    .then( response => {
        response.json().then( data => {
            console.log(data);
            this.setState({article: data.articles})
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch((err) => {
        console.log(err);
    })

  }
    getSearchResults = (text) => {
      // this.setState({onCall: true});
      this.props.navigation.navigate('CardScreen', {
        text: text
      });
  }
  
    render() {
      return (
        <View style={{ backgroundColor: "#363534"}}>

                <ScrollView>

                    <SearchBar getSearchResults={this.getSearchResults}  />

                    {this.state.article.map(article => (
                    
                    <ArticleCard
                        cardhead={article.title}
                        cardauthor={article.author}
                        cardbody={article.content}
                        link={article.url}
                        pic={article.urlToImage}
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