import { Share } from 'react-native';
import moment from 'moment';
import { COLORS } from '../constants';
import { getUserId } from '../services/api';

export const border = (color = '#000', width = 4) => ({
  borderColor: color,
  borderWidth: width
});

export const borderRadius = size => ({
  borderRadius: size
});

export const formatDate = dateString => moment(dateString).calendar();

export const getDateFromString = (string, delimiter = '-') => {
  if (!string) return null;
  const splitted = string.split(delimiter);

  return new Date(splitted[0], splitted[1], splitted[2]);
};

export const toggleArrayItem = (array, item) => {
  const index = array.indexOf(item);
  if (index === -1) {
    return [...array, item];
  }
  return [
    ...array.slice(0, index),
    ...array.slice(index + 1)
  ];
};


export const share = ({ message = 'share message', title = 'share title', url, dialogTitle }) => () => { // eslint-disable-line
  Share.share({
    message,
    url,
    title,
  }, {
    dialogTitle: dialogTitle || title,
    excludedActivityTypes: [],
    tintColor: COLORS.CYAN,
  })
  .then(result => console.log('shared successfully', result))
  .catch(error => console.warn('error with sharing', error));
};


export const isOrganizer = model => {
  const userId = getUserId();
  return model.organizerId && model.organizerId === userId;
};

export const isMember = model => {
  const userId = getUserId();
  return model.memberIds && model.memberIds.index(userId) > -1;
};

export const canEdit = model => {
  const userId = getUserId();
  return userId && isOrganizer(model);
};

export const canAdd = model => {
  const userId = getUserId();
  return userId && (isOrganizer(model) || isMember(model));
};
