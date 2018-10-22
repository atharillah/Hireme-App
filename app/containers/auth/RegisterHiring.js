import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView } from 'react-native';
import { View, Text } from 'react-native-animatable';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import TextInput from '../../components/CustomTextInput';
import Button from '../../components/Button';

export default class RegisterHiring extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordVerify: '',
      error: {},
      isLoading: false,
      identity: '',
    };
  }

  async hideForm() {
    await Promise.all([
      this.formRef.fadeOut(200),
    ]);
  }

  chooseIdentity() {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.images()],
    }, (error, url) => {
      if (url) {
        this.setState({ identity: url });
      }
    });
  }

  register() {
    if (this.state.password !== this.state.passwordVerify) {
      this.setState({ error: { password: 'Password does not match the confirm password!' } });
      return;
    }

    this.setState({ error: {}, isLoading: true });

    this.props.navigation.registerHiring({ ...this.state })
      .then(() => {
        this.setState({
          // message: 'A verification email has been sent to your email address. Please follow the instruction on the email to continue.',
          message: 'Registration success, you can login now',
          isLoading: false,
        });
      })
      .catch(({ response }) => {
        const err = response.data.error.details.codes;
        console.tron.error(err);

        this.setState({
          error: {
            name: err.name && err.name.includes('presence') ? 'Last name cannot be blank' : null,
            email: err.email && err.email.includes('custom.email') ? 'Email is invalid' : // eslint-disable-line no-nested-ternary
              err.email.includes('uniqueness') ? 'Email already registered' : null,
            password: response.data.error.details.code === 'INVALID_PASSWORD' ? 'Password is invalid' : null,
          },
          isLoading: false,
        });
      });
  }

  render() {
    const { onLoginLinkPress } = this.props;
    const { name, email, password, identity, message, isLoading, error } = this.state;
    const isValid = name !== ''
      && email !== ''
      && password !== ''
      && identity !== '';
    return (
      <View
        animation="fadeIn"
        duration={400}
        style={styles.view}
        ref={ref => (this.formRef = ref)}
      >
        <ScrollView>
          <Text style={styles.subHeader}>I{"'"}m Hiring</Text>
          <Text style={styles.header}>Register</Text>
          <View>
            <TextInput
              ref={ref => (this.namaDepanInputRef = ref)}
              placeholder={'Nama Institusi'}
              autoCapitalize="words"
              returnKeyType={'next'}
              blurOnSubmit={false}
              disabled={isLoading}
              onChangeText={text => this.setState({ name: text })}
              onSubmitEditing={() => this.emailInputRef.focus()}
            />
            {error.name && <Text style={styles.errorMessage}>{error.name}</Text>}
            <TextInput
              ref={ref => (this.emailInputRef = ref)}
              placeholder={'Email institusi'}
              keyboardType={'email-address'}
              returnKeyType={'next'}
              blurOnSubmit={false}
              disabled={isLoading}
              onChangeText={text => this.setState({ email: text })}
              onSubmitEditing={() => this.passwordInputRef.focus()}
            />
            {error.email && <Text style={styles.errorMessage}>{error.email}</Text>}
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
            {error.password && <Text style={styles.errorMessage}>{error.password}</Text>}
            <Button
              buttonStyle={styles.identityButton}
              textStyle={styles.identityButtonText}
              isEnabled={!isLoading}
              text={identity === '' ? 'Pilih file/gambar identitas anda' : identity.fileName}
              onPress={() => this.chooseIdentity()}
            />
            {error.picture && <Text style={styles.errorMessage}>{error.picture}</Text>}
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

RegisterHiring.propTypes = {
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
  messageText: {
    color: '#fefefe',
    alignSelf: 'center',
    marginBottom: 5,
    textAlign: 'center',
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
  loginLink: {
    color: '#fefefe',
    alignSelf: 'center',
    marginTop: 5,
  },
  identityButton: {
    borderColor: '#ffffff33',
    backgroundColor: '#ffffff99',
    borderWidth: 1,
    marginBottom: 10,
  },
  identityButtonText: {
    color: '#222',
    fontWeight: 'bold',
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
