import { NavigationActions } from 'react-navigation';
import api from '../lib/api';
import * as types from './types';

export const getProfile = () =>
  (dispatch, getState) => (
    api('get',
      '/client/me',
      null,
      { Authorization: `Bearer ${getState().token}` })
      .then((res) => {
        if (res.data) {
          dispatch(setProfile(res.data));
        }
      })
  );

export function setProfile(data) {
  return {
    type: types.PROFILE,
    profile: data,
  };
}

export const getJobMarker = ({ latitude, longitude }) =>
  (dispatch, getState) => (
    api('get',
      `/jobs?lat=${latitude}&lng=${longitude}`,
      null,
      { Authorization: `Bearer ${getState().token}` })
      .then((res) => {
        if (res.data) {
          dispatch(setJobMarker(res.data));
        }
      })
  );

export const getAppliedJob = () =>
  (dispatch, getState) => (
    api('get',
      '/jobs/applied',
      null,
      { Authorization: `Bearer ${getState().token}` })
  );

export function setJobMarker(markers) {
  return {
    type: types.SET_JOB_MARKER,
    markers,
  };
}

export const applyJob = jobId => (dispatch, getState) => api('post', '/jobs/apply',
  {
    jobId,
  },
  { Authorization: getState().token },
)
  .then((res) => {
    if (res.data) {
      return dispatch(NavigationActions.back());
    }
    return null;
  });

// export const applyJob = jobId =>
//   (dispatch, getState) => {
//     api('post',
//       '/jobs/apply',
//       { jobId },
//       { Authorization: getState().token })
//       .then((res) => {
//         if (res.data) {
//           return dispatch(NavigationActions.back());
//         }
//         return null;
//       });
//   };
