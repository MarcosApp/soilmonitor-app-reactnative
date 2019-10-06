import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import rgba from 'hex-to-rgba';
import Icon from 'react-native-vector-icons/FontAwesome';
// check this lib for more options
import { CircularProgress } from 'react-native-circular-progress';
import LinearGradient from 'react-native-linear-gradient';

import { Block, Badge, Card, Text, Progress } from '../components';
import { theme, mocks } from '../constants';

export default class Rewards extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Text
          style={[
            theme.fonts.header,
            { paddingLeft: theme.sizes.base },
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
            style={{ width: 20, height: 24, marginRight: theme.sizes.base }}
          />
        </TouchableOpacity>
      )
    }
  }
  
  renderMonthly() {
    return (
      <Card shadow style={{ paddingVertical: theme.sizes.padding }}>
        <Block>
          <Block center>
            <Text h1 primary spacing={1.7}>Lorem Ipsum</Text>
            <Text spacing={0.7}>Lorem Ipsum Lorem Ipsum</Text>
          </Block>

          <Block color="gray3" style={styles.hLine} />

          <Block row>
            <Block center>
              <Text size={20} spacing={0.6} primary style={{ marginBottom: 6 }}>$5</Text>
              <Text body spacing={0.7}>Challenge</Text>
              <Text body spacing={0.7}>Credit</Text>
            </Block>

            <Block flex={false} color="gray3" style={styles.vLine} />

            <Block center>
              <Text size={20} spacing={0.6} primary style={{ marginBottom: 6 }}>$6.71</Text>
              <Text body spacing={0.7}>Driver</Text>
              <Text body spacing={0.7}>Discount</Text>
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
            size={214} // can use  with * .5 => 50%
            fill={40} // percentage
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
                <Text h2 medium>32º</Text>
              </Block>
            )}
          </CircularProgress>
        </Block>

        <Block center>
          <Text title spacing={1} style={{marginVertical: 8}}>
            Lorem Ipsum
          </Text>
          <Text>
            <Text primary>00 </Text>
            <Text gray transform="uppercase">Lorem Ipsum</Text>
          </Text>
        </Block>

        <Block color="gray3" style={styles.hLine} />

        <Block row>
          <Block center flex={0.8}>
            <Text size={20} spacing={1} primary>00</Text>
            <Text spacing={0.7}>Ipsum</Text>
          </Block>
          
          <Block center flex={2}>
            <Text size={20} spacing={1} primary>00</Text>
            <Text spacing={0.7}>Ipsum</Text>
          </Block>

          <Block center flex={0.8}>
            <Text size={20} spacing={1} primary>00</Text>
            <Text spacing={0.7}>Lorem</Text>
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
          <Progress endColor="#D37694" value={0.40} />
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
            Challenges taken
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
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.gray4,
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