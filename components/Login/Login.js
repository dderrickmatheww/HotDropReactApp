import React, { Component } from 'react';
import { styleSheet, imageBackground, Text, TextInput, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginScreen extends React.Component {
  render() {
      let pic = {
      uri: 'https://raw.githubusercontent.com/dderrickmatheww/Project1/master/assets/images/banner.png'
    };
    return (
      <ScrollView style={styleSheet.scroll}>
        <Container>
            <Button
              label="Forgot Login/Pass"
              styles={{button: styles.alignRight, label: styles.label}}
              onPress={this.press.bind(this)} />
        </Container>
        <Container>
          <Label text='Username or Email'/>
          <TextInput
            style={styles.textInput}
          />
        </Container>
        <Container>
          <Label text='Password'/>
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
          />
        </Container>
        <Container>
          <Button 
            styles={{button: styles.transparentButton}}
            onPress={this.press.bind(this)}
          >
            <View style={styles.inline}>
                <Icon name="facebook-official" size={30} color="#3B5699" />
                <Text style={[styles.buttonBlueText, styles.buttonBigText]}>  Connect </Text> 
                <Text style={styles.buttonBlueText}>with Facebook</Text>
            </View>
          </Button>
        </Container>
        <View style={styles.footer}>
            <Container>
                <Button 
                    label="Sign In"
                    styles={{button: styles.primaryButton, label: styles.buttonWhiteText}} 
                    onPress={this.press.bind(this)} />
            </Container>
            <Container>
                <Button 
                    label="CANCEL"
                    styles={{label: styles.buttonBlackText}} 
                    onPress={this.press.bind(this)} />
            </Container>
        </View>
      </ScrollView>
      );
  }
}

const styles = Stylesheet.create({
  scroll: {
    backgroundColor: '#E1D7D8',
    padding: 30,
    flexDirection: 'column'
  },
  label: {
    color: '#0d8898',
    fontSize: 20
  },
  alignRight: {
    alignSelf: 'flex-end'
  },
  textInput: {
    height: 80,
    fontSize: 30,
    backgroundColor: '#FFF'
  },
  transparentButton: {
    marginTop: 30,
    borderColor: '#3B5699',
    borderWidth: 2
  },
  buttonBlueText: {
      fontSize: 20,
      color: '#3B5699'
  },
  buttonBigText: {
      fontSize: 20,
      fontWeight: 'bold'
  },
  inline: {
      flexDirection: 'row'
  },
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF',
  },
  buttonBlackText: {
      fontSize: 20,
      color: '#595856'
  },
  primaryButton: {
      backgroundColor: '#34A853'
  },
  footer: {
    marginTop: 100
  }
})
