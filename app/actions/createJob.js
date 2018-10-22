import { NavigationActions } from 'react-navigation';
import api from '../lib/api';
import * as types from './types';

export const createJob = ({
  field, qualification, education, description,
  salaryLow, salaryHigh, deadline, location, information,
}) => (dispatch, getState) => api('post', '/company/job', {
  field,
  qualification,
  education,
  description,
  salaryLow,
  salaryHigh,
  deadline,
  location,
  information,
},
{ Authorization: `Bearer ${getState().token}` },
)
.then((res) => {
  if (res.data) {
    dispatch(getJobHiring());
    return dispatch(NavigationActions.back());
  }
  return null;
});

export const getJobHiring = () =>
  (dispatch, getState) => (
  api('get', '/company/jobs', null, { Authorization: `Bearer ${getState().token}` })
  .then((res) => {
    if (res.data) {
      dispatch(setJobHiring(res.data));
    }
  })
);

export function setJobHiring(jobs) {
  return {
    type: types.SET_JOB_HIRING,
    jobs,
  };
}
