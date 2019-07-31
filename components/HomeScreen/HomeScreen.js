import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import ArticleCard from '../articlecard/articleCard';
import Footer from '../footer/footer';
import CardScreen from '../CardScreen/CardScreen'
import { createStackNavigator, createAppContainer, SwitchActions } from "react-navigation";
import Header from '../header/header';
import TwitchCom from '../twitchcard/twitchcard';
import AutoCompleteBar from '../AutoCompleteBar/autoCompleteBar';
import AboutScreen from '../AboutScreen/AboutScreen';
import LoginScreen from "../LoginScreen/LoginScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import Firebase from '../loginmodule/firebase';


export default class HomeScreen extends React.Component {

    static navigationOptions = {

        headerTitle: <Header />

      };

    state = {
      article: [],
      streams: []
  }

  componentWillMount() {
    Firebase.init();
    let month = new Date().getMonth() + 1; 
    let year = new Date().getFullYear();
    let url ="https://newsapi.org/v2/top-headlines?sources=ign,polygon&from=" + year + "-" + month +"&sortBy=publishedAt&apiKey=f38cc49da4df4fd0b9ceea723e83cb15"
    fetch(url)
    .then( response => {
        response.json().then( data => {
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
  componentWillUnmount() {
    Firebase.init();
    this.componentWillMount;
    let month = new Date().getMonth() + 1; 
    let year = new Date().getFullYear();
    let url ="https://newsapi.org/v2/top-headlines?sources=ign,polygon&from=" + year + "-" + month +"&sortBy=publishedAt&apiKey=f38cc49da4df4fd0b9ceea723e83cb15"
    fetch(url)
    .then( response => {
        response.json().then( data => {
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

    getSuggestion = (name, id) => {
      this.props.navigation.navigate('CardScreen', {
        name: name,
        id: id
      });
    }

    scrollToTop = () => {
      this.refs.mainScroll.scrollTo({x: 0, y: 0, animated: true})
      this.componentWillMount()
    }
  
    render() {
      return (
        <View style={{ backgroundColor: "#363534"}}>

                <ScrollView 
                  keyboardShouldPersistTaps='always'     
                  ref = 'mainScroll'
                  style={{marginBottom: 50}}
                >
                    <AutoCompleteBar
                      getSearchResults={this.getSearchResults}
                      getSuggestion={this.getSuggestion}
                    />

                  <View style={{marginTop: 95}}>
                    <Text style={styles.text}>Top Twitch Streams</Text>
                    <View                       
                      style={{
                        backgroundColor: '#545251', 
                        paddingTop: 2, 
                        paddingBottom: 4,
                        borderBottomColor: 'rgb(1, 0, 96)',
                        borderBottomWidth: 2
                      }}
                    >
                    <ScrollView 
                      horizontal="true" 
                      persistentScrollbar={true}
                      snapToInterval={358} 
                      snapToAlignment="center" 
                      indicatorStyle="white" 
                    >
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
                      <Text style={styles.scrollinst}>« Swipe left and right to browse streams »</Text>
                    </View>
                    

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
                </View>  
                </ScrollView>
                <Footer 
                  scrollfunc={this.scrollToTop}
                  about={() => this.props.navigation.navigate('AboutScreen')}
                  login={() => this.props.navigation.navigate('LoginScreen')}
                  profile={() => this.props.navigation.navigate('ProfileScreen')}
                  signup={() => this.props.navigation.navigate('SignupScreen')}
                />
        </View>
      
      )
    }
  }

  const AppNavigator = createStackNavigator(
    {
      HomeScreen: HomeScreen,
      CardScreen: CardScreen,
      AboutScreen: AboutScreen,
      LoginScreen: LoginScreen,
      ProfileScreen: ProfileScreen,
      SignupScreen: SignupScreen
    },
    {
      initialRouteName: "HomeScreen"
    }
  );


  const styles = StyleSheet.create({
    text: {
      fontWeight: `bold`,
      color: `skyblue`,
      marginLeft: 4,
      fontSize: 18,
      marginTop: 2
    },
    scrollinst: {
      fontStyle: `italic`,
      fontSize: 10,
      color: `lightgray`,
      paddingVertical: 1,
      marginLeft: 4
    }
  })

  module.exports = createAppContainer(AppNavigator)