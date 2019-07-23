import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import ArticleCard from '../articlecard/articleCard';
import SearchBar from '../SearchBar/SearchBar';
import Footer from '../footer/footer';
import CardScreen from '../CardScreen/CardScreen'
import { createStackNavigator, createAppContainer } from "react-navigation";
import Header from '../header/header';
import TwitchCom from '../twitchcard/twitchcard';

export default class HomeScreen extends React.Component {

    static navigationOptions = {

        headerTitle: <Header />,
        footerTitle: <Footer />

      };

    state = {
      article: [],
      streams: []
  }

  componentWillMount() {
    let month = new Date().getMonth() + 1; 
    let year = new Date().getFullYear();
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
    });

    let top100Streams ='https://api.twitch.tv/kraken/streams?limit=10&client_id=7mx4fyx7xv1pcxfe25fmguto1xao2b';
    fetch(top100Streams)
    .then((response) => {
        response.json()
        .then((data) => {
            this.setState({streams: data.streams});
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            }    
        })
    })
    .catch((err) => {
        if (err) {
            console.log(err);
        }
    });
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
                    <Text style={styles.text}>Top Twitch Streams</Text>
                    <ScrollView horizontal="true">
                      {this.state.streams.map(stream => ( 
                        <TwitchCom 
                          streamedGame={stream.channel.game}
                          streamerName={stream.channel.display_name}
                          streamerFollowers={stream.channel.followers}
                          streamerBanner={stream.channel.profile_banner}
                          streamerBackgroundColor={stream.channel.profile_banner_background_color}
                          streamerStatus={stream.channel.status}
                          streamURL={stream.channel.url}
                          streamBanner={stream.channel.video_banner}
                          streamPreview={stream.preview.medium}
                        />
                      ))}
                    </ScrollView>

                    <Text style={styles.text}>Aggregated News</Text>
                    {this.state.article.map(article => (
                    <ArticleCard
                        cardhead={article.title}
                        cardauthor={article.author}
                        cardbody={article.content}
                        link={article.url}
                        source={article.source.name}
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

  const styles = StyleSheet.create({
    text: {
      fontWeight: `bold`,
      color: `skyblue`,
      fontVariant: `small-caps`,
      marginLeft: 4,
      fontSize: 16
    }
  })

  module.exports = createAppContainer(AppNavigator);