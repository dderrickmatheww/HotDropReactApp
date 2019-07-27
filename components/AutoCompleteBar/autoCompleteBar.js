import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View, Button } from 'react-native';

const API = 1//AUTOCOMPLETE API LINK HERE//;

export default class AutoCompleteBar extends Component {

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
        selected: false
    };

    // THIS IS WHERE THE API ROUTE FOR THE AUTOCOMPLETE GOES, FRED
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

    selectItem = (result) => {
        this.setState({query: result});
        this.setState({selected: true})
        this.props.getSearchResults(result)
    }

    changeText = (text) => {
        this.setState({query: text});
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
                    hideResults={(this.state.selected)}
                    onChangeText={text => this.changeText(text)}
                    style={styles.bar}
                    placeholder='Where we droppin&#39;?'
                    placeholderTextColor='gray'
                    keyExtractor={(item, index) => item.key}
                    renderItem={ result => (         
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