import { NavigationActions } from 'react-navigation';
import * as types from './types';

export function nav(state, action) {
  return {
    type: types.NAV,
    state,
    action,
  };
}

export function back() {
  return dispatch => dispatch(NavigationActions.back());
}

export function loadFirst(routeName) {
  return dispatch => dispatch(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName }),
    ],
  }));
}

export function openPage(routeName, params) {
  return dispatch => dispatch(NavigationActions.navigate({ routeName, params }));
}

export function main() {
  return dispatch => dispatch(NavigationActions.navigate({ routeName: 'Main' }));
}

export function profile() {
  return dispatch => dispatch(NavigationActions.navigate({ routeName: 'Profile' }));
}

export function job() {
  return dispatch => dispatch(NavigationActions.navigate({ routeName: 'Job' }));
}

export function listJob() {
  return dispatch => dispatch(NavigationActions.navigate({ routeName: 'ListJob' }));
}

export function settings() {
  return dispatch => dispatch(NavigationActions.navigate({ routeName: 'Settings' }));
}
