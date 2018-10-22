import api from '../lib/api';

export function editProfile({ picture, firstName, lastName, contact, experience, education }) {
  const data = new FormData();
  let alamat = '/me/edit';
  if (picture) {
    data.append('picture', { uri: picture.uri, name: picture.fileName, type: picture.type });
  } else {
    alamat = '/me/edit/nopic';
  }
  data.append('firstName', firstName);
  data.append('lastName', lastName);
  data.append('experience', experience);
  data.append('education', education);
  data.append('contact', contact);

  return (dispatch, getState) => api('post', alamat,
    data,
    {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${getState().token}`,
    });
}
