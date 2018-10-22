import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, StyleSheet } from 'react-native';
import { Image } from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import logo from '../../resources/logo.png';
import * as client from '../models/client';

export default class Splash extends Component {
  componentDidMount() {
    client.getToken()
    .then(({ token, type }) => {
      if (token && type === 'user') {
        this.props.navigation.token(token);
        this.props.navigation.loadFirst('Main');
        this.props.navigation.getProfile();
      } else if (token && type === 'company') {
        this.props.navigation.token(token);
        this.props.navigation.loadFirst('MainHiring');
        this.props.navigation.getProfile();
      } else {
        this.props.navigation.loadFirst('Login');
      }
    });
  }

  render() {
    return (
      <LinearGradient start={{ x: 0.5, y: 0.5 }} end={{ x: -0.2, y: 1 }} colors={['#0036AD', '#8A2BE2']} style={styles.mainBackground}>
        <StatusBar translucent backgroundColor="transparent" />
        <Image
          animation={'fadeIn'}
          duration={400}
          delay={200}
          source={logo}
          style={styles.logo}
        />
      </LinearGradient>
    );
  }
}

Splash.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
  mainBackground: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 128,
    height: 128,
    alignSelf: 'center',
  },
});
