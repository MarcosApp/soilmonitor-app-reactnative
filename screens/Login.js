import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity,TextInput, StatusBar} from 'react-native'
import rgba from 'hex-to-rgba';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dialog, ProgressDialog } from "react-native-simple-dialogs";
// check this lib for more options
import LinearGradient from 'react-native-linear-gradient';
const Pulse = require('react-native-pulse').default;
import { Block, Badge, Card, Text, Progress } from '../components';
import { styles as blockStyles } from '../components/Block'
import { styles as cardStyles } from '../components/Card'
import { theme } from '../constants';
import { authentication } from '../components/ConfigFirebase';

export default class Login extends Component {
   
    state = {
        email: '',
        password: '',
        isAuthentication: false,
        showNotAuthentication: false,
        showCampsInvalid: false
    }
    closeDialogUser = (show) => {
        this.setState({ showNotAuthentication:show});
    }
    closeCampsUser = (show) => {
        this.setState({ showCampsInvalid:show});
    }
    login = async() => {
    
        const { email, password } = this.state;

        if(email == '' || password == ''){

            this.setState({showCampsInvalid:true})

        }else {

            try{
                this.setState( { isAuthentication: true });

                await authentication.signInWithEmailAndPassword(email, password).then((data)=>{
                    
                setTimeout(()=>{
                    
                    this.setState({isAuthentication: false})

                    this.props.navigation.navigate('Welcome');

                }, 1500); 


                }).catch((error) =>{

                    this.setState( { isAuthentication: false });

                    this.setState( { showNotAuthentication: true });
            
                });

                


            } catch (err) {
                console.log(err);
            }
        }
    }

    render() {
        return(   
                 
            <LinearGradient
                colors={['#D5A87F', '#e6ccb3', '#d9b38c', '#ac7339']}
                style={{flex: 1}}>
            <ProgressDialog
                visible={this.state.isAuthentication}
                title="Carregando."
                message="Por favor, aguarde..."
            />

<Dialog 
            animationType="fade"
            contentStyle={
                {   
                    backgroundColor: rgba('#d9b18c', '1.2'),
                    alignItems: "center",
                    borderRadius:30,
                    borderWidth: 0,
                    overflow: 'hidden',
                    position: "absolute",
                    justifyContent: "center",
                }
            }
            onTouchOutside={ () => this.closeCampsUser(false) }
            visible={ this.state.showCampsInvalid }
            >
            <Text color="white" size={18} alignItems="center" style={ { marginVertical: 30, justifyContent: "center" } }>
                Campos inválidos ou nulo.
            </Text>
            <Badge color={(theme.colors.secondary)} size={62}>
                <TouchableOpacity onPress={() => this.closeCampsUser(false)}>
                    <Pulse color="white" numPulses={2} diameter={80} speed={30} duration={1000} /> 
                    <Icon name="pencil" size={62/2} color="white" size={theme.sizes.h2} />
                </TouchableOpacity>
            </Badge> 
        </Dialog>

             <Dialog 
            animationType="fade"
            contentStyle={
                {   
                    backgroundColor: rgba('#d9b18c', '1.2'),
                    alignItems: "center",
                    borderRadius:30,
                    borderWidth: 0,
                    overflow: 'hidden',
                    position: "absolute",
                    justifyContent: "center",
                }
            }
            onTouchOutside={ () => this.closeDialogUser(false) }
            visible={ this.state.showNotAuthentication }
            >
            <Text color="white" size={18} alignItems="center" style={ { marginVertical: 30, justifyContent: "center" } }>
                Usuário ou senha incorretos.
            </Text>
            <Badge color={(theme.colors.secondary)} size={62}>
                <TouchableOpacity onPress={() => this.closeDialogUser(false)}>
                    <Pulse color="white" numPulses={2} diameter={80} speed={30} duration={1000} /> 
                    <Icon name="user-times" size={62/2} color="white" size={theme.sizes.h2} />
                </TouchableOpacity>
            </Badge> 
        </Dialog>
            <StatusBar hidden={true} />

            <Block middle flex={0.4}>
            <Image 
                        resizeMode="contain"
                        source={require('../assets/images/logo.png')}
                        style={{width: 600, height:600}}
                    />
                        </Block>

            <Block flex={0.1} style={styles.card}>
                <TextInput 
                    placeholder="Entre com o seu e-mail"
                    placeholderTextColor="#47210A"
                    keyboardType="email-address"
                    autoFocus={true}
                    value={this.state.email}
                    onChangeText={ email => this.setState({ email })}
                />
            </Block>
            <Block flex={0.1} style={styles.card}>
                <TextInput 
                    secureTextEntry={true}
                    placeholderTextColor="#47210A"
                    selectionColor={'red'} 
                    keyboardType="default" 
                    placeholder="Entre com sua senha"
                    value={this.state.password}
                    onChangeText={ password => this.setState({ password })}
                />
            </Block>

            <TouchableOpacity onPress={this.login}>

                    <LinearGradient
                        end={{ x: 1, y: 0}}
                        style={[ blockStyles.row, cardStyles.card, styles.awards]}
                        colors={["#cc9966", "#996633"]}    
                    >
                        <Block middle flex={0.4}>
                            <Badge color={rgba("#ebd9c6", '0.2')} size={74}>
                                <Badge color={theme.colors.secondary} size={52}>
                                    <Icon name="user" size={30} color="white" size={theme.sizes.h2} />
                                </Badge>
                            </Badge>
                        </Block>
                        <Block middle>
                            <Text size={20} spacing={0.4} medium white text>Entrar</Text>
                        </Block> 
                    </LinearGradient>
                </TouchableOpacity>
        </LinearGradient>)
    }
}
const styles = StyleSheet.create({

    awards: {
        padding: 20,
        margin: 10,
    },
    card: {
        borderRadius: 10,
        padding: 8,
        margin: 10,
        backgroundColor: "#FFFFFF"
      },
    
});