
import { parse, format } from 'date-fns';

export const border = (color = '#000', width = 4) => ({
  borderColor: color,
  borderWidth: width
});

export const borderRadius = (size) => ({
  borderRadius: size
});

export const formatDate = (dateString) => format(parse(dateString), 'DD.MM.YYYY');

export const getDateFromString = (string, delimiter = '.') => {
  const splitted = string.split(delimiter);

  return new Date(splitted[2], splitted[1], splitted[0]);
};
