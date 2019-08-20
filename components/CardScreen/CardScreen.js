import React from 'react';
import { ScrollView, AsyncStorage, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import GameCard from '../gamecard/gameCard';
import TwitchCom from '../twitchcard/twitchcard';
import YoutubeCom from '../youtubecard/youtubecard';
import ArticleCard from '../articlecard/articleCard';
import CommentsCom from '../comments/comments';
import Firebase from '../LoginScreen/firebase';

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
            mixerResults: [],
            YTVidID: [],
            gameArticles: [],
            date: [],
            platforms: [],
            pic: {},
            YTtoggle: false,
            NWtoggle: false,
            TWtoggle: false,
            MIXtoggle: false
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
            let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q="' + this.state.searchResults.name + '" game trailer&type=video&key=AIzaSyAhsb0OUjYC9-im6U3pNoks26zkjBWUtHo'
            let value =  await AsyncStorage.getItem(cacheName);
            value = JSON.parse(value);
            if ( value.videoId ) {
                console.log("Grabbed video id from cache");
                this.setState({YTVidID: value.videoId});
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
            let url = 'https://newsapi.org/v2/everything?q="'+ this.state.searchResults.name +'"&from='+ year +'-'+ month +'&sources=polygon&language=en&sortBy=publishedAt&apiKey=f38cc49da4df4fd0b9ceea723e83cb15';
                fetch(url)
                .then((response) => {
                    response.json()
                    .then( data => {
                        if(data.articles.length === 0){
                            alert("There are no new articles for " + this.state.searchResults.name + " at this time");
                        } 
                        else {
                            console.log('added article data');
                            this.setState({gameArticles: data.articles.slice(1, 4)}); 
                        }
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
            let gameStreams ='https://api.twitch.tv/helix/games?name=' + this.state.searchResults.name;
                fetch(gameStreams, {
                    headers: {
                        "Client-ID": '7mx4fyx7xv1pcxfe25fmguto1xao2b'
                    }
                })
                .then((response) => {
                    response.json()
                    .then(async (data) => {
                        if (data.data[0].id){
                            console.log('Stream data added')
                            fetch('https://api.twitch.tv/helix/streams?game_id=' + data.data[0].id + '&first=5', {
                            headers: {
                                "Client-ID": '7mx4fyx7xv1pcxfe25fmguto1xao2b'
                            }
                            })
                            .then((gameData) => {
                                gameData.json()
                                .then((data) => {
                                    console.log(data)
                                   this.setState({twitchResults: data.data})
                                   console.log(data.data[0].thumbnail_url.slice(0, -21) + ".jpg")
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
                            })
                        }
                        else {
                            alert('Noone is streaming '+ this.state.searchResults.name +' on Twitch at this time!');
                        }
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
        MIXtoggle = async () => {
            const newState = !this.state.MIXtoggle
            this.setState({MIXtoggle: newState});
            fetch('https://mixer.com/api/v1/types?query=' + this.state.searchResults.name)
            .then((res1) => {
                res1.json()
                .then((res2) => {
                    if (res2.length === 0) {
                        alert('No one is streaming '+ this.state.searchResults.name +' on Mixer at this time!');
                    }
                    fetch('https://mixer.com/api/v1/types/'+res2[0].id+'/channels?order=viewersCurrent:DESC&limit=5')
                    .then( async (res3) => {
                        let res4 = await res3.json()
                        this.setState({mixerResults: res4});
                    })
                    .catch((err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                })
                .catch((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
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
            let name = navigation.getParam('name', '')
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
                cacheName = name.toLowerCase();
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
                        response.json().then(async data => {
                            if (text) {
                                value = data.results[0];
                            }
                            if (id) {
                                value = data.results;
                            }
                            if (data.results.length === 0){
                                alert("We have no clue what you're trying to search for... No results")
                                this.props.navigation.goBack();
                            }
                            else{
                                await AsyncStorage.setItem(cacheName, JSON.stringify(value));
                                console.log('Added game data to cache')
                                this.setState({searchResults: value});
                                this.setState({date: [value.expected_release_month, '/', value.expected_release_day, '/', value.expected_release_year]});
                                this.setState({platforms: value.platforms.map(platforms => platforms.abbreviation).join(', ')});
                                this.setState({pic: value.image});
                            }
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
                        modal={this.state.pic.original_url}
                    />
                    <View style={styles.bottom}>
                             <TouchableOpacity onPress={this.NWtoggle} style={styles.bottombutton}><Text style={styles.bottombuttontext}> Top News for {this.state.searchResults.name} </Text></TouchableOpacity>
                                {
                                    this.state.NWtoggle ?  this.state.gameArticles.map(article => (<ArticleCard  cardhead={article.title} cardauthor={article.author} cardbody={article.content} link={article.url} source={article.source.name} pic={article.urlToImage}/> )) : null
                                }
                             <TouchableOpacity onPress={this.YTtoggle} style={styles.bottombutton}><Text style={styles.bottombuttontext}> YouTube Trailer for {this.state.searchResults.name} </Text></TouchableOpacity>
                                {
                                    this.state.YTtoggle ? <YoutubeCom videoId={this.state.YTVidID}/> : null
                                }
                             <TouchableOpacity onPress={this.TWtoggle} style={styles.bottombutton}><Text style={styles.bottombuttontext}> Top Twitch streams for {this.state.searchResults.name} </Text></TouchableOpacity>
                                {
                                    this.state.TWtoggle ? this.state.twitchResults.map( stream => (<TwitchCom streamedGame={this.state.searchResults.name}
                                    streamerName={stream.user_name}
                                    streamerFollowers={stream.viewer_count}
                                    streamerStatus={stream.title}
                                    streamURL={"https://www.twitch.tv/" + stream.user_name}
                                    streamerPreview={stream.thumbnail_url.slice(0, -21) + ".jpg"} /> )) : null
                                }
                            <TouchableOpacity onPress={this.MIXtoggle} style={styles.bottombutton}><Text style={styles.bottombuttontext}> Top Mixer streams for {this.state.searchResults.name} </Text></TouchableOpacity>
                                { 
                                    this.state.MIXtoggle ? this.state.mixerResults.map(stream => ( 
                                        <TwitchCom 
                                        streamedGame={this.state.searchResults.name}
                                        streamerName={stream.user.username}
                                        streamerFollowers={stream.numFollowers}
                                        streamerPreview={stream.user.avatarUrl}
                                        streamerStatus={stream.name}
                                        streamURL={'https://mixer.com/' + stream.token}
                                        streamBanner={stream.bannerUrl}
                                        />
                                    )) : null
                                }

                            <CommentsCom game={this.props.navigation.getParam('text', '')} navigate={this.props.navigation} />
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
            marginVertical: 1,
            borderWidth: 1,
            borderColor: 'rgb(1, 0, 64)',
            marginHorizontal: 5,
            bottom: 0,
            justifyContent: 'center',
            alignContent: 'center'
        },
        bottombuttontext: {
            color:`rgb(135, 206, 250)`,
            fontWeight: `bold`,
        }
    
    })