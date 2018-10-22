import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const hiringJobs = createReducer([], {
  [types.SET_JOB_HIRING](state, action) {
    return action.jobs;
  },
});
