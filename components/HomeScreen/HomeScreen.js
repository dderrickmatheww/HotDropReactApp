import React from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import ArticleCard from '../articlecard/articleCard';
import Footer from '../footer/footer';
import CardScreen from '../CardScreen/CardScreen'
import { createStackNavigator, createAppContainer } from "react-navigation";
import Header from '../header/header';
import TwitchCom from '../twitchcard/twitchcard';
import AutoCompleteBar from '../AutoCompleteBar/autoCompleteBar';
import AboutScreen from '../AboutScreen/AboutScreen';
import LoginScreen from "../LoginScreen/LoginScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import SignupScreen from "../SignupScreen/SignupScreen";
import Firebase from '../LoginScreen/firebase';
import Divider from '../Divider/Divider';

export default class HomeScreen extends React.Component {

    static navigationOptions = {

        headerTitle: <Header />

    };
    state = {
      article: [],
      streams: [],
      mixerResults: [],
      bool: true
  }
  loadTwitchNewsAndMixer = async () => {
    let month = new Date().getMonth() + 1; 
    let year = new Date().getFullYear();
    let url ="https://newsapi.org/v2/everything?sources=ign,polygon&from=" + year + "-" + month +"&sortBy=publishedAt&apiKey=f38cc49da4df4fd0b9ceea723e83cb15&language=en"
    //"language=en" should be swapped out eventually for some array passed from a settings option for language preferences. 
    //i'm setting it to en for obvious testing purposes and being IGN tends to republish the same stories in multiple languages
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
    let top100Streams ='https://api.twitch.tv/helix/streams?first=10';
    fetch(top100Streams, {
      headers: {
        "Client-ID": '7mx4fyx7xv1pcxfe25fmguto1xao2b'
      }
    })
    .then((response) => {
        response.json()
        .then((data) => {
            this.setState({streams: data.data});
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
    fetch('https://mixer.com/api/v1/channels?order=viewersCurrent:DESC&limit=10')
    .then((response) => {
        response.json()
        .then((data) => {
            console.log('Mixer data added')
            console.log(data);
            this.setState({mixerResults: data});
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
    this.setState({bool: false});
  }
  componentWillMount = () => {
    try {
      Firebase.init();
    } 
    catch (err) {
      console.log(err)
    }
    this.loadTwitchNewsAndMixer()
  }
  getSearchResults = (text) => {
      if(text){
        this.props.navigation.navigate('CardScreen', {
          text: text
        });
      }
      else {
        alert('Please enter a game to search');
      }
  }
  getSuggestion = (name, id) => {
    this.props.navigation.navigate('CardScreen', {
      name: name,
      id: id
    });
  }
  scrollToTop = () => {
    this.refs.mainScroll.scrollTo({x: 0, y: 0, animated: true})
    this.loadTwitchNewsAndMixer()
  }
  
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#363534"}}>
              <ScrollView 
                keyboardShouldPersistTaps='always'     
                ref = 'mainScroll'
              >
                  <AutoCompleteBar
                    getSearchResults={this.getSearchResults}
                    getSuggestion={this.getSuggestion}
                  />


                <View style={{marginTop: 95}}>

                <Divider color='#545251'/>

                  <View>
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
                      {this.state.streams.length > 0 ? this.state.streams.map(stream => ( 
                        <TwitchCom 
                        streamerName={stream.user_name}
                        streamerFollowers={stream.viewer_count}
                        streamerStatus={stream.title}
                        streamURL={"https://www.twitch.tv/" + stream.user_name}
                        streamerPreview={stream.thumbnail_url.slice(0, -21) + "-640x360.jpg"}
                        />
                      )): null}
                      </ScrollView>
                      <Text style={styles.scrollinst}>« Swipe left and right to browse streams »</Text>
                    </View>
                  </View>

                  <Divider color='#545251'/>

                  <View>
                    <Text style={styles.text}>Top Mixer Streams</Text>
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
                      {this.state.mixerResults.length > 0 ? this.state.mixerResults.map(stream => ( 
                        <TwitchCom 
                          streamedGame={stream.type.name}
                          streamerName={stream.user.username}
                          streamerFollowers={stream.numFollowers}
                          streamerPreview={stream.user.avatarUrl}
                          streamerStatus={stream.name}
                          streamURL={'https://mixer.com/' + stream.token}
                          streamBanner={stream.type.backgroundUrl}
                        />
                      )) : null}
                      </ScrollView>
                      <Text style={styles.scrollinst}>« Swipe left and right to browse streams »</Text>
                    </View>
                  </View>

                  <Divider color='#545251'/>
                  
                  <Text style={styles.text}>Aggregated News</Text>
                  {this.state.article.length > 0 ? this.state.article.map(article => (
                  <ArticleCard
                      cardhead={article.title}
                      cardauthor={article.author}
                      cardbody={article.description}
                      link={article.url}
                      source={article.source.name}
                      pic={article.urlToImage}
                      index={this.state.article.indexOf(article)}
                  />
                  )): null} 
              </View>  
              </ScrollView>
              <Footer 
                scrollfunc={this.scrollToTop}
                about={() => this.props.navigation.navigate('AboutScreen')}
                login={() => this.props.navigation.navigate('LoginScreen', {onNavigateBack: this.handleOnNavigateBack})}
                profile={() => this.props.navigation.navigate('ProfileScreen')}
                signup={() => this.props.navigation.navigate('SignupScreen', {onNavigateBack: this.handleOnNavigateBack})}
                user={this.state.user}
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
      marginLeft: 7,
      fontSize: 20,
      marginBottom: 2,
      paddingHorizontal: 7,
      paddingBottom: 2,
      textShadowColor: `#000`,
      textShadowRadius: 2,
      textShadowOffset: {
          height: 2,
          width: 1,
      },
      backgroundColor: 'darkslategray',
      borderRadius: 15,
      alignSelf: 'flex-start'
    },
    scrollinst: {
      fontFamily:`sans-serif-thin`,
      fontStyle: `italic`,
      fontSize: 10,
      color: `lightgray`,
      paddingVertical: 1,
      marginVertical: 1,
      marginLeft: 4
    }
  })

  module.exports = createAppContainer(AppNavigator)