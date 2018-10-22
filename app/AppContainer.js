import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { ActionCreators } from './actions';
import Splash from './containers/Splash';
import FirstInstall from './containers/FirstInstall';
import MainMap from './containers/MainMap';
import Profile from './containers/Profile';
import Job from './containers/Job';
import Settings from './containers/Settings';
import ListJob from './containers/ListJob';
import MainHiring from './containers/hiring/MainHiring';
import PostJob from './containers/hiring/PostJob';
import Faq from './containers/Faq';
import Contact from './containers/Contact';
import Filter from './containers/Filter';
import ChangePassword from './containers/ChangePassword';
import EditProfile from './containers/EditProfile';
import ListJobApplied from './containers/ListJobApplied';

export const AppNavigator = StackNavigator(
  {
    Splash: { screen: Splash },
    Login: { screen: FirstInstall },
    Main: { screen: MainMap },
    Profile: { screen: Profile },
    Job: { screen: Job },
    Settings: { screen: Settings },
    ListJob: { screen: ListJob },
    MainHiring: { screen: MainHiring },
    PostJob: { screen: PostJob },
    Faq: { screen: Faq },
    Contact: { screen: Contact },
    Filter: { screen: Filter },
    ChangePassword: { screen: ChangePassword },
    EditProfile: { screen: EditProfile },
    ListJobApplied: { screen: ListJobApplied },
  },
  {
    headerMode: 'none',
  },
);

class AppContainer extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index == 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    return (
      <AppNavigator
        navigation={
          addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav,
            ...bindActionCreators(ActionCreators, this.props.dispatch),
          })
        }
        screenProps={this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  visibleAuthForm: state.visibleAuthForm,
  hiringJobs: state.hiringJobs,
  jobMarkers: state.jobMarkers,
  profile: state.profile,
});

export default connect(mapStateToProps)(AppContainer);
