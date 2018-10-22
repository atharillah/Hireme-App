import { AppNavigator } from '../AppContainer';
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('Splash'),
);

export const nav = createReducer(initialState, {
  [types.NAV](state, action) {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
  },
  [types.NAV_BACK](state, action) {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
  },
  [types.NAV_RESET](state, action) {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
  },
  [types.SET_PARAMS](state, action) {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
  },
});
