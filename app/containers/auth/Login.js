import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView } from 'react-native';
import { View, Text } from 'react-native-animatable';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import TextInput from '../../components/CustomTextInput';
import Button from '../../components/Button';
import FacebookButton from '../../components/FacebookButton';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
  }

  async hideForm() {
    await Promise.all([
      this.formRef.fadeOut(200),
    ]);
  }

  facebookLogin(e) {
    this.setState({ isLoading: true });
    this.props.navigation.fbLogin(e.credentials.token)
    .then(() => this.formRef && this.setState({ isLoading: false }))
    .catch(() => this.formRef && this.setState({ isLoading: false }));
  }

  login() {
    this.setState({ isLoading: true });
    this.props.navigation.login(this.state.email, this.state.password)
    .then(() => this.formRef && this.setState({ isLoading: false }))
    .catch(() => {
      this.props.navigation.loginHiring(this.state.email, this.state.password)
      .then(() => this.formRef && this.setState({ isLoading: false }))
      .catch(() => {
        if (this.formRef) {
          this.setState({
            isLoading: false,
            errorMessage: 'The email or password you have entered is invalid',
          });
        }
      });
    });
  }

  render() {
    const { setVisibleForm } = this.props;
    const { email, password, isLoading, errorMessage } = this.state;
    const isValid = email !== '' && password !== '';

    return (
      <View
        animation="fadeIn"
        duration={400}
        style={styles.view}
        ref={ref => (this.formRef = ref)}
      >
        <ScrollView>
          <Text style={styles.header}>Login</Text>
          <View>
            <TextInput
              ref={ref => (this.emailInputRef = ref)}
              placeholder={'Email'}
              keyboardType={'email-address'}
              returnKeyType={'next'}
              blurOnSubmit={false}
              disabled={isLoading}
              onChangeText={value => this.setState({ email: value })}
              onSubmitEditing={() => this.passwordInputRef.focus()}
            />
            <TextInput
              ref={ref => (this.passwordInputRef = ref)}
              secureTextEntry
              placeholder={'Password'}
              keyboardType={'default'}
              returnKeyType={'done'}
              disabled={isLoading}
              onChangeText={value => this.setState({ password: value })}
            />
            { errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
            <View animation={'zoomIn'} duration={400} delay={200}>
              <Button
                buttonStyle={styles.loginButton}
                textStyle={styles.loginButtonText}
                isEnabled={isValid}
                isLoading={isLoading}
                disabled={isLoading}
                loadingText="Logging in..."
                text="Login"
                onPress={() => this.login()}
              />
              <View style={styles.separatorContainer}>
                <View style={styles.separatorLine} />
                <Text style={styles.separator}>OR</Text>
                <View style={styles.separatorLine} />
              </View>
              <FBLogin
                buttonView={<FacebookButton />}
                ref={(fbLogin) => { this.fbLogin = fbLogin; }}
                loginBehavior={FBLoginManager.LoginBehaviors.Native}
                permissions={['public_profile', 'email']}
                onLogin={e => this.facebookLogin(e)}
                onLoginNotFound={() => this.setState({ isLoading: false })}
                onCancel={() => this.setState({ isLoading: false })}
              />
              {/* <Button
                icon="google-plus"
                buttonStyle={styles.googleButton}
                textStyle={styles.loginButtonText}
                text="Login With Google+"
              /> */}
            </View>
            <Text
              style={styles.loginLink}
              animation={'fadeIn'}
              duration={400}
              delay={200}
              onPress={() => setVisibleForm('REGISTER')}
            >
              Belum punya akun? Register disini!
            </Text>
          </View>
        </ScrollView>
        <View style={styles.hiringLinkView}>
          <Text
            style={styles.hiringLink}
            animation={'fadeIn'}
            duration={400}
            delay={200}
            onPress={() => setVisibleForm('REGISTER_HIRING')}
          >
            Are you hiring? Klik disini!
          </Text>
        </View>
      </View>
    );
  }
}

Login.propTypes = {
  setVisibleForm: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flex: 1,
    marginHorizontal: 30,
    marginTop: 10,
  },
  header: {
    fontSize: 30,
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
  loginLink: {
    color: '#fefefe',
    alignSelf: 'center',
    marginTop: 5,
  },
  loginButton: {
    borderColor: '#ffffff33',
    backgroundColor: '#ffffff11',
    borderWidth: 1,
  },
  loginButtonText: {
    color: '#fefefe',
    fontWeight: 'bold',
  },
  facebookButton: {
    backgroundColor: '#3B5998',
    borderColor: '#ffffff33',
    borderWidth: 1,
  },
  googleButton: {
    backgroundColor: '#DB4437',
    borderColor: '#ffffff33',
    borderWidth: 1,
    marginTop: 5,
  },
  separatorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  separator: {
    color: '#fff',
    marginHorizontal: 8,
  },
  separatorLine: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: '#ffffff33',
  },
  hiringLinkView: {
    display: 'flex',
    flex: 1,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  hiringLink: {
    color: '#bebebe',
    alignSelf: 'flex-end',
    marginBottom: 5,
    textAlign: 'center',
    flex: 1,
  },
});
