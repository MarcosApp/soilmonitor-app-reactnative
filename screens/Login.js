import React, {Component} from 'react'
import {View, Text, 
    StyleSheet, 
    TouchableOpacity,
    TextInput} from 'react-native'

import { authentication } from '../components/ConfigFirebase';

export default class Login extends Component {
   
    state = {
        email: '',
        password: '',
        isAuthentication: false,
    }

    login = async() => {
    
        const { email, password } = this.state;

        try{

            const user = await authentication.signInWithEmailAndPassword(email, password);

            this.setState( { isAuthentication: true });

            console.log(user);
            this.props.navigation.navigate('Welcome');


        } catch (err) {
            console.log(err);
        }
    
    }

    render() {
        return(        
        <View>
            <TextInput 
                placeholder="Enter your email"
                keyboardType="email-address"
                value={this.state.email}
                onChangeText={ email => this.setState({ email })}
            />
            <TextInput 
                secureTextEntry={true}
                keyboardType="default" 
                placeholder="Enter your password"
                value={this.state.password}
                onChangeText={ password => this.setState({ password })}
            />
            <TouchableOpacity onPress={this.login}>
                <Text>Login</Text>
            </TouchableOpacity>

            { this.state.isAuthentication ? <Text>LOgado com sucesso</Text> : null }
        </View>)
    }
}