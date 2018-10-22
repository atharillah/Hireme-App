import React, { Component } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, FlatList, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Button from '../../components/Button';

const jobCard = item => (
  <View style={styles.card}>
    <View style={styles.jobInfo}>
      <Text style={styles.jobName}>{item.field.name}</Text>
      <Text style={styles.location}>Deadline {moment(item.deadline).format('D MMMM YYYY')}</Text>
      <Text style={styles.jarak}>{item.applicants.length} Applicant{item.applicants.length > 1 ? 's' : ''}</Text>
    </View>
  </View>
);

export default class MainHiring extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentWillMount() {
    this.props.navigation.getJobHiring()
    .then(() => this.setState({ isLoading: false }))
    .catch(() => this.setState({ isLoading: false }));
  }

  render() {
    return (
      <View style={styles.view}>
        <StatusBar translucent backgroundColor="transparent" />
        <LinearGradient start={{ x: 0.5, y: 0.5 }} end={{ x: 0, y: 1 }} colors={['#005C97', '#363795']} style={styles.mainBackground}>
          <TouchableOpacity style={styles.add} onPress={() => this.props.navigation.openPage('PostJob')}>
            <Icon name="plus" style={styles.addIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.setting} onPress={() => this.props.navigation.openPage('Settings')}>
            <Icon name="settings" style={styles.settingIcon} />
          </TouchableOpacity>
          <Text style={styles.header}>Your Job Listing</Text>
        </LinearGradient>
        <ScrollView style={styles.infoContainer}>
          {this.state.isLoading && <ActivityIndicator color="#222" style={{ marginTop: 20 }} />}
          {this.props.screenProps.hiringJobs && <FlatList
            data={this.props.screenProps.hiringJobs}
            renderItem={({ item }) => jobCard(item)}
            keyExtractor={item => item._id}
          />}
          {this.props.screenProps.hiringJobs.length === 0 && !this.state.isLoading &&
            <Text style={styles.nojob}>You don{"'"}t have any job listed yet</Text>}
          <Button
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            text="Post A Job Listing"
            onPress={() => this.props.navigation.openPage('PostJob')}
          />
        </ScrollView>
      </View>
    );
  }
}

MainHiring.propTypes = {
  navigation: PropTypes.object.isRequired,
  screenProps: PropTypes.object.isRequired,
};

MainHiring.defaultValues = {
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
  nojob: {
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    borderColor: '#ffffff33',
    backgroundColor: '#005C97DD',
    borderWidth: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fefefe',
    fontWeight: 'bold',
  },
  mainBackground: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 5,
  },
  card: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  jobInfo: {
    flex: 1,
  },
  jobName: {
    fontSize: 18,
    color: '#222',
    fontWeight: 'bold',
  },
  add: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  addIcon: {
    color: '#fefefe',
    fontSize: 22,
  },
  setting: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  settingIcon: {
    color: '#fefefe',
    fontSize: 22,
  },
});
