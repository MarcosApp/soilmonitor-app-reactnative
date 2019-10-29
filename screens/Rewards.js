import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import rgba from 'hex-to-rgba';
import Icon from 'react-native-vector-icons/FontAwesome';
// check this lib for more options
import { CircularProgress, AnimatedCircularProgress } from 'react-native-circular-progress';
import LinearGradient from 'react-native-linear-gradient';
import { database } from '../components/ConfigFirebase';
const Pulse = require('react-native-pulse').default;
import { Block, Badge, Card, Text, Progress } from '../components';
import { theme } from '../constants';

export default class Rewards extends Component {
  _isMounted = false;

  state = {
    //Temperatura
    TemperaturaCelsius: 0,
    TemperaturaFahrenheit: 0,
    UmidadeTemp: 0,
    //Sensor
    Status: "Sem Sinal",
    UmidadeSensor: 0,
    StatusOperacao: false
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Text
            style={[
            theme.fonts.header,
            { paddingLeft: theme.sizes.base }
          ]}
        >
          Métricas
        </Text>
      ),
      headerLeft: (
        

        <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
          <Image
            resizeMode="contain"
            source={require('../assets/images/Back.png')}
            style={{ width: 30, height: 24, marginBottom: 15 }}
          />
        </TouchableOpacity>
      )
    }
  }
  
  componentDidMount(){
    this._isMounted = true;

    let firebaseDbTemp = database.ref('SoilMonitor_USJT/TemperaturaAmbiente');
    firebaseDbTemp.on('value', (snapshot) => {
        //Temperatura Ambiente
        let TemperaturaCelsius = snapshot.val().TemperaturaCelsius;
        let TemperaturaFahrenheit = snapshot.val().TemperaturaFahrenheit;
        let Umidade = snapshot.val().Umidade;
        this.setState({
          TemperaturaCelsius: TemperaturaCelsius,
          TemperaturaFahrenheit: TemperaturaFahrenheit,
          UmidadeTemp: Umidade,
        })
      });
      let firebaseDbSensor = database.ref('SoilMonitor_USJT/Sensor');
      firebaseDbSensor.on('value', (snapshot) => {
        //Temperatura Ambiente
        let StatusOperacao = snapshot.val().StatusOperacao;
        let Status = snapshot.val().Status;
        let Umidade = snapshot.val().Umidade;
        this.setState({
          Status: Status,
          UmidadeSensor: Umidade,
          StatusOperacao: StatusOperacao
        })
      });
  }
  componentWillUnmount() {
    this._isMounted = false;

    this.state.TemperaturaCelsius = 0;
    this.state.TemperaturaFahrenheit = 0;
    this.state.UmidadeTemp = 0;
    this.state.Status = null;
    this.state.UmidadeSensor = 0;
    this.state.StatusOperacao = false;
  }
    renderTripButton(){
      return (
          
        <Block center middle style={styles.startTrip}>
          <Badge color={rgba(theme.colors.primary, '0.1')} size={80}>
              <TouchableOpacity
              onPress={() => this.handleUpdate(true)}>
                  <Badge color={("#1ab2ff")} size={70}>
                      <Pulse color={"#33bbff"} numPulses={2} diameter={100} speed={5} duration={1000} /> 
                      <Icon name="shower" size={75/2} color="white" size={30} />
                  </Badge> 
              </TouchableOpacity>
          </Badge>
        </Block>  
      )
  }

  renderMonthly() {
    return (
      <Card shadow style={{ paddingVertical: theme.sizes.padding }}>
        <Block>
          <Block center>
          <Icon name="soundcloud" style={styles.moreIcon} size={75/2} color="#b3e6ff" size={30} />
            <Text h3 primary spacing={1.7}>{this.state.Status}</Text>
            <Text spacing={0.7}>Temperatura Ambiente</Text>
          </Block>

          <Block color="gray3" style={styles.hLine} />

          <Block row>
            <Block center>
              <Text size={20} spacing={0.6} primary style={{ marginBottom: 6 }}>{ this.state.StatusOperacao ? this.state.TemperaturaCelsius.toString().substring(0,4) : 0 } ºC</Text>
              <Icon spacing={2} name="thermometer-quarter" color="#006600" size={20} />
              <Text body spacing={0.7}>Temperatura</Text>
              <Text body spacing={0.7}>Celsius</Text>
            </Block>

            <Block flex={false} color="gray3" style={styles.vLine} />

            <Block center>
              <Text size={20} spacing={1.8} primary style={{ marginBottom: 6, marginBottom:5  }}>{ this.state.StatusOperacao ? this.state.TemperaturaFahrenheit.toString().substring(0,4) : 0 } ºF</Text>
              <Icon spacing={2} name="thermometer-half" color="#006600" size={20} />
              <Text body spacing={0.7}>Temperatura</Text>
              <Text body spacing={0.7}>Fahrenheit</Text>
            </Block>
          </Block>
        </Block>
      </Card>
    )
  }
  
  renderRewards() {
    
    return (
      <Card shadow style={{ paddingVertical: theme.sizes.base * 2}}>
        <Icon name="pagelines" style={styles.moreIcon} size={75/2} color="#006600" size={30} />
        <Block center>
       
            <AnimatedCircularProgress
              size={250}
              fill={this.state.StatusOperacao ? this.state.UmidadeSensor : 0} // percentage
              width={15}
              backgroundWidth={15}
              tintColor={theme.colors.primary} // gradient is not supported :(
              backgroundColor={theme.colors.gray3}
              backgroundWidth={20 / 2}
            >
            {() => (
              <Block center middle>
                <Text h2 medium>{this.state.StatusOperacao ? this.state.UmidadeSensor.toString().substring(0,3) : 0 }%</Text>
              </Block>
            )}
          </AnimatedCircularProgress>
        </Block>

        <Block center>
          <Text title spacing={1} style={{marginVertical: 8}}>
            Umidade Porcentual
          </Text>
          <Text>
            <Text primary>{this.state.StatusOperacao ? this.state.UmidadeSensor.toString().substring(0,3) : 0 }% </Text>
            <Text gray transform="uppercase">Sensor</Text>
          </Text>
        </Block>

        <Block color="gray3" style={styles.hLine} />

        <Block row>
          <Block center flex={0.8}>
            <Text size={20} spacing={1} primary>00</Text>
            <Text spacing={0.7}>Clima</Text>
          </Block>
          
          <Block center flex={2}>
            <Text size={20} spacing={1} primary>00</Text>
            <Text spacing={0.7}>Densidade Sensor</Text>
          </Block>

          <Block center flex={0.8}>
            <Text size={20} spacing={1} primary>{this.state.StatusOperacao ? this.state.UmidadeTemp.toString().substring(0,2) : 0} %</Text>
            <Text spacing={0.7}>Umidade Ambiente</Text>
          </Block>
        </Block>

        <Block color="gray3" style={styles.hLine} />

        <Block style={{ marginBottom: theme.sizes.base }}>
          <Block row space="between" style={{ paddingLeft: 6 }}>
            <Text body spacing={0.7}>Lorem Ipsum</Text>
            <Text caption spacing={0.7}>8.1</Text>
          </Block>
          <Progress value={0.81} />
        </Block>
        
        <Block style={{ marginBottom: theme.sizes.base }}>
          <Block row space="between" style={{ paddingLeft: 6 }}>
            <Text body spacing={0.7}>Lorem Ipsum</Text>
            <Text caption spacing={0.7}>9.8</Text>
          </Block>
          <Progress value={0.98} />
        </Block>

        <Block style={{ marginBottom: theme.sizes.base }}>
          <Block row space="between" style={{ paddingLeft: 6 }}>
            <Text body spacing={0.7}>Lorem Ipsum</Text>
            <Text caption spacing={0.7}>7.4</Text>
          </Block>
          <Progress endColor="#D37694" value={0.90} />
        </Block>

        <Block color="gray3" style={styles.hLine} />

      </Card>
    )
  }

  renderChallenges() {

    return (
      <Card shadow style={styles.box, theme.fonts.text}>
      <Icon name="tint" style={styles.moreIcon} size={75/2} color="#33bbff" size={30} />
      <Block center>
      <Text title spacing={1} style={{marginVertical: 8}}>
            Estado de Chuva
          </Text>
      <AnimatedCircularProgress
          size={100}
          width={25}
          fill={0}
          tintColor="#00e0ff"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#3d5875"
          arcSweepAngle={360}
        />
        <Text title spacing={1} style={{marginVertical: 8}}>
            Sem Previsão de Chuva
          </Text>
          <Icon name="cloud" size={75/2} color="#3d5875" size={30} />
      </Block>
  </Card>
    )
  }

  render() {
      
    return (
      <LinearGradient
          colors={['#e6ccb3', '#e6ccb3', '#d9b38c', '#ac7339']}
          style={{flex: 1}}>
        <ScrollView style={styles.rewards} showsVerticalScrollIndicator={false}>
          {this.renderMonthly()}
          {this.renderRewards()}
          {this.renderChallenges()}
        </ScrollView>
        {this.renderTripButton()}
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  rewards: {
    padding: theme.sizes.padding
  },
  // horizontal line
  hLine: {
    marginVertical: theme.sizes.base * 1.5,
    height: 1,
  },
  // vertical line
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1,
  },
  moreIcon: {
    padding: 5,
  },
  startTrip:{
    position:'absolute',
    right: 10,
    bottom: 10,
  }
})