import React from 'react';
import { ScrollView, AsyncStorage, View, StyleSheet, TouchableOpacity, Text, Image, Linking } from 'react-native';
import GameCard from '../gamecard/gameCard';
import TwitchCom from '../twitchcard/twitchcard';
import YoutubeCom from '../youtubecard/youtubecard';
import ArticleCard from '../articlecard/articleCard';

    export default class CardScreen extends React.Component {

        static navigationOptions = ({ navigation }) => {
            return {
              title: navigation.getParam('text') ? navigation.getParam('text') : navigation.getParam('name'),
              headerStyle: {
                backgroundColor: 'rgb(1, 0, 24)',
              },
              headerTintColor: 'skyblue'
            };
          };

        state = {
            searchResults: [],
            twitchResults: [],
            YTVidID: [],
            YTcomments: [],
            gameArticles: [],
            date: [],
            platforms: [],
            pic: {},
            YTtoggle: false,
            NWtoggle: false,
            TWtoggle: false
        }

        YTtoggle = async () => {
            const newState = !this.state.YTtoggle
            this.setState({YTtoggle: newState});
            let { navigation } = this.props;
            let text = navigation.getParam('text', '');
            let name = navigation.getParam('name', '');
            let cacheName = ''
            if (text) {
                cacheName = text.toLowerCase();
            }
            if (name) {
                cacheName = name.toLowerCase();
            }
            let url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + this.state.searchResults.name + "+game+trailer" + "&type=video&key=AIzaSyAhsb0OUjYC9-im6U3pNoks26zkjBWUtHo"
            let value =  await AsyncStorage.getItem(cacheName);
            value = JSON.parse(value);
            if ( value.items && value.videoId ) {
                console.log("Grabbed comments & video id from cache");
                console.log(value.items.snippet.topLevelComment.snippet.authorProfileImageUrl);
                this.setState({YTVidID: value.videoId});
                this.setState({YTcomments: value.items});
            }
            else {
                fetch(url)
                .then((response) => {
                    response.json().then( async data => {
                        let videoId = data.items[0].id.videoId
                        await  AsyncStorage.mergeItem(cacheName, JSON.stringify(data.items[0].id)).catch((err) => {if(err) console.log(err)});
                        console.log('added video id to cache');
                        this.setState({YTVidID: videoId});
                    })
                    .catch((err) => {
                            console.log(err)
                    });
                })
                .catch((err) => {
                        if(err) {
                        console.log(err);
                        }
                });
            }
        }
        NWtoggle = () => {
            const newState = !this.state.NWtoggle
            this.setState({NWtoggle: newState})
            let month = new Date().getMonth() + 1; 
            let year = new Date().getFullYear();
            let url = "https://newsapi.org/v2/everything?q="+ this.state.searchResults.name +"&from="+ year +"-"+ month +"&sources=ign,polygon&sortBy=publishedAt&apiKey=f38cc49da4df4fd0b9ceea723e83cb15";
                fetch(url)
                .then((response) => {
                    response.json()
                    .then( data => {
                        console.log('added article data');
                        this.setState({gameArticles: data.articles.slice(1, 4)}); 
                    })
                    .catch((err)=>{
                        if (err) {
                            console.log(err)
                        }
                    });
                })
                .catch((err) => {
                        console.log(err)
                });  
        }
        TWtoggle = () => {
            const newState = !this.state.TWtoggle
            this.setState({TWtoggle: newState});
            let gameStreams ='https://api.twitch.tv/kraken/search/streams?query='+ this.state.searchResults.name +'&limit=5&client_id=7mx4fyx7xv1pcxfe25fmguto1xao2b';
                fetch(gameStreams)
                .then((response) => {
                    response.json()
                    .then((data) => {
                        console.log('Stream data added')
                        console.log(data.streams);
                        this.setState({twitchResults: data.streams});
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
        componentDidMount() {

            let { navigation } = this.props;
            let text = navigation.getParam('text', '');
            let id = navigation.getParam('id', '');
            let searchQuery = ''
            let cacheName = ''
            let url = ''

            if (text) {
                searchQuery = text;
                cacheName = text.toLowerCase();
                searchQuery = searchQuery.toLowerCase().replace(' ', '%');
                url = 'https://www.giantbomb.com/api/search/?format=json&api_key=99ec1d8980f419c59250e12a72f3b31d084e9bf9&query=' + searchQuery + '&resources=game&limit=1';

            } else if (id) {
                searchQuery = id;
                cacheName = id;
                url = `https://www.giantbomb.com/api/game/` + searchQuery + `/?format=json&api_key=99ec1d8980f419c59250e12a72f3b31d084e9bf9`
            }

            cacheResults = async (cacheName, url) => {
                let value = await AsyncStorage.getItem(cacheName);
                if ( value ) {
                    value = JSON.parse(value);
                    console.log('Grabbed game data from cache')
                    this.setState({searchResults: value});  
                    this.setState({date: [value.expected_release_month, '/', value.expected_release_day, '/', value.expected_release_year]});
                    this.setState({platforms: value.platforms.map(platforms => platforms.abbreviation).join(', ')});
                    this.setState({pic: value.image});
                } 
                else {
                    fetch(url)
                    .then( response => {
                        response.json().then( async data => {
                            if (text) {
                                value = data.results[0];
                            }
                            if (id) {
                                value = data.results;
                            }
                            await AsyncStorage.setItem(cacheName, JSON.stringify(value));
                            console.log('Added game data to cache')
                            this.setState({searchResults: value});
                            this.setState({date: [value.expected_release_month, '/', value.expected_release_day, '/', value.expected_release_year]});
                            this.setState({platforms: value.platforms.map(platforms => platforms.abbreviation).join(', ')});
                            this.setState({pic: value.image});
                        })
                        .catch(function(err) {
                            if(err) {
                                console.log(err);
                            }
                        })
                    })
                    .catch(function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                
            }
            cacheResults(cacheName, url);
        }

        render() {
            return (
            <View style={{flex: 1, backgroundColor: "#363534"}}>
                    <ScrollView>
                    <GameCard
                        title={this.state.searchResults.name}
                        platforms={this.state.platforms}
                        releasedate={this.state.date}
                        description={this.state.searchResults.deck}
                        picture={this.state.pic.medium_url}
                    />
                    <View style={styles.bottom}>
                             <TouchableOpacity onPress={this.NWtoggle} style={styles.bottombutton}><Text style={styles.bottombuttontext}> More News </Text></TouchableOpacity>
                                {
                                    this.state.NWtoggle ?  this.state.gameArticles.map(article => (<ArticleCard  cardhead={article.title} cardauthor={article.author} cardbody={article.content} link={article.url} source={article.source.name} pic={article.urlToImage}/> )) : null
                                }
                             <TouchableOpacity onPress={this.YTtoggle} style={styles.bottombutton}><Text style={styles.bottombuttontext}> YouTube </Text></TouchableOpacity>
                                {
                                    this.state.YTtoggle ? <YoutubeCom videoId={this.state.YTVidID} comments={this.state.YTcomments}/> : null
                                }
                             <TouchableOpacity onPress={this.TWtoggle} style={styles.bottombutton}><Text style={styles.bottombuttontext}> Twitch </Text></TouchableOpacity>
                                {
                                    this.state.TWtoggle ? this.state.twitchResults.map( stream => (<TwitchCom streamedGame={stream.channel.game}
                                    streamerName={stream.channel.display_name}
                                    streamerFollowers={stream.channel.followers}
                                    streamerBanner={stream.channel.profile_banner}
                                    streamerBackgroundColor={stream.channel.profile_banner_background_color}
                                    streamerStatus={stream.channel.status}
                                    streamURL={stream.channel.url}
                                    streamBanner={stream.channel.video_banner}
                                    streamPreview={stream.preview.medium} /> )) : null
                                }
                    </View>
                </ScrollView>
            </View>
            )
        }
    }

    const styles = StyleSheet.create({
        bottombutton: {
            backgroundColor: `darkslategray`,
            padding: 5,
            fontSize: 14,
            borderRadius: 2,
            marginRight: 5,
            bottom: 0,
            justifyContent: 'center',
            alignContent: 'center'
        },
        bottombuttontext: {
            color:`rgb(135, 206, 250)`,
            fontWeight: `bold`,
        }
    
    })