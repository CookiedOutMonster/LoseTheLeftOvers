import React, { useContext, useEffect, useState } from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';
import { global } from '../common/global_styles';
import { adEndpoint, adsLocation } from '../common/API';
import { djangoConfig } from '../common/NetworkRequest';
import {
  getLocationPermissionAndroid,
  getLocation,
} from '../common/LocationServices';
import { useGlobal } from '../common/GlobalContext';
import { Title } from 'react-native-paper';

import globalscreenstyles from '../common/global_ScreenStyles';
import Logo from '../components/Logo';
import CreateAdIcon from '../components/CreateAdIcon';
import MessageIcon from '../components/MessageIcon';
import HomeIcon from '../components/HomeIcon';
import AccountIcon from '../components/AccountIcon';
import PostListRenderer from '../components/PostListRenderer';
import LinearGradient from 'react-native-linear-gradient';
import TabBarTop from '../components/TabBarTop';
import TabBarBottom from '../components/TabBarBottom';
import axios from 'axios';
import generatePostListStyles from '../styles/postListStyles';
import SelectRangeBar from '../components/SelectRangeBar';
import Icon from '../components/Icon';

// @TODO move this to Types.tsx
type GetDataFunctionType = ((pageNumber: number) => Promise<any>) | null;

const Home = ({ navigation }: { navigation: any }) => {
  const screenWidth = Dimensions.get('window').width;
  const postListStyles = generatePostListStyles(screenWidth);
  const { locationPermission, updateLocationPermission } = useGlobal();
  // this state contains the function that PostListRenderer needs to call the backend with. When it is changed, PostListRenderer re-renders and recalls with the new request.
  const [getDataFunction, setGetDataFunction] =
    useState<GetDataFunctionType>(null);
  const [whichHeader, setWhichHeader] = useState('');
  const [range, setRange] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const disableLocationIcon = '../assets/location.png';

  useEffect(() => {
    function updateDataFetchingMethod() {
      if (locationPermission === 'GRANTED') {
        setWhichHeader('location-enabled');
        try {
          setGetDataFunction(() => getAdsLocation);
        } catch (error) {
          console.error('Error getting location:', error);
          setGetDataFunction(() => fetchAds);
        }
      } else {
        setWhichHeader('location-disabled');
        setGetDataFunction(() => fetchAds);
      }
      setIsLoading(false);
    }
    updateDataFetchingMethod();
  }, [locationPermission, range]); // This effect depends on locationPermission

  async function fetchAds(pageNumber: number) {
    // create endpoint for ads with pageNumber that gets updated by PostListRenderer for lazyloading
    const adEndpointWithPage = `${adEndpoint}?page=${pageNumber}`;
    // call the backend endpoint
    const payload = await axios.get(adEndpointWithPage, djangoConfig());
    // return the data to PostListRenderer
    return payload;
  }

  async function getAdsLocation(pageNumber: number) {
    try {
      // retrieve users location permission
      const pos = await getLocation();
      // extract longitude and latitude and set it as the body
      const body = {
        latitude: pos.latitude,
        longitude: pos.longitude,
        range: range,
      };
      // create endpoint for ads/location with pageNumber that gets updated by PostListRenderer for lazyloading
      const adLocEndpointWPage = `${adsLocation}?page=${pageNumber}`;
      // call the backend endpoint
      const payload = await axios.post(adsLocation, body, djangoConfig());
      // return nothing... FOR NOW
      return payload;
    } catch (error) {
      console.log(`There was an error getting the location ${error} `);
      return [];
    }
  }

  const enableLocation = async () => {
    // get location permissions
    let answer = await getLocationPermissionAndroid();
    // only perform location services if user enables them
    if (answer) {
      // update state.
      updateLocationPermission('GRANTED');
    }
  };

  const disableLocation = async () => {
    // update state
    updateLocationPermission('DENIED');
  };

  const renderHeader_Handler = (): React.ReactNode => {
    switch (whichHeader) {
      case 'location-disabled': {
        return renderHeader_Default();
      }
      case 'location-enabled': {
        return renderHeader_Location();
      }
    }
  };

  /**
   * @function
   * @description
   * Renders the header for the home screen, displaying a title and a `SelectRangeBar`.
   */
  // @Todo consider making this a component

  useEffect(() => {
    console.log('YUCKY!');
  }, [range]);

  const renderHeader_Location = (): React.ReactNode => {
    return (
      <View style={postListStyles.listHeder}>
        <View style={postListStyles.dropdownHeader}>
          <Icon
            source={require(disableLocationIcon)}
            size={50}
            onPress={disableLocation}></Icon>
          <SelectRangeBar setRange={setRange} />
        </View>
        <View style={postListStyles.titleContainer}>
          <Title style={postListStyles.title} testID="header title">
            Showing Posts Near {range} km
          </Title>
        </View>
      </View>
    );
  };

  // @Todo consider making this a component
  const renderHeader_Default = (): React.ReactNode => {
    const enableLocationIcon = '../assets/location-zero.png';
    return (
      <View style={postListStyles.listHeder}>
        <View style={postListStyles.dropdownHeader}>
          <Icon
            source={require(enableLocationIcon)}
            size={50}
            onPress={enableLocation}></Icon>
        </View>
        <View style={postListStyles.titleContainer}>
          <Title style={postListStyles.title} testID="header title">
            Showing All Posts
          </Title>
        </View>
      </View>
    );
  };

  return (
    <View style={globalscreenstyles.container}>
      <LinearGradient
        style={globalscreenstyles.container}
        colors={[global.background, global.purple, global.background]}
        start={{ x: 0, y: 0 }}>
        <TabBarTop
          LeftIcon={<Logo size={55}></Logo>}
          RightIcon={<MessageIcon></MessageIcon>}></TabBarTop>
        <View style={globalscreenstyles.middle}>
          {renderHeader_Handler()}
          {isLoading ? (
            ''
          ) : (
            <PostListRenderer
              endpoint={adEndpoint}
              navigation={navigation}
              getData={getDataFunction}
            />
          )}
        </View>
        <TabBarBottom
          LeftIcon={<HomeIcon></HomeIcon>}
          MiddleIcon={<CreateAdIcon></CreateAdIcon>}
          RightIcon={<AccountIcon></AccountIcon>}></TabBarBottom>
      </LinearGradient>
    </View>
  );
};

export default Home;
