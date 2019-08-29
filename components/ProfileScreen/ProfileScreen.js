import React, {Component} from 'react';
import { View, StyleSheet} from 'react-native';
import ProfileCard from '../ProfileCard/ProfileCard';

export default class ProfileScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Profile',
            headerStyle: {
            backgroundColor: 'rgb(1, 0, 24)',
          },
          headerTintColor: 'skyblue'
        };
      };
    
    render() {
        return(
            <View style={{flex: 1, backgroundColor: "#363534"}}>
                <ProfileCard/>
            </View>
        )
    }
}