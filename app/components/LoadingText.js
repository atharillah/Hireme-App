import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { View } from 'react-native-animatable';

const LoadingText = (
  { text, ...otherProps }) => (
    <View {...otherProps}>
      <View style={styles.loadingWrapper}>
        <View style={styles.loading}>
          <ActivityIndicator style={styles.spinner} color="#222" />
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </View>
  );

LoadingText.propTypes = {
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  spinner: {
    marginRight: 5,
  },
  text: {
    fontWeight: '400',
    color: '#222',
    flex: 1,
  },
  loadingWrapper: {
    flex: 1,
  },
  loading: {
    flexDirection: 'row',
  },
});

export default LoadingText;
