import { StyleSheet } from 'react-native';
import { global } from './global_styles';

const globalscreenstyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: global.background,
  },
  body: {
    flex: 0.8,
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
  },
});

export default globalscreenstyles;
