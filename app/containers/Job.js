import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Button from '../components/Button';

// const renderRow = ({ item }) => (
//   <View style={{ flexDirection: 'row' }}>
//     <Icon name="circle" style={{ marginTop: 5, fontSize: 12 }} />
//     <Text key={item.key} style={[styles.data, { paddingLeft: 5 }]}>{item.name}</Text>
//   </View>
// );

export default class Job extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  apply(id) {
    console.tron.log(id);
    Alert.alert(
      'Apply for this job?',
      'Make sure you have updated your profile',
      [
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
        {
          text: 'OK',
          onPress: () => this.applying(id),
        },
      ],
    );
  }

  applying(id) {
    this.setState({ isLoading: true });
    this.props.navigation.applyJob(id)
    .then(() => this.setState({ isLoading: false }))
    .catch(() => this.setState({ isLoading: false }));
  }

  render() {
    const item = this.props.navigation.state.params;
    const { isLoading } = this.state;

    return (
      <View style={styles.view}>
        <LinearGradient start={{ x: 0.5, y: 0.5 }} end={{ x: 0, y: 1 }} colors={['#005C97', '#363795']} style={styles.mainBackground}>
          <Text style={styles.name}>{item.company.name}</Text>
          {/* <Text style={styles.ttl}>Malang, Indonesia</Text> */}
          <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.back()}>
            <Icon name="arrow-left" style={styles.backIcon} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.star} onPress={() => props.navigation.star()}>
          <Icon name="star-outline" style={styles.starIcon} />
        </TouchableOpacity> */}
        </LinearGradient>
        <ScrollView style={styles.infoContainer}>
          <Text style={styles.title}>Field</Text>
          <Text style={styles.data}>{item.field.name}</Text>
          <Text style={styles.title}>Qualification</Text>
          <Text style={styles.data}>{item.qualification}</Text>
          <Text style={styles.title}>Job Description</Text>
          <Text style={styles.data}>{item.description}</Text>
          <Text style={styles.title}>Salary Range</Text>
          <Text style={styles.data}>Rp {item.salaryLow} - Rp {item.salaryHigh}</Text>
          <Text style={styles.title}>Submission Deadline</Text>
          <Text style={styles.data}>{moment(item.deadline).format('D MMMM YYYY')}</Text>
          <Text style={styles.title}>More Information</Text>
          <Text style={styles.data}>{item.information}</Text>
          {item.applied ?
            <Text>You have already applied for this job</Text> :
            <Button
              buttonStyle={styles.applyButton}
              textStyle={styles.applyButtonText}
              text="Apply"
              loadingText="Applying..."
              isLoading={isLoading}
              onPress={() => this.apply(item.id)}
            />}
        </ScrollView>
      </View>
    );
  }
}

Job.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infoContainer: {
    paddingHorizontal: 30,
  },
  headerPicture: {
    flexDirection: 'row',
    marginTop: 40,
  },
  mainBackground: {
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 15,
    marginBottom: 5,
  },
  header: {
    fontSize: 18,
    color: '#fefefe',
    marginBottom: 10,
  },
  name: {
    color: '#fff',
    marginTop: 10,
    fontSize: 24,
  },
  ttl: {
    color: '#eee',
  },
  corporateInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
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
  star: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  starIcon: {
    color: '#fefefe',
    fontSize: 22,
  },
  applyButton: {
    marginTop: 10,
    backgroundColor: '#005C97',
    marginBottom: 10,
  },
  applyButtonText: {
    color: '#fff',
  },
});
