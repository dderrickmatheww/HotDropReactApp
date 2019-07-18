import React from 'react';
import { ScrollView, View, KeyboardAvoidingView } from 'react-native';

export default class AccountScreen extends React.Component {
    render() {
        return(
            <View style={{flex: 1, backgroundColor: "grey"}}>

                <KeyboardAvoidingView>
                <ScrollView>
                    <AccountCard/>
                </ScrollView>
                </KeyboardAvoidingView>
    
            </View>
        )
    }
}