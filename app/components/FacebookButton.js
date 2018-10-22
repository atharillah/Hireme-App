import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Button from './Button';

export default class FacebookButton extends Component {
  static contextTypes = {
    login: React.PropTypes.func,
  };
  
  render() {
    return (
      <Button
        icon="facebook"
        buttonStyle={styles.facebookButton}
        textStyle={styles.loginButtonText}
        text="Login With Facebook"
        onPress={() => this.context.login()}
      />
    );
  }
}

const styles = StyleSheet.create({
  facebookButton: {
    backgroundColor: '#3B5998',
    borderColor: '#ffffff33',
    borderWidth: 1,
  },
  loginButtonText: {
    color: '#fefefe',
    fontWeight: 'bold',
  },
});
