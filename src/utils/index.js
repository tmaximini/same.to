
import { parse, format } from 'date-fns';

export const border = (color = '#000', width = 4) => ({
  borderColor: color,
  borderWidth: width
});

export const borderRadius = (size) => ({
  borderRadius: size
});

export const formatDate = (dateString) => format(parse(dateString), 'DD.MM.YYYY');
