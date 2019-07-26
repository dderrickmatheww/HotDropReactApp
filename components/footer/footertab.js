import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

export default class FooterTab extends Component {
    render() {
      return (
        <TouchableHighlight style={styles.tab} onPress={() => {}} onHideUnderlay={this.props.tabaction} activeOpacity={0.5} underlayColor="rgb(1, 0, 96)">
            <Text style={styles.tabtext}>{this.props.tablabel}</Text>
        </TouchableHighlight>
      );
    }
  }
  
  const styles = StyleSheet.create({
      tab: {
          backgroundColor: `#000`,
          paddingVertical: 4,
          borderRightWidth: 0.5,
          borderLeftWidth: 0.5,
          borderLeftColor: `rgb(128, 128, 128)`,
          borderRightColor: `rgb(128, 128, 128)`,
          flex: 1
      },
      tabtext: {
          fontFamily: 'sans-serif-thin',
          color: `rgb(172, 172, 172)`,
          fontSize: 22,
          textAlign: `center`,
      }
  })