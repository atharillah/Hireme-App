import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native-animatable';

import TouchableView from './TouchableView';

const Button = (
  { icon, rippleColor, onPress, isEnabled, loadingText,
    isLoading, text, buttonStyle, textStyle, ...otherProps }) => {
  const onButtonPress = isEnabled && !isLoading ? onPress : () => null;

  return (
    <View {...otherProps}>
      <TouchableView
        rippleColor={rippleColor}
        onPress={onButtonPress}
        style={[styles.button, buttonStyle]}
      >
        {(icon) && <Icon style={styles.icon} name={icon} size={30} color="#fff" />}
        {(isLoading) &&
          <View style={styles.loadingWrapper}>
            <View style={styles.loading}>
              <ActivityIndicator style={styles.spinner} color="#fff" />
              <Text style={styles.loadingText}>{loadingText}</Text>
            </View>
          </View>}
        {(!isLoading) && <Text style={[styles.text, textStyle]}>{text}</Text>}
      </TouchableView>
    </View>
  );
};

Button.propTypes = {
  icon: PropTypes.string,
  onPress: PropTypes.func,
  isEnabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  buttonStyle: PropTypes.any,
  textStyle: PropTypes.any,
  rippleColor: PropTypes.string,
  loadingText: PropTypes.string,
};

Button.defaultProps = {
  loadingText: 'Loading...',
  icon: null,
  onPress: () => null,
  isEnabled: true,
  isLoading: false,
  buttonStyle: {},
  textStyle: {},
  rippleColor: '#fff',
};

const styles = StyleSheet.create({
  button: {
    height: 42,
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: 'stretch',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
  spinner: {
    marginRight: 5,
    alignSelf: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: '400',
    color: 'white',
    flex: 1,
  },
  loadingWrapper: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
  },
  loading: {
    flexDirection: 'row',
  },
  loadingText: {
    textAlign: 'left',
    fontWeight: '400',
    color: 'white',
  },
});

export default Button;
