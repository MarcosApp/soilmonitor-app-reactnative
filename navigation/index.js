import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Welcome from '../screens/Welcome';
import Rewards from '../screens/Rewards';
import Trip from '../screens/Trip';

import { theme } from '../constants';

const screens = createStackNavigator({
    Welcome,
    Rewards,
    Trip,
}, {
    defaultNavigationOptions:{
        
        headerStyle: {
            backgroundColor: theme.colors.gray4,
            elevation: 0,
            shadowOpacity: 0
          },
          headerTitleContainerStyle: {
            alignItems: 'flex-end',
            paddingLeft: theme.sizes.padding,
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
        headerLayoutPreset: 'left',
        backgroundColor: 'red'
    });
    
export default createAppContainer(screens);