import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class CheckBox extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.toggle(this.props.checked)}>
        <View style={styles.view}>
          {this.props.checked ?
            <Icon name="checkbox-marked-outline" style={styles.icon} /> :
            <Icon name="checkbox-blank-outline" style={styles.icon} />
          }
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    paddingVertical: 2,
  },
  icon: {
    fontSize: 20,
    color: '#000000',
    marginRight: 5,
  },
  text: {
    top: 1,
  },
});

export default CheckBox;
