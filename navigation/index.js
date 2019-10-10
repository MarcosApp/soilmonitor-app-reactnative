import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import Rewards from '../screens/Rewards';
import Trip from '../screens/Trip';

import { fadeIn  } from 'react-navigation-transitions';
import { theme } from '../constants';

const screens = createStackNavigator({
    Login,
    Welcome,
    Rewards,
    Trip,
}, {
    transitionConfig: () => fadeIn (1000),
    defaultNavigationOptions:{
        headerStyle: {
            height:60,
            backgroundColor: '#D5A881',
            elevation: 0,
            shadowOpacity: 0
          },
          headerTitleContainerStyle: {
            alignItems: 'flex-end',
            paddingLeft: theme.sizes.padding
          },
          headerLeftContainerStyle: {
            alignItems: 'flex-end',
            marginLeft: theme.sizes.padding,
            paddingRight: theme.sizes.base,
          },
          headerRightContainerStyle: {
            alignItems: 'flex-end',
            marginRight: theme.sizes.padding,
          },
        },
        headerLayoutPreset: 'left'
      });
    
export default createAppContainer(screens);