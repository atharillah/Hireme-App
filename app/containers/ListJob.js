import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import haversine from 'haversine';

const jobCard = (press, item, latitude, longitude) => {
  const jarak = haversine(
    { latitude: item.location[1], longitude: item.location[0] },
    { latitude, longitude },
    { unit: 'meter' });

  return (
    <TouchableOpacity onPress={press}>
      <View style={styles.card}>
        <View style={styles.jobInfo}>
          <Text style={styles.jobName}>{item.field.name}</Text>
          <Text style={styles.company}>{item.company.name}</Text>
          <Text style={styles.jarak}>{jarak.toFixed(0)} meter</Text>
        </View>
        {/* <Image style={styles.companyPicture} resizeMode="contain" source={item.pic} /> */}
      </View>
    </TouchableOpacity>
  );
};

const ListJob = (props) => {
  const { latitude, longitude } = props.navigation.state.params;

  return (
    <View style={styles.view}>
      <LinearGradient start={{ x: 0.5, y: 0.5 }} end={{ x: 0, y: 1 }} colors={['#005C97', '#363795']} style={styles.mainBackground}>
        <TouchableOpacity style={styles.back} onPress={() => props.navigation.back()}>
          <Icon name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.header}>Nearest Job List</Text>
      </LinearGradient>
      <ScrollView style={styles.infoContainer}>
        <FlatList
          data={props.screenProps.jobMarkers}
          renderItem={({ item }) => jobCard(() => props.navigation.openPage('Job', item), item, latitude, longitude)}
          keyExtractor={item => item._id}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    color: '#fefefe',
    marginBottom: 10,
  },
  infoContainer: {
  },
  mainBackground: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 5,
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
  card: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  companyPicture: {
    width: 64,
    height: 64,
  },
  jobInfo: {
    flex: 1,
  },
  jobName: {
    fontSize: 18,
    color: '#222',
    fontWeight: 'bold',
  },
  company: {
    fontSize: 16,
  },
  location: {
    fontSize: 16,
  },
  jarak: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
});

export default ListJob;
