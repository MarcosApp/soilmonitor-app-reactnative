import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import rgba from 'hex-to-rgba';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dialog, ProgressDialog } from "react-native-simple-dialogs";
// check this lib for more options
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import LinearGradient from 'react-native-linear-gradient';
import { database } from '../components/ConfigFirebase';
const Pulse = require('react-native-pulse').default;
import { Block, Badge, Card, Text } from '../components';
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
    StatusOperacao: false,
    //Bomba
    StatusOperacaoBomba: false,
    //Chuva
    DensidadeChuva: 0,
    StatusChuva: ""
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

    }
  }

  componentDidMount() {

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

    let firebaseDbBomba = database.ref('SoilMonitor_USJT/BombaSubmersivel');
    firebaseDbBomba.on('value', (snapshot) => {
      //Bomba
      let StatusOperacaoBomba = snapshot.val().StatusOperacao;
      this.setState({
        StatusOperacaoBomba: StatusOperacaoBomba,
      })
    });

    let firebaseDbChuva = database.ref('SoilMonitor_USJT/SensorChuva');
    firebaseDbChuva.on('value', (snapshot) => {
      //Chuva
      let StatusChuva = snapshot.val().Status;
      let DensidadeChuva = snapshot.val().DensidadeChuva;
      this.setState({
        StatusChuva: StatusChuva,
        DensidadeChuva: DensidadeChuva,
      })
    });

  }

  handleUpdate = (bool) => {

    if (bool) {
      this.state.AtivandoBomba = true;
    } else {
      this.state.DesativaBomba = true;
    }

    database.ref('SoilMonitor_USJT/BombaSubmersivel/').update({ StatusOperacao: bool }).then((data) => {

      if (bool) {
        setTimeout(() => { this.setState({ AtivandoBomba: false }) }, 5500);

      } else {
        setTimeout(() => { this.setState({ DesativaBomba: false }) }, 5500);

      }

    }).catch((error) => {

      this.state.StatusOperacaoBomba = false;

    });
  }

  componentWillUnmount() {

    this.state.TemperaturaCelsius = 0;
    this.state.TemperaturaFahrenheit = 0;
    this.state.UmidadeTemp = 0;
    this.state.Status = null;
    this.state.UmidadeSensor = 0;
    this.state.StatusOperacao = false;
  }
  renderTripButton() {
    return (

      <Block center middle style={styles.startTrip}>
        {this.state.StatusOperacaoBomba ?
          <Badge color={rgba(theme.colors.primary, '0.1')} size={80}>
            <TouchableOpacity
              onPress={() => this.handleUpdate(false)}>

              <Badge color={("#1ab2ff")} size={70}>
                <Pulse color={("#b3ebff")} numPulses={2} diameter={300} speed={10} duration={1000} />

                <Icon name="shower" size={75 / 2} color="white" size={30} />
              </Badge>
            </TouchableOpacity>
          </Badge>
          : <Badge color={rgba(theme.colors.primary, '0.1')} size={80}>
            <TouchableOpacity
              onPress={() => this.handleUpdate(true)}>
              <Badge color={("#1ab2ff")} size={70}>
                <Icon name="shower" size={75 / 2} color="white" size={30} />
              </Badge>
            </TouchableOpacity>
          </Badge>
        }
      </Block>
    )
  }

  renderMonthly() {
    return (
      <Card shadow style={{ paddingVertical: theme.sizes.padding }}>
        <Block>
          <Block center>
            <Icon name="soundcloud" style={styles.moreIcon} size={75 / 2} color="#b3e6ff" size={30} />
            <Text h3 primary spacing={1.7}>{this.state.Status}</Text>
            <Text spacing={0.7}>Temperatura Ambiente</Text>
          </Block>

          <Block color="gray3" style={styles.hLine} />

          <Block row>
            <Block center>
              <Text size={20} spacing={0.6} primary style={{ marginBottom: 6 }}>{this.state.StatusOperacao ? this.state.TemperaturaCelsius.toString().substring(0, 4) : 0} ºC</Text>
              <Icon spacing={2} name="thermometer-quarter" color="#006600" size={20} />
              <Text body spacing={0.7}>Temperatura</Text>
              <Text body spacing={0.7}>Celsius</Text>
            </Block>

            <Block flex={false} color="gray3" style={styles.vLine} />

            <Block center>
              <Text size={20} spacing={1.8} primary style={{ marginBottom: 6, marginBottom: 5 }}>{this.state.StatusOperacao ? this.state.TemperaturaFahrenheit.toString().substring(0, 4) : 0} ºF</Text>
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
      <Card shadow style={{ paddingVertical: theme.sizes.base * 2 }}>
        <Icon name="pagelines" style={styles.moreIcon} size={75 / 2} color="#006600" size={30} />
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
                <Text h2 medium>{this.state.StatusOperacao ? this.state.UmidadeSensor.toString().substring(0, 3) : 0}%</Text>
              </Block>
            )}
          </AnimatedCircularProgress>
        </Block>

        <Block center>
          <Text title spacing={1} style={{ marginVertical: 8 }}>
            Umidade Porcentual
          </Text>
          <Text>
            <Text primary>{this.state.StatusOperacao ? this.state.UmidadeSensor.toString().substring(0, 3) : 0}% </Text>
            <Text gray transform="uppercase">Sensor</Text>
          </Text>
        </Block>

        <Block color="gray3" style={styles.hLine} />

        <Block row>
          <Block center flex={1}>
            <Text size={20} spacing={1} primary>{this.state.StatusOperacao ? this.state.UmidadeTemp.toString().substring(0, 2) : 0} %</Text>
            <Text spacing={0.7}>Umidade Ambiente</Text>
          </Block>
        </Block>

        <Block color="gray3" style={styles.hLine} />

      </Card>
    )
  }

  renderChallenges() {

    return (

      <Card shadow style={styles.box, theme.fonts.text}>
        <Icon name="tint" style={styles.moreIcon} size={75 / 2} color="#33bbff" size={30} />
        <Block center>
          <ProgressDialog
            visible={this.state.AtivandoBomba}
            title="Ativando Bomba de Água."
            message="Por favor, aguarde..."
          />
          <ProgressDialog
            visible={this.state.DesativaBomba}
            title="Desativando Bomba de Água."
            message="Por favor, aguarde..."
          />
          <Text title spacing={1} style={{ marginVertical: 8 }}>
            Estado de Chuva
          </Text>
          <AnimatedCircularProgress
            size={100}
            width={25}
            fill={this.state.StatusOperacao ? this.state.DensidadeChuva : 0}
            tintColor="#00e0ff"
            backgroundColor="#3d5875"
            arcSweepAngle={360}
          />
          <Text title spacing={1} style={{ marginVertical: 8 }}>
            {this.state.StatusOperacao ? this.state.StatusChuva.toString() : 'Sem detecção de chuva'}
          </Text>
          <Icon name="cloud" size={75 / 2} color="#3d5875" size={30} />
        </Block>
      </Card>
    )
  }

  render() {

    return (
      <LinearGradient
        colors={['#e6ccb3', '#e6ccb3', '#d9b38c', '#ac7339']}
        style={{ flex: 1 }}>
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
  startTrip: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  }
})