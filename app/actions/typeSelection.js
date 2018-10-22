import * as types from './types';

export function setAuthForm(action) {
  return {
    type: types.TOGGLE_AUTH_FORM,
    visibleAuthForm: action,
  };
}
