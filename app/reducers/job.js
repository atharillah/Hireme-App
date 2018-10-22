import _ from 'lodash';
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import config from '../../config.json';

export const jobMarkers = createReducer([], {
  [types.SET_JOB_MARKER](state, action) {
    return _.unionBy(action.markers, state, '_id');
  },
});

export const profile = createReducer({}, {
  [types.PROFILE](state, action) {
    const profileData = action.profile;
    if (profile.picture !== undefined) {
      profileData.picture = { uri: `${config.host}public/profiles/${action.profile.picture}` };
    }
    return profileData;
  },
});
