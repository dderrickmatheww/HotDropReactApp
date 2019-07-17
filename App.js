import React from 'react';
import { StyleSheet, Text, ScrollView, View, KeyboardAvoidingView } from 'react-native';
import Header from './components/header/header';
import ArticleCard from './components/articlecard/articleCard';
import Footer from './components/footer/footer';
import GameCard from './components/gamecard/gameCard';
import Comments from './components/comments/comments';
import CommentsField from './components/comments/commentsfield';


export default function App() {

      /*   These state values were hardcoded for testing; delete them replace with working fetch requests
      */  
    state = {
      articles: [
        {
          title: "Title 1",
          subheader: "Subhead 1",
          body: "This is an article card. Blah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blah",
          link: "https://ign.com"
        },
        {
          title: "Title 2",
          subheader: "Subhead 2",
          body: "This is an article card. Blah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blah",
          link: "https://ign.com"
        },
        {
          title: "Title 3",
          subheader: "Subhead 3",
          body: "This is an article card. Blah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blah",
          link: "https://ign.com" 
        },
        {
          title: "Title 4",
          subheader: "Subhead 4",
          body: "This is an article card. Blah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blah",
          link: "https://ign.com" 
        },
        {
          title: "Title 5",
          subheader: "Subhead 5",
          body: "This is an article card. Blah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blah",
          link: "https://ign.com" 
        },
        {
          title: "Title 6",
          subheader: "Subhead 6",
          body: "This is an article card. Blah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blah",
          link: "https://ign.com" 
        }
      ]
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.headerdrop}>
        <Header/>
      </KeyboardAvoidingView>
      

      <ScrollView>
        {this.state.articles.map(article => (
        
        <ArticleCard
          cardhead={article.title}
          cardsubhead={article.subheader}
          cardbody={article.body}
          link={article.link}
        />
        ))}

        {/* The GameCard below shouldn't be on the homepage, obviously, it's just here to see styling and components until we get routing and pages set up */}

        <GameCard
          title="Apex Legends"
          platforms="PC, PS4, XBO"
          releasedate="2019"
          description="This battle royale from Respawn Entertainment is focused on teams and special abilities"
        />
        <Text>Comments</Text>
        <Comments
          author='Some Jerk'
          comment='Boy I have opinions on this game'
          datetime='07-16-2019 at 8:00PM'
        />
        <CommentsField/>
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
  },
  headerdrop: {
    elevation: 10,
    backgroundColor: `yellow`
  }
})