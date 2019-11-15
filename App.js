import React from 'react';
import { StyleSheet } from 'react-native';
import Navigation from './navigation';
import { Block, Text } from './components';

export default class App extends React.Component {
  render() {
    return (
      <Block>
          <Navigation />
      </Block>
    );
  }
}