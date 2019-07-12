import React from 'react';
import { StyleSheet, Text, ScrollView, View, KeyboardAvoidingView } from 'react-native';
import Header from './components/header/header';
import Card from './components/card/card';
import Footer from './components/footer/footer';


export default function App() {

  //these state values were hardcoded for testing, delete and replace with fetch requests, as well as a property for the thumbnail/article image
  state = {
    articles: [
      {
        title: "Title 1",
        subheader: "Subhead 1",
        body: "This is an article or game info card. Blah blah blah" 
      },
      {
        title: "Title 2",
        subheader: "Subhead 2",
        body: "This is an article or game info card. Blah blah blah" 
      },
      {
        title: "Title 3",
        subheader: "Subhead 3",
        body: "This is an article or game info card. Blah blah blah" 
      },
      {
        title: "Title 4",
        subheader: "Subhead 4",
        body: "This is an article or game info card. Blah blah blah" 
      },
      {
        title: "Title 5",
        subheader: "Subhead 5",
        body: "This is an article or game info card. Blah blah blah" 
      },
      {
        title: "Title 6",
        subheader: "Subhead 6",
        body: "This is an article or game info card. Blah blah blah" 
      }
    ]
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Header/>
      </KeyboardAvoidingView>
      

      <ScrollView>
        {this.state.articles.map(article => (
        
        <Card
          cardhead={article.title}
          cardsubhead={article.subheader}
          cardbody={article.body}
        />
        ))}
      </ScrollView>
      <Footer/>
    </View>
  );
}

const styles  = StyleSheet.create({
  container: {
    backgroundColor: `#363534`,
    height: `100%`,
    width: `100%`
  },
  containerText: {
    color: `skyblue`
  }
})