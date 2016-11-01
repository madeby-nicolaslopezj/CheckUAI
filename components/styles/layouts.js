import {StyleSheet} from 'react-native'

const backgroundColor = '#fff'

export default StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor
  },
  small: {
    width: 300
  },
  scrollView: {
    flex: 1,
    backgroundColor
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  col: {
    flex: 1
  },
  scrollViewContent: {
    paddingVertical: 30,
    justifyContent: 'center',
    backgroundColor,
    padding: 20
  },
  bottomIndicator: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
