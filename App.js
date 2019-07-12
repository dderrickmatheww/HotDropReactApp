import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import Header from './components/header/header';
import SearchBar from './components/SearchBar/SearchBar'

export default function App() {
  return (
    <View style={{flex: 1, backgroundColor: "grey"}}>

       <Header />

      <KeyboardAvoidingView>

          <SearchBar />

      </KeyboardAvoidingView>

    </View>
  );
}
