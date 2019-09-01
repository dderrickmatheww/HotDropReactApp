import React, {Component} from 'react';
import { View, AsyncStorage} from 'react-native';
import ProfileCard from '../ProfileCard/ProfileCard';
import Firebase from '../LoginScreen/firebase';

export default class ProfileScreen extends Component {
   
    state = {
        userData: {},
        favGameData: []
    }
    async componentWillMount() {
        await this.grabbingUserData();
    } 
    async componentDidMount() {
        await this.grabbingUserData();
    }
    grabbingUserData = async () => {
        let user = await AsyncStorage.getItem('user');
        let userName = await AsyncStorage.getItem('userUserName');
        if(user) {
            await Firebase.database.ref('users').child(userName).child('userData').on('child_added', (snap) => {
                let child = snap.val();
                this.setState({userData: child});
            }, 
            function(errorObject) {
            })
            await Firebase.database.ref('users').child(userName).child("favGames").on('value', async (snap) => {
                let childKeys = []
                let favGameData = []
                await snap.forEach((childSnapshot) => { var childKey = childSnapshot.key; childKeys.push(childKey)});
                await childKeys.forEach((childKey) => {
                    let child = snap.child(childKey).val();
                    for(key in child) {
                        if(child.hasOwnProperty(key)) {
                            var value = child[key];
                            favGameData.push(value);
                        }
                    }
                    
                })
                this.setState({favGameData: favGameData});
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
                <ProfileCard data={this.state.userData} favGameData={this.state.favGameData} cardScreen={this.props.navigation}/>
            </View>
        )
    }
}