import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';

const API = 1//API HERE//;

export default class AutoCompleteBar extends Component {

    state = {
        games: [
            {   
                "id": 1,
                "thumb": "https://via.placeholder.com/30x30",
                "title": "Doom",
                "year": "1993"
            },
            {
                "id": 2,
                "thumb": "https://via.placeholder.com/30x30",
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
            }
        ],
        query: ''
    };

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


    render() {

        const { query } = this.state;
        const games = this.findGame(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        console.log(games)

        return (
            <View style={styles.container}>
                <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    data={games}
                    defaultValue={query}
                    onChangeText={text => this.setState({ query: text })}
                    style={styles.bar}
                    placeholder='Where we droppin&#39;?'
                    placeholderTextColor='gray'
                    keyExtractor={(item, index) => item.key}
                    renderItem={({ thumb, title, year }) =>            
                        <TouchableOpacity style={styles.itemTouch} onPress={() => this.setState({ query: title })}>
                            <View style={styles.viewcontainer}>
                                <Image style={styles.thumbnail} source={{ uri: 'https://via.placeholder.com/30x30'}}/>
                                <Text style={styles.itemText}>
                                    Title: {title} (Year: {year})
                                </Text>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 4,
        left: 0,
        right: 0,
        top: 0,
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
        backgroundColor: `darkslategray`,
        flex: 1,
    },
    viewcontainer: {
        flexDirection: `row`
    },
    thumbnail: {
        width: 30,
        height: 30,
        margin: 2
    },
    itemText: {
        color: `skyblue`,
        flex: 1,
        padding: 2,
        fontSize: 16,
        fontFamily: 'sans-serif-medium',
        fontWeight: `bold`,
    }
});