import React, {Component} from 'react';
import { View, StyleSheet, AsyncStorage} from 'react-native';
import ProfileCard from '../ProfileCard/ProfileCard';
import Firebase from '../LoginScreen/firebase';

export default class ProfileScreen extends Component {
    state = {
        userData: []
    }
   
    componentWillMount() {
        this.grabbingUserData();
    }
    grabbingUserData = async () => {
        let user = await AsyncStorage.getItem('user');
        let userName = await AsyncStorage.getItem('userUserName');
        if(user) {
            Firebase.database.ref('users').child(userName).on('value', (snap) => {
                let child = snap.val();
                if(child) {
                    let items = Object.values(child);
                    this.setState({userData: items}); 
                }
            }, 
            function(errorObject) {
            })
        }
    }
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
                <ProfileCard data={this.state.userData}/>
            </View>
        )
    }
}