import React, { Component } from 'react';
import { Text, View, StyleSheet, Switch, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import TextInputBar from '../components/CustomTextInput';
import Button from '../components/Button';
import defaultProfileImage from '../../resources/default-profile.png';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    const profile = this.props.screenProps.profile;
    this.state = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      contact: profile.contact,
      picture: profile.picture || defaultProfileImage,
      pictureChanged: false,
      experience: profile.experience,
      education: profile.education,
      isLoading: false,
    };
    console.tron.log(this.state);
  }

  submit() {
    const state = { ...this.state };
    if (!state.pictureChanged) delete state.picture;
    this.setState({ isLoading: true });
    console.tron.log(state);
    this.props.navigation.editProfile(state)
    .then(() => {
      this.props.navigation.getProfile();
      if (this.formRef) this.setState({ isLoading: false });
      this.props.navigation.back();
    })
    .catch(() => {
      if (this.formRef) {
        this.setState({
          isLoading: false,
        });
      }
    });
  }

  choosePicture() {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.images()],
    }, (error, url) => {
      if (url) {
        this.setState({ pictureChanged: true, picture: url });
      }
    });
  }

  render() {
    const { contact, firstName, lastName, experience, education, isLoading, picture } = this.state;
    const isValid = (firstName !== '') && (lastName !== '');

    return (
      <View style={styles.view}>
        <LinearGradient start={{ x: 0.5, y: 0.5 }} end={{ x: 0, y: 1 }} colors={['#005C97', '#363795']} style={styles.mainBackground}>
          <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.back()}>
            <Icon name="arrow-left" style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.header}>Edit Profile</Text>
        </LinearGradient>
        <ScrollView style={styles.infoContainer}>
          <TouchableOpacity style={styles.profilePictureView} onPress={() => this.choosePicture()}>
            <Image style={styles.profilePicture} source={picture} />
          </TouchableOpacity>
          <TextInputBar
            ref={ref => (this.firstName = ref)}
            placeholder={'First Name'}
            returnKeyType={'next'}
            blurOnSubmit={false}
            disabled={isLoading}
            value={firstName}
            onChangeText={value => this.setState({ firstName: value })}
            onSubmitEditing={() => this.lastName.focus()}
            dark
          />
          <TextInputBar
            ref={ref => (this.lastName = ref)}
            placeholder={'Last Name'}
            returnKeyType={'next'}
            blurOnSubmit={false}
            disabled={isLoading}
            value={lastName}
            onChangeText={value => this.setState({ lastName: value })}
            onSubmitEditing={() => this.contact.focus()}
            dark
          />
          <TextInputBar
            ref={ref => (this.contact = ref)}
            placeholder={'Phone'}
            returnKeyType={'next'}
            blurOnSubmit={false}
            disabled={isLoading}
            value={contact}
            onChangeText={value => this.setState({ contact: value })}
            onSubmitEditing={() => this.experience.focus()}
            dark
          />
          <Text style={styles.textInfo}>Job Experience</Text>
          <TextInput
            ref={ref => (this.experience = ref)}
            multiline
            placeholder={'Write your job experience here'}
            editable={!isLoading}
            numberOfLines={5}
            style={styles.input}
            value={experience}
            underlineColorAndroid={'transparent'}
            onChangeText={value => this.setState({ experience: value })}
          />
          <Text style={styles.textInfo}>Education</Text>
          <TextInput
            ref={ref => (this.education = ref)}
            multiline
            placeholder={'Write your education here'}
            editable={!isLoading}
            numberOfLines={5}
            style={styles.input}
            value={education}
            underlineColorAndroid={'transparent'}
            onChangeText={value => this.setState({ education: value })}
          />
          <View animation={'zoomIn'} duration={400} delay={200}>
            <Button
              buttonStyle={styles.changeButton}
              textStyle={styles.changeButtonText}
              isEnabled={isValid}
              isLoading={isLoading}
              disabled={isLoading}
              loadingText="Submitting..."
              text="Save"
              onPress={() => this.submit()}
            />
          </View>
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
  textInfo: {
    marginTop: 10,
  },
  infoContainer: {
    paddingHorizontal: 10,
  },
  mainBackground: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 5,
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
    marginTop: 15,
    borderRadius: 100,
    width: 96,
    height: 96,
    alignSelf: 'center',
  },
  profilePicture: {
    width: 96,
    height: 96,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#ccc',
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
  changeButton: {
    borderColor: '#ffffff33',
    backgroundColor: '#005C97DD',
    borderWidth: 1,
    marginVertical: 10,
  },
  changeButtonText: {
    color: '#fefefe',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 0,
    padding: 2,
    textAlignVertical: 'top',
  },
});
