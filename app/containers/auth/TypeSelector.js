import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, StyleSheet } from 'react-native';
import { Image } from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Login from './Login';
import Register from './Register';
import RegisterHiring from './RegisterHiring';
import MainSelector from './MainSelector';
import logo from '../../../resources/logo.png';

export default class TypeSelector extends Component {
  async setVisibleForm(visibleForm) {
    await this.formRef.hideForm();
    this.props.navigation.setAuthForm(visibleForm);
  }

  render() {
    const { visibleAuthForm } = this.props.screenProps;
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
        {(visibleAuthForm === 'NONE') && (
          <MainSelector
            {...this.props}
            setVisibleForm={x => this.setVisibleForm(x)}
            ref={ref => (this.formRef = ref)}
          />
        )}
        {(visibleAuthForm === 'REGISTER') && (
          <Register
            {...this.props}
            onLoginLinkPress={() => this.setVisibleForm('LOGIN')}
            ref={ref => (this.formRef = ref)}
          />
        )}
        {(visibleAuthForm === 'REGISTER_HIRING') && (
          <RegisterHiring
            {...this.props}
            onLoginLinkPress={() => this.setVisibleForm('LOGIN')}
            ref={ref => (this.formRef = ref)}
          />
        )}
        {(visibleAuthForm === 'LOGIN') && (
          <Login
            {...this.props}
            setVisibleForm={x => this.setVisibleForm(x)}
            ref={ref => (this.formRef = ref)}
          />
        )}
      </LinearGradient>
    );
  }
}

TypeSelector.propTypes = {
  navigation: PropTypes.object.isRequired,
  screenProps: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  mainBackground: {
    display: 'flex',
    flex: 1,
    paddingTop: 45,
  },
  logo: {
    width: 64,
    height: 64,
    alignSelf: 'center',
  },
});
