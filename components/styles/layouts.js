import { StyleSheet } from 'react-native';

const backgroundColor = '#eee';

export default StyleSheet.create({
  centerContainer: {
    justifyContent: 'center',
    backgroundColor,
  },
  small: {
    width: 300,
  },
  scrollView: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  col: {
    flex: 1,
  },
  scrollViewContent: {
    paddingVertical: 30,
    justifyContent: 'center',
    backgroundColor,
  },
})
