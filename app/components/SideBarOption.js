import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SideBarOptions = ({ icon, text, ...props }) => (
  <TouchableOpacity {...props}>
    <View style={styles.view}>
      <Icon name={icon} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableOpacity>
);

SideBarOptions.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginVertical: 10,
  },
  icon: {
    fontSize: 20,
    color: '#666',
    marginRight: 25,
  },
  text: {
    color: '#222',
    fontSize: 16,
  },
});

export default SideBarOptions;
