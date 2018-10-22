import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const token = createReducer(null, {
  [types.TOKEN](state, action) {
    return action.token;
  },
});
