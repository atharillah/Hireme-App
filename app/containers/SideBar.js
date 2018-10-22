import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import header from '../../resources/sidebarHeader.jpg';
import profile from '../../resources/default-profile.png';
import SideBarOption from '../components/SideBarOption';

export default class MainMap extends Component {
  showProfilePage() {
    this.props.navigation.profile();
  }

  render() {
    return (
      <View style={styles.screen}>
        {/* <TouchableHighlight
          underlayColor="transparent"
          style={styles.menuButton}
          onPress={() => this.props.toggleSideBar()}
        >
          <Icon name="menu" style={styles.menuButtonIcon} />
        </TouchableHighlight> */}
        <View style={styles.headerView}>
          <Image source={header} style={styles.headerImage} />
          <View style={styles.headerTextView}>
            <Text style={styles.headerText}>{this.props.screenProps.profile.firstName} {this.props.screenProps.profile.lastName}</Text>
          </View>
        </View>
        <View style={styles.profileImageView}>
          {console.tron.log(this.props.screenProps.profile.picture || profile)}
          <Image source={this.props.screenProps.profile.picture || profile} style={styles.profileImage} />
        </View>
        <View style={styles.subHeaderTextView}>
          {/* <Text style={styles.subHeaderText}>Malang, Indonesia</Text> */}
        </View>
        <ScrollView style={styles.menu}>
          <SideBarOption text="Profile" icon="account" onPress={() => this.showProfilePage()} />
          <SideBarOption text="Applied Jobs" icon="note-multiple" onPress={() => this.props.navigation.openPage('ListJobApplied')} />
          {/* <SideBarOption text="Messages" icon="message" /> */}
          {/* <SideBarOption text="History" icon="history" /> */}
          <View style={styles.separator} />
          <SideBarOption text="Contact & Support" icon="headset" onPress={() => this.props.navigation.openPage('Contact')} />
          <SideBarOption text="Help & FAQ" icon="help-circle" onPress={() => this.props.navigation.openPage('Faq')} />
          <SideBarOption text="Setting" icon="settings" onPress={() => this.props.navigation.settings()} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
  },
  headerView: {
    height: 130,
    display: 'flex',
    flexDirection: 'row',
  },
  headerImage: {
    height: 130,
    resizeMode: 'cover',
    flex: 1,
  },
  headerTextView: {
    position: 'absolute',
    left: 96,
    bottom: 0,
    paddingLeft: 30,
    paddingRight: 10,
    width: (Dimensions.get('window').width * 0.7) - 96,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
  },
  subHeaderTextView: {
    left: 92,
    top: 0,
    paddingLeft: 30,
    paddingRight: 10,
    width: (Dimensions.get('window').width * 0.7) - 96,
  },
  subHeaderText: {
    color: '#666',
    fontSize: 14,
  },
  profileImageView: {
    elevation: 4,
    position: 'absolute',
    top: 80,
    backgroundColor: 'white',
    borderRadius: 100,
    left: 20,
  },
  profileImage: {
    height: 96,
    width: 96,
    borderRadius: 100,
  },
  menuButton: {
    position: 'absolute',
    top: 30,
    right: 0,
    paddingRight: 5,
    zIndex: 999,
  },
  menuButtonIcon: {
    fontSize: 36,
    height: 38,
    color: '#fff',
  },
  menu: {
    paddingTop: 45,
  },
  separator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
});
