import React, { Component } from 'react';
import { Dimensions, StyleSheet, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native';

import { Block, Badge,Card, Text, } from '../components';
import { styles as blockStyles } from '../components/Block'
import { styles as cardStyles } from '../components/Card'
import { theme, mocks, } from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import rgba from 'hex-to-rgba';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');
export default class Welcome extends Component {
    static navigationOptions = {
        headerTitle: <Text style={theme.fonts.header}> Soil Monitor </Text>,
        headerRight: (
            <TouchableOpacity>
                <Block flex={false}>
                    <Image 
                        resizeMode="contain"
                        source={require('../assets/images/Menu.png')}
                        style={{width: 20, height:24}}
                    />
                    <Badge
                        size={13}
                        color={theme.colors.primary}
                        style={{position: 'absolute', top: -4, right: -4}}
                    />
                </Block>
            </TouchableOpacity>
        )
    }

    renderMonthly(){

        return (
            
            <Card shadow style={{ marginBottom: theme.sizes.base }}>
                <Image 
                    resizeMode="contain"
                    source={require('../assets/images/More.png')}
                    style={styles.moreIcon}
                />
                <Block>
                    <Block center>
                        <Text h1 primary spacing={1.7}>Lorem Ipsum</Text>
                        <Text spacing={0.7}>Lorem Ipsum is simply dummy text </Text>
                    </Block>

                    <Block color="#86592d" style={styles.hLine} />

                    <Block row>
                        <Block center>
                            <Text size={20} spacing={0.6} primary style={{ marginBottom: 6}}>00</Text>
                            <Text body spacing={0.7}>Lorem</Text>
                            <Text body spacing={0.7}>Ipsum</Text>
                        </Block>

                        <Block flex={false} color="#86592d" style={styles.vLine} />

                        <Block center>
                            <Text size={20} spacing={0.6} primary style={{ marginBottom: 6}}>00</Text>
                            <Text body spacing={0.7}>Lorem</Text>
                            <Text body spacing={0.7}>Ipsum</Text>
                        </Block>
                    </Block>
                    
                </Block>
            </Card>
        )
    }

    renderAwards(){

        const { navigation } = this.props;

        return (

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
                        <Badge color={rgba(theme.colors.secondary, '0.2')} size={74}>
                            <Badge color={theme.colors.secondary} size={52}>
                            <Icon name="signal" size={30} color="white" size={theme.sizes.h2} />
                            </Badge>
                        </Badge>
                    </Block>
                    <Block middle>
                        <Text size={theme.sizes.font} spacing={0.4} medium white>Acompanha em Tempo Real!</Text>
                    </Block> 
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    renderTrips(){
        return (
            <React.Fragment>
                <Block style={{ marginBottom: theme.sizes.base }}>
                    <Text spacing={0.4} transform="uppercase">
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
                        <Text spacing={0.8} color="gray"> Lorem Ipsum is simply dummy text </Text>
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
                        <Text spacing={0.8} color="gray"> Lorem Ipsum is simply dummy text </Text>
                    </Block>
                    
                </Card>

            </React.Fragment>
        )
    }

    renderTripButton(){
        return (
          <Block center middle style={styles.startTrip}>
            <Badge color={rgba(theme.colors.primary, '0.1')} size={100}>
                <TouchableOpacity>
                    <Badge color={(theme.colors.primary)} size={62}>
                        <Icon name="stop" size={62/2} color="white" size={theme.sizes.h2} />
                    </Badge>
                </TouchableOpacity>
            </Badge>
          </Block>  
        )
    }

    render() {
        return (
            <LinearGradient
            colors={['#e6ccb3', '#e6ccb3', '#d9b38c', '#ac7339']}
            style={{flex: 1}}>
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
        left: (width - 100) / 2,
        bottom: 10,

    }
});