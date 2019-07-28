import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View, Button } from 'react-native';

const API = 1//AUTOCOMPLETE API LINK HERE IF NECESSARY//;

export default class AutoCompleteBar extends Component {

    //Remove the dummy JSON and just set games to a blank array
    state = {
        "games": [
            {   
                "id": 1,
                "thumb": null,
                "title": "Doom",
                "year": "1993",
            },
            {
                "id": 2,
                "thumb": null,
                "title": "Doom II",
                "year": "1994"
            },
            {
                "id": 3,
                "thumb": "https://via.placeholder.com/30x30",
                "title": "Doom",
                "year": "2016"
            },
            {
                "id": 4,
                "thumb": "https://via.placeholder.com/30x30",
                "title": "Super Mario Bros.",
                "year": "1985"
            },
            {
                "id": 5,
                "thumb": "https://via.placeholder.com/30x30",
                "title": "Super Mario Bros 3.",
                "year": "1989"
            },
            {
                "id": 6,
                "thumb": "https://via.placeholder.com/30x30",
                "title": "Super Mario Kart",
                "year": "1994"
            },
            {
                "id": 7,
                "thumb": "https://via.placeholder.com/30x30",
                "title": "Doom Eternal",
                "year": "2019"
            },
            {
                "id": 8,
                "thumb": "https://via.placeholder.com/30x30",
                "title": "Dark Souls",
                "year": "2011"
            },
            {
                "id": 9,
                "thumb": "https://via.placeholder.com/30x30",
                "title": "Dark Souls II",
                "year": "2014"
            },
            {
                "id": 10,
                "thumb": "https://via.placeholder.com/30x30",
                "title": "Dark Souls III",
                "year": "2016"
            },
            {
                "id": 11,
                "thumb": "https://via.placeholder.com/30x30",
                "title": "Bleach: Dark Souls",
                "year": "2007"
            }
        ],
        query: '',
        //See below in the functions for what selected is for; it can possibly be removed
        selected: false
    };

    // This is where the API goes for the autocomplete, it's currently uncommented out since I was using the dummy JSON
/*     componentDidMount() {
        fetch(`${API}/games/`).then(res => res.json()).then((json) => {
            const { results: games } = json;
            this.setState({ games });
        });
    }
 */
    findGame(query) {
        if (query === '') {
            return [];
        }

        const { games } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return games.filter(game => game.title.search(regex) >= 0);
    }

    //(result) is currently just the name being passed from the suggestions, but once the routes are going this will have to be the GUID to search for a specific game
    selectItem = (result) => {
        //Set the field to the currently selected option (ex, selecting "Halo" would change the text field from "hal" to "Halo"
        //(this is technically a holdover from the example and can be removed)
        this.setState({query: result});

        //The {selected: true} is again something that can probably be removed; with the function above, if you selected something that still
        //matched with other things, you'd still see suggestions (ie, if you selected "Halo" from a suggestion, you'd still see "Halo," "Halo 2," etc.)
        //There's a ternary statement on a "hideResults" prop in the autocomplete that checks if you've selected something and hides the other suggestions
        this.setState({selected: true})

        //This is the actual search function from the HomeScreen being run, though we'll have to change it to the Giant Bomb individual game search route
        this.props.getSearchResults(result)
    }

    changeText = (text) => {
        this.setState({query: text});

        //This is to undo the hidden suggestions from above once the user starts modifying the text field again, this can also be removed
        this.setState({selected: false})
    }

    render() {

        const { query } = this.state;
        const results = this.findGame(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        
        console.log(results)

        return (
            <View style={styles.container}>
                <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    data={results.length === 1 && comp(query, results[0].title) ? [] : results}
                    defaultValue={query}
                    //Remove hideResults if everything regarding it and state.selected is also removed
                    hideResults={(this.state.selected)}
                    onChangeText={text => this.changeText(text)}
                    style={styles.bar}
                    placeholder='Where we droppin&#39;?'
                    placeholderTextColor='gray'
                    keyExtractor={(item, index) => item.key}
                    renderItem={ result => (         
                        //All of these fields will have to be modified to have their correct API names (ie, result.item.thumb will be whatever the image.thumbnail is named)
                        <TouchableOpacity id={result.item.id} style={styles.itemTouch} onPress={() => this.selectItem(result.item.title)}>
                            <View style={styles.viewcontainer}>
                                <Image style={styles.thumbnail} source={{ uri: result.item.thumb ? result.item.thumb : 'https://raw.githubusercontent.com/dderrickmatheww/Project1/master/assets/images/thumbnailph.jpg' }}/>
                                <Text style={styles.itemTitle}>
                                    {result.item.title}&nbsp;  
                                </Text>
                                <Text style={styles.itemYear}>
                                    ({result.item.year})
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
                <Button title='DEPLOY!' style={styles.searchbutton} color='rgb(1, 0, 64)' onPress={() => this.props.getSearchResults(this.state.query)}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: `absolute`,
        flex: 1,
        margin: 4,
        left: 0,
        right: 0,
        top: 5,
        zIndex: 999,
      },
    autocompleteContainer: {
        flex: 1,
    },
    bar: {
        fontSize: 16,
        color: `white`,
        fontWeight: `bold`,
        backgroundColor: `rgb(52, 58, 64)`,
        borderColor: `rgb(206, 212, 218)`
    },
    itemTouch:{
        padding: 2,
        backgroundColor: `darkslategray`,
        flex: 1,
    },
    viewcontainer: {
        flexDirection: `row`
    },
    thumbnail: {
        width: 30,
        height: 30,
        marginRight: 3
    },
    itemTitle: {
        textAlignVertical: 'center',
        color: `skyblue`,
        fontSize: 16,
        fontFamily: 'sans-serif-medium',
        fontWeight: `bold`,
        textShadowColor: `#000`,
        textShadowRadius: 2,
        textShadowOffset: {
            height: 1
        }
    },
    itemYear: {
        textAlignVertical: 'center',
        color: `skyblue`,
        fontSize: 16,
        fontFamily: 'sans-serif-light',
        textShadowColor: `#000`,
        textShadowRadius: 2,
        textShadowOffset: {
            height: 1
        }
    }
});