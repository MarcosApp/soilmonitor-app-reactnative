import React, { Component } from 'react';
import { Dimensions, StyleSheet, StatusBar, ScrollView, Image, TouchableOpacity, Button,Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { Block, Badge,Card, Text, } from '../components';
import { styles as blockStyles } from '../components/Block'
import { styles as cardStyles } from '../components/Card'
import { Dialog, ProgressDialog } from "react-native-simple-dialogs";
import { theme, mocks, } from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import rgba from 'hex-to-rgba';
import Icon from 'react-native-vector-icons/FontAwesome';
const Pulse = require('react-native-pulse').default;
const { width } = Dimensions.get('window');

import { database } from '../components/ConfigFirebase';

export default class Welcome extends Component {
    
  
    state = {
        //Sensor
        StatusOperacao: false,
        ConectadoIP: "Sem Conexão",
        ConectadoInternet: false,
        TemperaturaCelsius: 0,
        Umidade: 0,
        AtivandoSensor:false,
        DesativaSensor:false,
        VerificandoStatusSensor:false
      };

    openDialog = (show) => {
        this.setState({ showDialogSensor:show});
    }
    openDialogConexao = (show) => {
        this.setState({ showDialogConexao:show});
    }

    openConfirm = (show) => {
        this.setState({ showConfirm:show});
    }

    
    static navigationOptions =  ({ navigation }) => {
        return {
          headerTitle: () => <Text padding={20} style={theme.fonts.header}> Soil Monitor </Text>,
          headerRight: () => (
            <TouchableOpacity  onPress={() => navigation.goback()}>
                    <Icon name="sign-out" color="black" size={40} />
            </TouchableOpacity>
          ),
        };
      };
    
    renderMonthly(){

        return (
            
            <Card shadow style={styles.box, theme.fonts.text}>
                <Image 
                    resizeMode="contain"
                    source={require('../assets/images/More.png')}
                    style={styles.moreIcon}
                />
                <Block>
                    <Block center>
                        <Text h1 primary spacing={1.7} style={theme.fonts.bodyTitle}>{ this.state.StatusOperacao ? "Ativado" : "Desativado" }</Text>
                        <Text spacing={0.7} style={theme.fonts.body}> Status de Operações</Text>
                    </Block>

                    <Block color="#86592d" style={styles.hLine} />

                    <Block row>
                        <Block center>
                            <Text size={20} spacing={0.6} primary style={{ marginBottom: 6}}>{ this.state.StatusOperacao ?  this.state.TemperaturaCelsius.toString().substring(0,4) : 0}</Text>
                            {this.state.StatusOperacao ? 
                            <Icon spacing={2} name="thermometer-quarter" color="#006600" size={20} />
                            : <Icon spacing={2} name="times" color="#006600" size={20} /> }
                            <Text body spacing={0.7}>Temperatura</Text>
                            <Text body spacing={0.7}>Celsius</Text>
                            
                        </Block>

                        <Block flex={false} color="#86592d" style={styles.vLine} />

                        <Block center>
                            <Text size={20} spacing={0.6} primary style={{ marginBottom: 6}}>{ this.state.StatusOperacao ?  this.state.Umidade : 0}</Text>
                            {this.state.StatusOperacao ? 
                            <Icon spacing={2} name="snowflake-o" color="#006600" size={20} />
                            : <Icon spacing={2} name="times" color="#006600" size={20} /> }
                            <Text body spacing={0.7}>Umidade</Text>
                        </Block>
                    </Block>
                </Block>
            </Card>
        )
    }

    renderAwards(){

        const { navigation } = this.props;
        return (

            <Block>
                { this.state.StatusOperacao ?
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    onPress={() => navigation.navigate("Rewards")}
                >
                    <LinearGradient
                        end={{ x: 1, y: 0}}
                        style={[ blockStyles.row, cardStyles.card, styles.awards]}
                        colors={["#cc9966", "#996633"]}    
                    >
                        <Block middle flex={0.4}>
                            <Badge color={rgba("#ebd9c6", '0.2')} size={74}>
                                <Badge color={theme.colors.secondary} size={52}>
                                    <Pulse color={theme.colors.secondary} numPulses={4} diameter={100} speed={30} duration={1000} /> 
                                    <Icon name="signal" size={30} color="white" size={theme.sizes.h2} />
                                </Badge>
                            </Badge>
                        </Block>
                        <Block middle>
                            <Text size={15} spacing={0.4} medium white text>Acompanhar em Tempo Real</Text>
                        </Block> 
                    </LinearGradient>
                </TouchableOpacity>
            :
            <TouchableOpacity 
                activeOpacity={0.8} 
                onPress={() => {this.setState({ showDialogSensor: true })}}
            >
            <LinearGradient
                end={{ x: 1, y: 0}}
                style={[ blockStyles.row, cardStyles.card, styles.awards]}
                colors={["#ac7339", "#cc9966"]}    
            >
                        <Block middle flex={0.4}>
                            <Badge color={rgba("#dec0a1", '0.2')} size={74}>
                                <Badge color={"#dec0a1"} size={52}>
                                    <Pulse color={"#d1a77b"} numPulses={2} diameter={120} speed={5} duration={1000} /> 
                                    <Icon name="signal" size={30} color="white" size={theme.sizes.h2} />
                                </Badge>
                            </Badge>
                        </Block>
                        <Block middle>
                            <Text size={theme.sizes.font} spacing={0.4} medium white text>Sensor Desativado</Text>
                        </Block> 
                    </LinearGradient>
            </TouchableOpacity>
                }
            </Block>
        )
    }

    renderTrips(){
        return (
            <React.Fragment>
                <Block style={{ marginBottom: theme.sizes.base}}>
                    <Text spacing={0.4} transform="uppercase" text>
                        localização atual dispositivo
                    </Text>
                </Block>

                <Card>
                    <Block row space="between">
                        <Text spacing={0.5} caption > Sensor: </Text>
                    </Block>
                    <Block row center>
                        <Badge color={rgba(theme.colors.secondary, '0.2')} size={14}>
                            <Badge color={theme.colors.secondary} size={8}/>
                        </Badge>
                        <Text spacing={0.8} color="gray"> { this.state.StatusOperacao ? this.state.ConectadoIP  : "Sem Local" } </Text>
                    </Block>                    
                </Card>

                <Block row center style={{ paddingVertical: 4 }}>
                    <Badge color="gray2" size={4}/>
                </Block>

                <Card>
                    <Block row space="between">
                        <Text spacing={0.5} caption > Dispositivo: </Text>
                    </Block>
                    <Block row center>
                        <Badge color={rgba(theme.colors.primary, '0.2')} size={14}>
                            <Badge color={theme.colors.primary} size={8}/>
                        </Badge>
                        <Text spacing={0.8} color="gray"> { this.state.StatusOperacao ? "São Paulo" : "Sem Local" } </Text>
                    </Block>
                    
                </Card>

            </React.Fragment>
        )
    }

    renderTripButton(){
        return (
            
          <Block center middle style={styles.startTrip}>
            <Badge color={rgba(theme.colors.primary, '0.1')} size={80}>
            { this.state.StatusOperacao ?  
                <TouchableOpacity
                 onPress={() =>  this.handleUpdate(false)}>
                    <Badge color={(theme.colors.primary)} size={62}>
                        <Pulse color={theme.colors.primary} numPulses={2} diameter={80} speed={30} duration={1000} /> 
                        <Icon name="stop" size={62/2} color="white" size={theme.sizes.h2} />
                    </Badge>
                </TouchableOpacity>
                : 
                <TouchableOpacity
                onPress={() => this.handleUpdate(true)}>
                    <Badge color={(theme.colors.primary)} size={62}>
                        <Pulse color={theme.colors.primary} numPulses={2} diameter={80} speed={30} duration={1000} /> 
                        <Icon name="rss" size={62/2} color="white" size={theme.sizes.h2} />
                    </Badge> 
                </TouchableOpacity>
            }
            </Badge>
          </Block>  
        )
    }

    handleUpdate = (bool) => {
        
        if(bool){
            this.state.AtivandoSensor = true;
        }else{
            this.state.DesativaSensor = true;
        }

        database.ref('SoilMonitor_USJT/Sensor/').update({StatusOperacao: bool}).then((data) =>{

        if(bool){
            setTimeout(()=>{this.setState({AtivandoSensor: false})}, 1200); 
            
        }else{
            setTimeout(()=>{this.setState({DesativaSensor: false})}, 1200); 

        }

        }).catch((error) =>{

            this.state.StatusOperacao = false;

        });
    } 

    componentDidMount(){

    this.setState({VerificandoStatusSensor: true});

    let firebaseDbTemp = database.ref('SoilMonitor_USJT/Sensor/');
        firebaseDbTemp.on('value', (snapshot) => {
            //Sensor
            let StatusOperacao = snapshot.val().StatusOperacao;
            let ConectadoIP = snapshot.val().ConectadoIP;
            this.setState({
                StatusOperacao: StatusOperacao,
                ConectadoIP: ConectadoIP,
            })
        });

        let firebaseDbTempAmbiente = database.ref('SoilMonitor_USJT/TemperaturaAmbiente/');
        firebaseDbTempAmbiente.on('value', (snapshot) => {
            //Temperatura Ambiente
            let TemperaturaCelsius = snapshot.val().TemperaturaCelsius;
            let Umidade = snapshot.val().Umidade;
            this.setState({
                TemperaturaCelsius: TemperaturaCelsius,
                Umidade: Umidade,
            })
        });

        NetInfo.addEventListener(state => {
            { state.isConnected ? this.openDialogConexao(false) : this.openDialogConexao(true)} 
            { state.isConnected ? this.setState.ConectadoInternet == true : this.setState.ConectadoInternet == false} 
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
          });
        //NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }
    componentWillUnmount() {
        this.state.StatusOperacao = false;
        this.state.ConectadoIP = null;
        this.state.ConectadoInternet = false;
      }
     
    render() {

        setTimeout(() => {
            this.setState({VerificandoStatusSensor: false});

        }, 4500);

        return (
            
            <LinearGradient 
                colors={['#d9b18c', '#e6ccb3', '#d9b38c', '#ac7339']}
                style={{flex: 1}}>

            <ProgressDialog
                visible={this.state.VerificandoStatusSensor}
                title="Verificando Status Sensor"
                message="Por favor, aguarde..."
            />

            <ProgressDialog
                visible={this.state.AtivandoSensor}
                title="Ativando Sensor"
                message="Por favor, aguarde..."
            />
            <ProgressDialog
                visible={this.state.DesativaSensor}
                title="Desativando Sensor"
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
            //onTouchOutside={ () => this.openDialogConexao(false) }
            visible={ this.state.showDialogConexao }
            >
            <Text color="white" size={18} alignItems="center" style={ { marginVertical: 30, justifyContent: "center" } }>
                É necessario esta conectado com a Internet.
            </Text>
            <Badge color={(theme.colors.secondary)} size={62}>
                <Pulse color="white" numPulses={2} diameter={80} speed={30} duration={1000} /> 
                <Icon name="globe" size={62/2} color="white" size={theme.sizes.h2} />
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
            onTouchOutside={ () => this.openDialog(false) }
            visible={ this.state.showDialogSensor }
            >
            <Text color="white" size={18} alignItems="center" style={ { marginVertical: 30, justifyContent: "center" } }>
                Para a ativação do sensor deve ser pressionado o botão abaixo.
            </Text>
            <Badge color={(theme.colors.secondary)} size={62}>
                <Pulse color="white" numPulses={2} diameter={80} speed={30} duration={1000} /> 
                <Icon name="rss" size={62/2} color="white" size={theme.sizes.h2} />
            </Badge> 
        </Dialog>

            <StatusBar hidden={true} />

            <ScrollView style={styles.welcome} showsVerticalScrollIndicator={false}>
                {this.renderMonthly()}
                {this.renderAwards()}
                {this.renderTrips()}
            </ScrollView>
                {this.renderTripButton()}
            </LinearGradient>
            
        )
    }
}

const styles = StyleSheet.create({
    welcome: {
        paddingVertical: theme.sizes.padding,
        paddingHorizontal: theme.sizes.padding,
        backgroundColor: rgba(theme.colors.secondary, '0.1'),
        borderTopColor: 'transparent',
    },
    box:{
        marginBottom: theme.sizes.base,
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 15,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10,
        elevation: 10,
    },
    hLine: {
        marginVertical: theme.sizes.base * 2,
        marginHorizontal: theme.sizes.base * 2,
        height: 1,

    },
    vLine: {
        marginVertical: theme.sizes.base  / 2,
        width: 1,

    },
    moreIcon: {
        width: 16,
        height: 17,
        position: 'absolute',
        right: theme.sizes.base,
        right: theme.sizes.base,
        top: theme.sizes.base, 
    },
    awards: {
        padding: theme.sizes.base,
        marginBottom: theme.sizes.padding,
    },
    startTrip:{
        position:'absolute',
        left: (width - 70) / 2,
        bottom: 10,

    }
});