import { StyleSheet } from 'react-native';

import { COLORS, PADDINGS, MIXINS } from '../../constants';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  imageWrapper: {
    flexGrow: 0,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: PADDINGS.DOUBLE,
    marginBottom: PADDINGS.DOUBLE * 2,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    borderColor: COLORS.CYAN,
    borderWidth: 2,
  },
  textBox: {
    marginBottom: PADDINGS.DOUBLE,
    paddingHorizontal: PADDINGS.DOUBLE,
  },
  text: {
    ...MIXINS.lightText,
    textAlign: 'center',
  },
  icon: {
    color: COLORS.CYAN,
  },
  iconActive: {
    marginTop: 1,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: PADDINGS.STANDARD,
  }
});
