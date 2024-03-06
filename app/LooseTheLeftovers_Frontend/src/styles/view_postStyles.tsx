import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import { global } from '../common/global_styles';
const generateViewPostStyles = (colors: {
  lightColor: string;
  middleColor: string;
  originalColor: string;
}) =>
  StyleSheet.create({
    image_container: {
      flex: 1,
    },
    info_container: {
      flex: 1,
      position: 'relative',
    },
    image: {
      width: '100%',
      zIndex: -1,
      marginLeft: '1.5%',
    },
    card_back: {
      zIndex: 1,
      borderRadius: 0.05 * Dimensions.get('window').width,
      backgroundColor: colors.lightColor,
      height: Dimensions.get('window').width * 0.25,
      elevation: 5,
    },
    card_middle: {
      zIndex: 2,
      borderRadius: 0.05 * Dimensions.get('window').width,
      backgroundColor: colors.middleColor,
      height: Dimensions.get('window').width * 0.25,
      marginTop: -Dimensions.get('window').height * 0.1,
      elevation: 5,
    },
    card_front: {
      zIndex: 3,
      borderRadius: 0.05 * Dimensions.get('window').width,
      backgroundColor: colors.originalColor,
      borderColor: global.primary,
      marginTop: -Dimensions.get('window').height * 0.1,
      height: Dimensions.get('window').height,
      elevation: 5,
    },
    front_container: {
      height: Dimensions.get('window').height * 0.35,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 30,
      color: global.secondary,
    },

    expiry: {},
    description: {
      //  marginTop: '-5%',
      color: global.secondary,
    },
    dietary_icons_wrapper: {
      flexDirection: 'row',
      width: Dimensions.get('window').width * 0.35,
      justifyContent: 'space-between',
    },
    dietary_icons: {
      height: Dimensions.get('window').height * 0.045,
      paddingLeft: Dimensions.get('window').width * 0.1,
    },
    message_button: {
      alignSelf: 'center',
      top: '20%',
      // elevation: 5,
    },
    ratings: {
      flexDirection: 'row',
    },
    userInfo: {
      alignSelf: 'flex-start',
      marginTop: '5%',
    },
  });

export default generateViewPostStyles;
