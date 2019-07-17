import React from 'react';
import { ScrollView, AsyncStorage, View, KeyboardAvoidingView } from 'react-native';
import GameCard from '../gamecard/gameCard';
    export default class CardScreen extends React.Component {

        static navigationOptions = ({ navigation }) => {
            return {
              title: navigation.getParam('text')
            };
          };

        state = {
            searchResults: [],
            date: [],
            platforms: []
        }

        componentDidMount() {
            
            const { navigation } = this.props;
            const text = navigation.getParam('text', '');
            let searchQuery = text;
            let cacheName = text.toLowerCase();
            searchQuery = searchQuery.toLowerCase().replace(' ', '%');
            let url = 'https://www.giantbomb.com/api/search/?format=json&api_key=99ec1d8980f419c59250e12a72f3b31d084e9bf9&query=' + searchQuery + '&resources=game&limit=1';

            cacheResults = async (cacheName, url) => {

                let value = await AsyncStorage.getItem(cacheName);
            
                if ( value ) {
                    
                    value = JSON.parse(value);
                    console.log('Grabbed from cache')
                    this.setState({searchResults: value[0]});  
                    this.setState({date: [value[0].expected_release_day, ' / ', value[0].expected_release_month, ' / ', value[0].expected_release_year]});
                    this.setState({platforms: value[0].platforms.map(platforms => platforms.abbreviation).join(', ')});
                } 
                else {
                    fetch(url)
                    .then( response => {
                        response.json().then( async data => {

                            await AsyncStorage.setItem(cacheName, JSON.stringify(data.results));
                            value = data.results;
                            console.log('Add to cache')
                            this.setState({searchResults: value[0]});
                            this.setState({date: [value[0].expected_release_day, value[0].expected_release_month, value[0].expected_release_year]})
                            
                        })
                        .catch(function(err) {
                            if(err) {
                                console.log(err);
                            }
                        })
                        console.log(this);
                       
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
            <View style={{flex: 1, backgroundColor: "grey"}}>

                <KeyboardAvoidingView>
                    <ScrollView>
                    {/* The GameCard below shouldn't be on the homepage, obviously, it's just here to see styling and components until we get routing and pages set up */}

                    <GameCard
                    title={this.state.searchResults.name}
                    platforms={this.state.platforms}
                    releasedate={this.state.date}
                    description={this.state.searchResults.deck}
                    />
                </ScrollView>
                </KeyboardAvoidingView>
    
            </View>
            )
        }
        }