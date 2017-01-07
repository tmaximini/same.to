
import { parse, format } from 'date-fns';

export const border = (color = '#000', width = 4) => ({
  borderColor: color,
  borderWidth: width
});

export const borderRadius = (size) => ({
  borderRadius: size
});

export const formatDate = (dateString) => format(parse(dateString), 'YYYY-MM-DD');

export const getDateFromString = (string, delimiter = '-') => {
  if (!string) return null;
  const splitted = string.split(delimiter);

  return new Date(splitted[0], splitted[1], splitted[2]);
};
