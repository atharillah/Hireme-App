import React, { Component } from 'react';
import { Text, View, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInput from '../components/CustomTextInput';
import Button from '../components/Button';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      passwordVerify: '',
      isLoading: false,
    };
  }

  changePassword() {
    const state = this.state;
    this.setState({ isLoading: true });
    this.props.navigation.changePassword(state.password)
    .then(() => this.formRef && this.setState({ isLoading: false }))
    .catch(() => {
      if (this.formRef) {
        this.setState({
          isLoading: false,
        });
      }
    });
  }

  render() {
    const { password, passwordVerify, isLoading } = this.state;
    const isValid = (password !== '') && (password === passwordVerify);

    return (
      <View style={styles.view}>
        <LinearGradient start={{ x: 0.5, y: 0.5 }} end={{ x: 0, y: 1 }} colors={['#005C97', '#363795']} style={styles.mainBackground}>
          <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.back()}>
            <Icon name="arrow-left" style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.header}>Change Password</Text>
        </LinearGradient>
        <ScrollView style={styles.infoContainer}>
          <TextInput
            ref={ref => (this.emailInputRef = ref)}
            placeholder={'Password'}
            returnKeyType={'next'}
            blurOnSubmit={false}
            disabled={isLoading}
            secureTextEntry
            onChangeText={value => this.setState({ password: value })}
            onSubmitEditing={() => this.passwordInputRef.focus()}
            dark
          />
          <TextInput
            ref={ref => (this.passwordInputRef = ref)}
            secureTextEntry
            placeholder={'Verify Password'}
            returnKeyType={'done'}
            disabled={isLoading}
            onChangeText={value => this.setState({ passwordVerify: value })}
            dark
          />
          <View animation={'zoomIn'} duration={400} delay={200}>
            <Button
              buttonStyle={styles.changeButton}
              textStyle={styles.changeButtonText}
              isEnabled={isValid}
              isLoading={isLoading}
              disabled={isLoading}
              loadingText="Submitting..."
              text="Change Password"
              onPress={() => this.changePassword()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infoContainer: {
    paddingHorizontal: 30,
  },
  mainBackground: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 5,
    marginBottom: 5,
  },
  option: {
    flexDirection: 'row',
  },
  optionDesc: {
    justifyContent: 'center',
  },
  optionInfo: {
    fontSize: 12,
    color: '#666',
  },
  switch: {
    alignSelf: 'flex-end',
    flex: 1,
  },
  header: {
    fontSize: 18,
    color: '#fefefe',
    marginBottom: 10,
  },
  name: {
    color: '#fefefe',
    marginTop: 10,
    fontSize: 22,
  },
  ttl: {
    color: '#ddd',
  },
  profilePictureView: {
    backgroundColor: '#fff',
    borderRadius: 100,
    width: 96,
    height: 96,
  },
  profilePicture: {
    width: 96,
    height: 96,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
  },
  title: {
    color: '#005C97',
    marginTop: 15,
  },
  data: {
    color: '#222',
    fontSize: 16,
  },
  back: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backIcon: {
    color: '#fefefe',
    fontSize: 22,
  },
  edit: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  editIcon: {
    color: '#fefefe',
    fontSize: 22,
  },
  changeButton: {
    borderColor: '#ffffff33',
    backgroundColor: '#005C97DD',
    borderWidth: 1,
    marginVertical: 10,
  },
  changeButtonText: {
    color: '#fefefe',
    fontWeight: 'bold',
  },
});
