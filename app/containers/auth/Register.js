import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView } from 'react-native';
import { View, Text } from 'react-native-animatable';
import TextInput from '../../components/CustomTextInput';
import Button from '../../components/Button';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordVerify: '',
      error: {},
      isLoading: false,
    };
  }

  async hideForm() {
    await Promise.all([
      this.formRef.fadeOut(200),
    ]);
  }

  register() {
    if (this.state.password !== this.state.passwordVerify) {
      this.setState({ error: { password: 'Password does not match the confirm password!' } });
      return;
    }

    this.setState({ error: {}, isLoading: true });
    this.props.navigation.register(this.state)
    .then(() => this.setState({
      message: 'Registration success, you can login now.',
      isLoading: false,
    }))
    .catch(({ response }) => {
      const err = response.data;
      console.tron.error(err);

      this.setState({
        error: {
          firstName: err.firstName && err.firstName[0],
          lastName: err.lastName && err.lastName[0],
          email: err.email && err.email[0],
          password: err.password && err.password[0],
        },
        isLoading: false,
      });
    });
  }

  render() {
    const { onLoginLinkPress } = this.props;
    const { firstName, lastName, email, password, isLoading, error, message } = this.state;
    const isValid = firstName !== ''
      && lastName !== ''
      && email !== ''
      && password !== '';
    return (
      <View
        animation="fadeIn"
        duration={400}
        style={styles.view}
        ref={ref => (this.formRef = ref)}
        pointerEvents={isLoading ? 'none' : 'auto'}
      >
        <ScrollView>
          <Text style={styles.subHeader}>I{"'"}m Looking</Text>
          <Text style={styles.header}>Register</Text>
          <View>
            <TextInput
              ref={ref => (this.namaDepanInputRef = ref)}
              placeholder={'Nama Depan'}
              returnKeyType={'next'}
              blurOnSubmit={false}
              autoCapitalize="words"
              disabled={isLoading}
              onChangeText={text => this.setState({ firstName: text })}
              onSubmitEditing={() => this.namaBelakangInputRef.focus()}
            />
            { error.firstName && <Text style={styles.errorMessage}>{error.firstName}</Text>}
            <TextInput
              ref={ref => (this.namaBelakangInputRef = ref)}
              placeholder={'Nama Belakang'}
              returnKeyType={'next'}
              blurOnSubmit={false}
              autoCapitalize="words"
              disabled={isLoading}
              onChangeText={text => this.setState({ lastName: text })}
              onSubmitEditing={() => this.emailInputRef.focus()}
            />
            { error.lastName && <Text style={styles.errorMessage}>{error.lastName}</Text>}
            <TextInput
              ref={ref => (this.emailInputRef = ref)}
              placeholder={'Email'}
              keyboardType={'email-address'}
              returnKeyType={'next'}
              blurOnSubmit={false}
              disabled={isLoading}
              onChangeText={text => this.setState({ email: text })}
              onSubmitEditing={() => this.passwordInputRef.focus()}
            />
            { error.email && <Text style={styles.errorMessage}>{error.email}</Text>}
            <TextInput
              ref={ref => (this.passwordInputRef = ref)}
              secureTextEntry
              placeholder={'Password'}
              keyboardType={'default'}
              returnKeyType={'next'}
              blurOnSubmit={false}
              disabled={isLoading}
              onChangeText={text => this.setState({ password: text })}
              onSubmitEditing={() => this.passwordRepeatInputRef.focus()}
            />
            <TextInput
              ref={ref => (this.passwordRepeatInputRef = ref)}
              secureTextEntry
              placeholder={'Repeat Password'}
              keyboardType={'default'}
              returnKeyType={'done'}
              disabled={isLoading}
              onChangeText={text => this.setState({ passwordVerify: text })}
            />
            { error.password && <Text style={styles.errorMessage}>{error.password}</Text>}
            <View animation={'zoomIn'} duration={400} delay={200}>
              {!message && <Button
                buttonStyle={styles.registerButton}
                textStyle={styles.registerButtonText}
                isEnabled={isValid}
                isLoading={isLoading}
                loadingText="Registering your account..."
                text="Register"
                onPress={() => this.register()}
              />}
              {message && <Text style={styles.messageText}>{message}</Text>}
              {message &&
              <Button
                buttonStyle={styles.registerButton}
                textStyle={styles.registerButtonText}
                isEnabled={isValid}
                text="Login"
                onPress={onLoginLinkPress}
              />}
            </View>
            <Text
              style={styles.loginLink}
              animation={'fadeIn'}
              duration={400}
              delay={200}
              disabled={isLoading}
              onPress={onLoginLinkPress}
            >
              Sudah punya akun? Login disini!
          </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

Register.propTypes = {
  onLoginLinkPress: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flex: 1,
    margin: 30,
    marginTop: 10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fefefe',
    alignSelf: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#ff4949',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fefefe',
    alignSelf: 'center',
  },
  messageText: {
    color: '#fefefe',
    alignSelf: 'center',
    marginBottom: 5,
    textAlign: 'center',
  },
  loginLink: {
    color: '#fefefe',
    alignSelf: 'center',
    marginTop: 5,
    textAlign: 'center',
  },
  registerButton: {
    borderColor: '#ffffff33',
    backgroundColor: '#ffffff11',
    borderWidth: 1,
  },
  registerButtonText: {
    color: '#fefefe',
    fontWeight: 'bold',
  },
});
