import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View, Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


export default class AutoCompleteBar extends Component {
    state = {
        games: [],
        query: '',
        selected: false
    };

    componentDidMount(){
    }

    findGame(query) {
        if (query === '') {
            return [];
        }

        const { games } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        if (games) {
            return games.filter(game => game.name.search(regex) >= 0);
        } else {
            return []
        }
    }

    //(result) is currently just the name being passed from the suggestions, but once the routes are going this will have to be the GUID to search for a specific game
    selectItem = (name, id) => {
        //Set the field to the currently selected option (ex, selecting "Halo" would change the text field from "hal" to "Halo"
        this.setState({query: name});

        //If you selected something that still matched with other things, you'd still see suggestions (ie, if you selected "Halo" from a suggestion, 
        //you'd still see "Halo," "Halo 2," etc.)
        //There's a ternary statement on a "hideResults" prop in the autocomplete that checks if you've selected something and hides the other suggestions
        this.setState({selected: true})

        //This is the actual search function from the HomeScreen being run, though we'll have to change it to the Giant Bomb individual game search route
        this.props.getSuggestion(name, id)
    }

    changeText = (text) => {
        this.setState({query: text});

        fetch('https://hotdropserver.herokuapp.com/api/nameID/autocomplete/' + text)
        .then(res => res.json())
        .then(json => {
            this.setState({ games: json });
        });

        //This is to undo the hidden suggestions from above once the user starts modifying the text field again
        this.setState({selected: false})
    }

    render() {

        const { query } = this.state;
        const results = this.findGame(query);

        
        return (
            <View style={styles.container}>
                <FontAwesomeIcon style={styles.searchicon}icon={ faSearch } color="gray"/>
                <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    data={results.length === 1 ? [] : results}
                    defaultValue={query}
                    hideResults={(this.state.selected)}
                    onChangeText={text => this.changeText(text)}
                    style={styles.bar}
                    placeholder='Where we droppin&#39;?'
                    placeholderTextColor='gray'
                    keyExtractor={(item, index) => item.key}
                    onSubmitEditing={() => this.props.getSearchResults(this.state.query)}
                    renderItem={ result => (         
                        <TouchableOpacity id={result.item.guid} style={styles.itemTouch} onPress={() => this.selectItem(result.item.name, result.item.guid)}>
                            <View style={styles.viewcontainer}>
                                <Image style={styles.thumbnail} source={{ 
                                    uri: result.item.tinyimageURL != `https://www.giantbomb.com/api/image/square_mini/3026329-gb_default-16_9.png` 
                                        ? result.item.tinyimageURL : 
                                    'https://raw.githubusercontent.com/dderrickmatheww/Project1/master/assets/images/thumbnailph.jpg' 
                                    }}/>
                                <Text style={styles.itemTitle}>
                                    {result.item.name}&nbsp;  
                                </Text>
                                <Text style={styles.itemYear}>
                                    {result.item.releaseyear != "NaN" ? "(" + result.item.releaseyear + ")" : ""}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
                <View style={styles.searchButton}>
                    <Button title='DEPLOY!'  color='rgb(1, 0, 96)' onPress={() => this.props.getSearchResults(this.state.query)}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: `absolute`,
        flex: 1,
        marginHorizontal: 4,
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
        backgroundColor: `rgb(76, 82, 88)`,
        borderColor: `rgb(206, 212, 218)`
    },
    itemTouch:{
        padding: 2,
        backgroundColor: `darkslategray`,
        flex: 1
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
    },
    searchButton: {
        marginTop: 3
    },
    searchicon: {
        position: "absolute",
        margin: 4,
        right: 15,
        top: 12,
        zIndex: 999,
    }
});