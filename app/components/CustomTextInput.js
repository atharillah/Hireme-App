import React, { Component } from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';
import { View } from 'react-native-animatable';
import PropTypes from 'prop-types';

const IS_ANDROID = Platform.OS === 'android';

export default class CustomTextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
    };
  }

  focus() {
    this.textInputRef.focus();
  }

  render() {
    const { multiline, dark, isEnabled, ...otherProps } = this.props;
    const { isFocused } = this.state;
    const mainColor = dark ? '#222' : 'white';
    const secondaryColor = dark ? '#2228' : 'rgba(255,255,255,0.4)';
    const color = isEnabled ? mainColor : secondaryColor;
    const borderColor = isFocused ? mainColor : secondaryColor;
    return (
      <View style={styles.container}>
        <View style={[styles.textInputWrapper, { borderColor }]}>
          <TextInput
            ref={ref => (this.textInputRef = ref)}
            editable={isEnabled}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={[(multiline ? styles.textInputWrapperMultiline : styles.textInput), { color }]}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={secondaryColor}
            onFocus={() => this.setState({ isFocused: true })}
            onBlur={() => this.setState({ isFocused: false })}
            {...otherProps}
          />
        </View>
      </View>
    );
  }
}

CustomTextInput.propTypes = {
  isEnabled: PropTypes.bool,
  dark: PropTypes.bool,
};

CustomTextInput.defaultProps = {
  isEnabled: true,
  dark: false,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    marginBottom: 10,
  },
  textInputWrapper: {
    height: 42,
    marginBottom: 2,
    borderBottomWidth: 1,
  },
  textInputWrapperMultiline: {
    height: 'auto',
    marginBottom: 2,
    borderBottomWidth: 1,
  },
  textInput: {
    flex: 1,
    margin: IS_ANDROID ? -1 : 0,
    height: 42,
    padding: 7,
  },
});
