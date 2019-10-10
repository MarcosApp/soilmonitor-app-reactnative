import React, {Component} from 'react'
import {View, Text, 
    StyleSheet, 
    TouchableOpacity,
    TextInput} from 'react-native'
export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        return(        
        <View>
            <TextInput 
                placeholder="Enter your email"
                keyboardType="email-address"
                onChangeText = {(text) => {
                    this.setState({email: text})
                }}
            />
            <TextInput 
                secureTextEntry={true}
                keyboardType="default" 
                placeholder="Enter your password"
                onChangeText = {(text) => {
                    this.setState({password: text})
                }}
            />
            <TouchableOpacity onPress={(event) => {
                const {email, password} = this.state
                alert(`email: ${email}, password: ${password}`)
            }}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>)
    }
}