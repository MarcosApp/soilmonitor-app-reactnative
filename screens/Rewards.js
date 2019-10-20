import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import rgba from 'hex-to-rgba';
import Icon from 'react-native-vector-icons/FontAwesome';
// check this lib for more options
import { CircularProgress } from 'react-native-circular-progress';
import LinearGradient from 'react-native-linear-gradient';
import { database } from '../components/ConfigFirebase';

import { Block, Badge, Card, Text, Progress } from '../components';
import { theme, mocks } from '../constants';

export default class Rewards extends Component {

  state = {
    //Temperatura
    TemperaturaCelsius: 0,
    TemperaturaFahrenheit: 0,
    UmidadeTemp: 0,
    //Sensor
    Status: "Sem Sinal",
    UmidadeSensor: 0
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
    let firebaseDbTemp = database.ref('SoilMonitor_USJT/TemperaturaAmbiente');
    firebaseDbTemp.on('value', (snapshot) => {
        //Temperatura Ambiente
        var TemperaturaCelsius = snapshot.val().TemperaturaCelsius;
        var TemperaturaFahrenheit = snapshot.val().TemperaturaFahrenheit;
        var Umidade = snapshot.val().Umidade;
        this.setState({
          TemperaturaCelsius: TemperaturaCelsius,
          TemperaturaFahrenheit: TemperaturaFahrenheit,
          UmidadeTemp: Umidade,
        })
      });
      let firebaseDbSensor = database.ref('SoilMonitor_USJT/Sensor');
      firebaseDbSensor.on('value', (snapshot) => {
        //Temperatura Ambiente
        var Status = snapshot.val().Status;
        var Umidade = snapshot.val().Umidade;
        this.setState({
          Status: Status,
          UmidadeSensor: Umidade,
        })
      });
  }

  renderMonthly() {
    return (
      <Card shadow style={{ paddingVertical: theme.sizes.padding }}>
        <Block>
          <Block center>
            <Text h3 primary spacing={1.7}>{this.state.Status}</Text>
            <Text spacing={0.7}>Temperatura Ambiente</Text>
          </Block>

          <Block color="gray3" style={styles.hLine} />

          <Block row>
            <Block center>
              <Text size={20} spacing={0.6} primary style={{ marginBottom: 6 }}>{this.state.TemperaturaCelsius.toString().substring(0,4)} ºC</Text>
              <Text body spacing={0.7}>Temperatura</Text>
              <Text body spacing={0.7}>Celsius</Text>
            </Block>

            <Block flex={false} color="gray3" style={styles.vLine} />

            <Block center>
              <Text size={20} spacing={0.6} primary style={{ marginBottom: 6 }}>{this.state.TemperaturaFahrenheit.toString().substring(0,4)} ºF</Text>
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
        <Block center>
          <CircularProgress
            size={200} // can use  with * .5 => 50%
            fill={this.state.UmidadeSensor} // percentage
            lineCap="round" // line ending style
            rotation={220}
            arcSweepAngle={280}
            width={theme.sizes.base}
            tintColor={theme.colors.primary} // gradient is not supported :(
            backgroundColor={theme.colors.gray3}
            backgroundWidth={theme.sizes.base / 2}
          >
            {() => (
              <Block center middle>
                <Text h2 medium>{this.state.UmidadeSensor.toString().substring(0,3)}%</Text>
              </Block>
            )}
          </CircularProgress>
        </Block>

        <Block center>
          <Text title spacing={1} style={{marginVertical: 8}}>
            Umidade Porcentual
          </Text>
          <Text>
            <Text primary>{this.state.UmidadeSensor.toString().substring(0,3)}% </Text>
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
            <Text size={20} spacing={1} primary>{this.state.UmidadeTemp.toString().substring(0,2)} %</Text>
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

        <Block row center space="between">
          <Text>Lorem Ipsum Lorem Ipsum</Text>
          <Text size={20} spacing={1} primary>$6.71</Text>
        </Block>
      </Card>
    )
  }

  renderChallenges() {
    return (
      <Block>
        <Block style={{
            marginTop: theme.sizes.base,
            marginBottom: theme.sizes.base,
            paddingHorizontal: theme.sizes.base / 3
          }}
        >
          <Text spacing={0.7} transform="uppercase">
            Lorem Ipsum
          </Text>
        </Block>

        <Card row shadow color="gray">
          <Block middle flex={0.4}>
            <Badge color={rgba(theme.colors.white, '0.2')} size={74}>
              <Badge color={rgba(theme.colors.white, '0.2')} size={52}>
              <Icon name="heartbeat" size={62/2} color="white" size={theme.sizes.h2} />
              </Badge>
            </Badge>
          </Block>
          <Block middle>
            <Text size={theme.sizes.base} spacing={0.4} medium white>
              Lorem Ipsum
            </Text>
            <Text size={theme.sizes.base} spacing={0.4} medium white>
              Lorem Ipsum
            </Text>
          </Block>
        </Card>
      </Block>
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
})