import React, { Component } from 'react';
import { styleSheet, Image, TouchableOpacity, Text, TextInput, ScrollView, View } from 'react-native';


export default class UserProfile extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}></View>
            <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.info}>Programmer</Text>
                <Text style={styles.description}>Description here</Text>
                
                <TouchableOpacity style={styles.buttonContainer}>
                  <Text>Home Page</Text>  
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                  <Text>Log Out</Text> 
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}