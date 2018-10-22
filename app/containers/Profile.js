import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import profile from '../../resources/default-profile.png';

const renderRow = ({ item }) => (
  <View style={{ flexDirection: 'row' }}>
    <Icon name="circle" style={{ marginTop: 5, fontSize: 12 }} />
    <Text key={item.key} style={[styles.data, { paddingLeft: 5 }]}>{item.key}</Text>
  </View>
);

const Profile = props => (
  <View style={styles.view}>
    <LinearGradient start={{ x: 0.5, y: 0.5 }} end={{ x: 0, y: 1 }} colors={['#005C97', '#363795']} style={styles.mainBackground}>
      <TouchableOpacity style={styles.back} onPress={() => props.navigation.back()}>
        <Icon name="arrow-left" style={styles.backIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.edit} onPress={() => props.navigation.openPage('EditProfile')}>
        <Icon name="pencil" style={styles.editIcon} />
      </TouchableOpacity>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.profilePictureView}>
        <Image style={styles.profilePicture} source={props.screenProps.profile.picture || profile} />
      </View>
      <Text style={styles.name}>{props.screenProps.profile.firstName} {props.screenProps.profile.lastName}</Text>
    </LinearGradient>
    <ScrollView style={styles.infoContainer}>
      <Text style={styles.title}>Email</Text>
      <Text style={styles.data}>{props.screenProps.profile.email}</Text>
      <Text style={styles.title}>Phone</Text>
      <Text style={styles.data}>{props.screenProps.profile.contact}</Text>
      <Text style={styles.title}>Education</Text>
      {console.tron.log(props.screenProps.profile)}
      <FlatList
        data={props.screenProps.profile.education.split('\n').map(x => ({ key: x }))}
        renderItem={renderRow}
      />
      <Text style={styles.title}>Experience</Text>
      <FlatList
        data={props.screenProps.profile.experience.split('\n').map(x => ({ key: x }))}
        renderItem={renderRow}
      />
    </ScrollView>
  </View>
);

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
    paddingBottom: 20,
    marginBottom: 5,
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

export default Profile;
