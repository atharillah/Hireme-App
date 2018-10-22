import { combineReducers } from 'redux';
import * as navReducer from './nav';
import * as authReducer from './auth';
import * as typeSelectionReducer from './typeSelection';
import * as createJobs from './createJob';
import * as Jobs from './job';

export default combineReducers(
  Object.assign(
    navReducer,
    authReducer,
    typeSelectionReducer,
    Jobs,
    createJobs),
);
