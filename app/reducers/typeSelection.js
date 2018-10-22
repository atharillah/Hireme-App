import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const visibleAuthForm = createReducer('NONE', {
  [types.TOGGLE_AUTH_FORM](state, action) {
    return action.visibleAuthForm;
  },
});
