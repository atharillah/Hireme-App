import React, { Component } from 'react';
import { StatusBar, StyleSheet, AsyncStorage } from 'react-native';
import { View, Image, Text } from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import TypeSelector from './auth/TypeSelector';
import logo from '../../resources/logo.png';
import firstInstallMessage from '../../resources/firstInstall';
import Button from '../components/Button';

export default class FirstInstall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstLaunch: null,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('firstLaunch').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('firstLaunch', 'false').catch((err) => { console.log(err); });
        this.setState({ firstLaunch: true });
      } else {
        this.setState({ firstLaunch: false });
      }
    }).catch(() => {
      this.setState({ firstLaunch: null });
    });
  }

  render() {
    if (this.state.firstLaunch) {
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
          <View
            animation={'fadeIn'}
            duration={400}
            delay={200}
            style={styles.container}
          >
            {this.state.firstLaunch &&
              <Text style={styles.text}>
                {firstInstallMessage.text}{'\n\n'}
                <Text style={styles.bold}>{firstInstallMessage.slogan}</Text>
              </Text>}
            <Button
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              text="OK"
              onPress={() => this.setState({ firstLaunch: false })}
            />
          </View>
        </LinearGradient>
      );
    } else if (!this.state.firstLaunch) {
      return <TypeSelector {...this.props} />;
    }

    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
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
  text: {
    marginVertical: 30,
    fontSize: 16,
    color: '#fefefe',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    borderColor: '#ffffff33',
    backgroundColor: '#ffffff11',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fefefe',
    fontWeight: 'bold',
  },
});
