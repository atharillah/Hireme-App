import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, StatusBar, TouchableHighlight } from 'react-native';
import MapView from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SideBar from './SideBar';
import * as client from '../models/client';
import api from '../lib/api';

export default class MainMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      watchId: -1,
      padding: 21,
      region: {
        latitude: -7.953778,
        longitude: 112.614719,
        latitudeDelta: 0.0922 * 0.05,
        longitudeDelta: 0.0421 * 0.05,
      },
      userLoc: {
        latitude: -7.953778,
        longitude: 112.614719,
        latitudeDelta: 0.0922 * 0.05,
        longitudeDelta: 0.0421 * 0.05,
      },
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => { // eslint-disable-line no-undef
      const { longitude, latitude } = position.coords;
      this.setState({
        userLoc: {
          latitude,
          longitude,
          latitudeDelta: 0.0922 * 0.05,
          longitudeDelta: 0.0421 * 0.05,
        },
      });
      this.props.navigation.getJobMarker({ longitude, latitude });
    }, (error) => {
      console.tron.log(error);
    }, {
      enableHighAccuracy: true,
      timeout: 7500,
      // maximumAge: 1000,
    });
    setTimeout(() => this.setState({ padding: 0 }), 100);
  }

  onRegionChange(region) {
    this.setState({ region });
    this.props.navigation.getJobMarker(region);
  }

  refreshPosition() {
    navigator.geolocation.getCurrentPosition((position) => { // eslint-disable-line no-undef
      const { longitude, latitude } = position.coords;
      this.setState({
        region: {
          latitude,
          longitude,
          latitudeDelta: 0.0922 * 0.05,
          longitudeDelta: 0.0421 * 0.05,
        },
        userLoc: {
          latitude,
          longitude,
          latitudeDelta: 0.0922 * 0.05,
          longitudeDelta: 0.0421 * 0.05,
        },
      });
      this.props.navigation.getJobMarker({ longitude, latitude });
    }, (error) => {
      console.tron.log(error);
    },
      {
        enableHighAccuracy: true,
        timeout: 7500,
        // maximumAge: 1000,
      },
    );
  }

  toggleSideBar(open) {
    if (open) {
      this.drawer.open();
    } else {
      this.drawer.close();
    }
  }

  openJobDetail(e, marker) {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    this.setState({
      region: {
        longitude,
        latitude,
        latitudeDelta: 0.0922 * 0.05,
        longitudeDelta: 0.0421 * 0.05,
      },
    });
    this.props.navigation.openPage('Job', marker);
  }

  render() {
    return (
      <Drawer
        elevation={8}
        ref={ref => (this.drawer = ref)}
        content={<SideBar toggleSideBar={() => this.toggleSideBar(false)} {...this.props} />}
        type="overlay"
        openDrawerOffset={0.3}
        tapToClose
        tweenDuration={150}
        tweenEasing="easeInSine"
      >
        <View style={[styles.screen, { paddingTop: this.state.padding }]}>
          <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.2)" />
          <MapView
            style={styles.map}
            region={this.state.region}
            onRegionChangeComplete={r => this.onRegionChange(r)}
            customMapStyle={mapStyle}
            showsUserLocation
            showsMyLocationButton={false}
          >
            {
              this.props.screenProps.jobMarkers.map(marker => (
                <MapView.Marker
                  title={marker.field.name}
                  description={marker.company.name}
                  key={marker._id}
                  pinColor="#005C97"
                  coordinate={{ latitude: marker.location[1], longitude: marker.location[0] }}
                  onPress={e => this.openJobDetail(e, marker)}
                />),
              )
            }
          </MapView>
          <TouchableHighlight
            underlayColor="rgba(255, 255, 255, 0.7)"
            style={styles.menuButton}
            onPress={() => this.toggleSideBar(true)}
          >
            <Icon name="menu" style={styles.menuButtonIcon} />
          </TouchableHighlight>
          <ActionButton
            buttonColor="#005C97"
            bgColor="rgba(0,0,0,0.5)"
            fixNativeFeedbackRadius
            hideShadow
          >
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="Nearest Job List"
              fixNativeFeedbackRadius
              hideShadow
              onPress={() => this.props.navigation.openPage('ListJob', this.state.userLoc)}
            >
              <Icon name="format-list-bulleted-type" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#3498db"
              title="Search Filter"
              fixNativeFeedbackRadius
              hideShadow
              onPress={() => this.props.navigation.openPage('Filter')}
            >
              <Icon name="magnify" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#1abc9c"
              title="Refresh Position"
              fixNativeFeedbackRadius
              hideShadow
              onPress={() => this.refreshPosition()}
            >
              <Icon name="map-marker" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </View>
      </Drawer>
    );
  }
}

MainMap.propTypes = {
  navigation: PropTypes.object.isRequired,
  screenProps: PropTypes.object.isRequired,
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
  screen: {
    flex: 1,
  },
  map: {
    flex: 1,
    zIndex: -1,
  },
  menuButton: {
    position: 'absolute',
    top: 30,
    left: 0,
    paddingLeft: 10,
    paddingRight: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  menuButtonIcon: {
    fontSize: 36,
    height: 38,
    color: '#555',
  },
  actionButton: {
    ...StyleSheet.absoluteFillObject,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
