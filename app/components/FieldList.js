import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

class FieldList extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity
        style={styles.pickerItem}
        onPress={() => {
          this.props.setState({ field: this.props.item, modalVisible: false });
        }}
      >
        <Text>{this.props.item.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    margin: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  pickerHeader: {
    fontWeight: 'bold',
    borderBottomColor: '#222',
    borderBottomWidth: StyleSheet.hairlineWidth,
    color: '#222',
    paddingVertical: 5,
  },
  pickerItem: {
    borderBottomColor: '#222',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 5,
  },
});

export default FieldList;
