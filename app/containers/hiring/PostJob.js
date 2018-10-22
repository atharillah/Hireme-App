import React, { Component } from 'react';
import {
  SectionList,
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  DatePickerAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView from 'react-native-maps';
import moment from 'moment';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Button from '../../components/Button';
import LoadingText from '../../components/LoadingText';
import CheckBox from '../../components/CheckBox';
import api from '../../lib/api';

export default class PostJob extends Component {
  constructor(props) {
    super(props);

    this.state = {
      padding: 21,
      notification: true,
      region: {
        latitude: -8.66086,
        longitude: 115.216,
        latitudeDelta: 0.0922 * 0.05,
        longitudeDelta: 0.0421 * 0.05,
      },
      fieldList: '',
      field: '',
      isLoading: false,
      salaryLow: 2000000,
      salaryHigh: 9000000,
      deadline: moment().add(1, 'months'),
      modalVisible: false,
      education: {
        sd: false,
        smp: false,
        sma: false,
        d3: false,
        s1: false,
        s2: false,
        s3: false,
      },
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => { // eslint-disable-line no-undef
      const { longitude, latitude } = position.coords;
      if (this.formRef) {
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0922 * 0.05,
            longitudeDelta: 0.0421 * 0.05,
          },
        });
      }
    }, (error) => {
      console.tron.log(error);
    });
    setTimeout(() => this.setState({ padding: 0 }), 100);
  }

  componentDidMount() {
    this.getField();
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  async getField() {
    api('get', '/fields', null)
    .then((res) => {
      if (res.data) {
        this.setState({ fieldList: res.data });
      }
    })
    .catch(e => console.tron.error(e));
  }

  async openDatePicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.state.deadline.toDate(),
        minDate: moment().add(1, 'days').toDate(),
        mode: 'calendar',
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({ deadline: moment({ year, month, day }) });
      }
    } catch ({ code, message }) {
      console.tron.warn({ code, message });
    }
  }

  submit() {
    const state = this.state;
    this.setState({ isLoading: true });
    this.props.navigation.createJob({
      field: { id: state.field.key, name: state.field.title },
      qualification: state.qualification,
      description: state.description,
      education: state.education,
      salaryLow: state.salaryLow,
      salaryHigh: state.salaryHigh,
      deadline: state.deadline.toDate(),
      location: [state.region.longitude, state.region.latitude],
      information: state.information,
    })
    .then(() => this.formRef && this.setState({ isLoading: false }))
    .catch(() => {
      if (this.formRef) {
        this.setState({
          isLoading: false,
        });
      }
    });
  }

  toggleEducation(obj) {
    const education = { ...this.state.education };
    education[obj] = !education[obj];
    return () => this.setState({ education });
  }

  render() {
    const { isLoading, fieldList, field, qualification, description } = this.state;
    const isValid = field !== ''
    && qualification !== ''
    && description !== '';

    return (
      <View style={styles.view} ref={ref => (this.formRef = ref)}>
        <Modal
          animationType={'slide'}
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <View style={styles.picker}>
            {fieldList !== '' &&
            <SectionList
              sections={fieldList}
              renderItem={({ item }) =>
                (<TouchableOpacity
                  style={styles.pickerItem}
                  onPress={() => {
                    this.setState({ field: item, modalVisible: false });
                  }}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>)
              }
              renderSectionHeader={({ section }) =>
                <Text style={styles.pickerHeader}>{section.name}</Text>
              }
            />}
          </View>
        </Modal>

        <LinearGradient start={{ x: 0.5, y: 0.5 }} end={{ x: 0, y: 1 }} colors={['#005C97', '#363795']} style={styles.mainBackground}>
          <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.back()}>
            <Icon name="arrow-left" style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.header}>Post New Job</Text>
        </LinearGradient>
        <ScrollView style={styles.container}>
          <View style={styles.mapContainer}>
            <MapView
              style={[styles.map, { marginTop: this.state.padding }]}
              region={this.state.region}
              onRegionChange={r => this.onRegionChange(r)}
              customMapStyle={mapStyle}
              showsUserLocation
              showsMyLocationButton
            />
            <Icon name="target" style={styles.target} />
            <Text style={styles.targetText}>Center the map for the location</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.title}>Field</Text>
            {fieldList === '' && <LoadingText text="Getting field list..." />}
            {fieldList !== '' &&
            <Button
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              text={field === '' ? 'Select Job Field' : field.name}
              onPress={() => this.setState({ modalVisible: true })}
            />
            }
            <Text style={styles.title}>Qualification</Text>
            <TextInput
              ref={ref => (this.requirement = ref)}
              multiline
              placeholder={'Write any requirements for the job here'}
              editable={!isLoading}
              numberOfLines={5}
              style={styles.input}
              underlineColorAndroid={'transparent'}
              onChangeText={value => this.setState({ qualification: value })}
            />
            <Text style={styles.title}>Job Description</Text>
            <TextInput
              ref={ref => (this.description = ref)}
              multiline
              placeholder={'Write job description here'}
              editable={!isLoading}
              numberOfLines={5}
              style={[styles.input, styles.marginBottom]}
              underlineColorAndroid={'transparent'}
              onChangeText={value => this.setState({ description: value })}
            />
            <CheckBox
              toggle={this.toggleEducation('sd')}
              checked={this.state.education.sd}
              text="SD"
            />
            <CheckBox
              toggle={this.toggleEducation('smp')}
              checked={this.state.education.smp}
              text="SMP"
            />
            <CheckBox
              toggle={this.toggleEducation('sma')}
              checked={this.state.education.sma}
              text="SMA"
            />
            <CheckBox
              toggle={this.toggleEducation('d3')}
              checked={this.state.education.d3}
              text="D3"
            />
            <CheckBox
              toggle={this.toggleEducation('s1')}
              checked={this.state.education.s1}
              text="Sarjana / S1"
            />
            <CheckBox
              toggle={this.toggleEducation('s2')}
              checked={this.state.education.s2}
              text="Magister / S2"
            />
            <CheckBox
              toggle={this.toggleEducation('s3')}
              checked={this.state.education.s3}
              text="Doktoral / S3"
            />
            <Text style={styles.title}>Salary Range</Text>
            <Text style={styles.salaryText}>{`${this.state.salaryLow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} - ${this.state.salaryHigh.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`}</Text>
            <MultiSlider
              min={100000}
              max={20000000}
              step={100000}
              sliderLength={Dimensions.get('window').width - 20}
              values={[this.state.salaryLow, this.state.salaryHigh]}
              containerStyle={{ height: 20, marginTop: 10 }}
              selectedStyle={{ backgroundColor: '#005C97' }}
              markerStyle={{ backgroundColor: '#005C97' }}
              onValuesChange={e => this.setState({ salaryLow: e[0], salaryHigh: e[1] })}
            />
            <Text style={styles.title}>Submission Deadline</Text>
            <Button
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              text={moment(this.state.deadline).format('D MMMM YYYY')}
              onPress={() => this.openDatePicker()}
            />
            <Text style={styles.title}>More Information</Text>
            <TextInput
              ref={ref => (this.information = ref)}
              multiline
              placeholder={'write any other information like website or contact person'}
              editable={!isLoading}
              numberOfLines={5}
              style={styles.input}
              underlineColorAndroid={'transparent'}
              onChangeText={value => this.setState({ information: value })}
            />
            <Button
              buttonStyle={styles.submitButton}
              textStyle={styles.submitButtonText}
              text="Submit"
              isLoading={isLoading}
              isEnabled={isValid}
              loadingText="Submitting..."
              onPress={() => this.submit()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

PostJob.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const mapStyle = [
  {
    featureType: 'poi.park',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
  },
  mainBackground: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 5,
  },
  header: {
    fontSize: 18,
    color: '#fefefe',
    marginBottom: 10,
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
  mapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  target: {
    fontSize: 40,
    right: 0,
    zIndex: 99,
  },
  targetText: {
    position: 'absolute',
    top: 5,
    left: 5,
    fontSize: 16,
    backgroundColor: '#ffffff99',
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
  dataContainer: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    marginTop: 10,
  },
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 0,
    padding: 2,
    textAlignVertical: 'top',
  },
  salarySlider: {
    marginBottom: -20,
    height: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  salaryText: {
    color: '#222',
    textAlign: 'center',
  },
  button: {
    borderColor: '#2223',
    backgroundColor: '#fff',
    borderWidth: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#333',
  },
  submitButton: {
    borderColor: '#ffffff33',
    backgroundColor: '#005C97DD',
    borderWidth: 1,
    marginVertical: 10,
  },
  submitButtonText: {
    color: '#fefefe',
    fontWeight: 'bold',
  },
  marginBottom: {
    marginBottom: 10,
  },
});
