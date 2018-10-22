import * as types from './types';
import { NavigationActions } from 'react-navigation';
import api from '../lib/api';

export const getFilter = () =>
  (dispatch, getState) => (
    api('get', '/client/me', null, { Authorization: `Bearer ${getState().token}` })
  );

export function setFilter({ education, fields }) {
  const edu = {};
  for (let i = 0; i < education.length; i++) {
    edu[education[i].key] = education[i].checked;
  }

  const fi = [];
  for (let i = 0; i < fields.length; i++) {
    for (let k = 0; k < fields[i].data.length; k++) {
      if (fields[i].data[k].checked) {
        fi.push(fields[i].data[k]._id);
      }
    }
  }

  return (dispatch, getState) => api('post',
    '/client/filter',
    { education: edu, field: fi },
    { Authorization: `Bearer ${getState().token}` })
    .then(res => dispatch(NavigationActions.back()))
    .catch(err => dispatch(NavigationActions.back()));
}

export function getFields() {
  return (dispatch, getState) => api('get', '/client/fields', null, { Authorization: `Bearer ${getState().token}` });
}
