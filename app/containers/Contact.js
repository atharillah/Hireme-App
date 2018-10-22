import React, { Component } from 'react';
import { Text, View, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notification: true,
    };
  }

  render() {
    return (
      <View style={styles.view}>
        <LinearGradient start={{ x: 0.5, y: 0.5 }} end={{ x: 0, y: 1 }} colors={['#005C97', '#363795']} style={styles.mainBackground}>
          <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.back()}>
            <Icon name="arrow-left" style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.header}>Contact & Support</Text>
        </LinearGradient>
        <ScrollView style={styles.infoContainer}>
          <Text style={styles.question}>Alamat</Text>
          <Text style={styles.answer}>Jl. Veteran No.8, Fakultas Ilmu Komputer, Universitas Brawijaya, Malang, Indonesia (65145)</Text>
          <Text style={styles.question}>E-mail</Text>
          <Text style={styles.answer}>hireme.contact@gmail.com</Text>
          <Text style={styles.question}>Sms / Whatsapp</Text>
          <Text style={styles.answer}>+6281993287254 (Alifka)</Text>
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
  question: {
    fontWeight: 'bold',
    marginTop: 5,
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
});
