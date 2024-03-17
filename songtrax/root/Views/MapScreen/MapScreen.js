import {View, Text, useColorScheme, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import MapView, {Circle} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import colors, {
  darkTheme,
  lightTheme,
  mapCustomStyle,
} from '../../constants/colors';
import {API_KEY, URL} from '../../constants/BaseUrls';
// MapScreen component for displaying the locations near the user's current location
const MapScreen = ({onNearbyStateChange, onSendSampleId, onNameOfLocation}) => {
  const [location, setLocation] = useState(null); // For the current device location 
  const [errorMsg, setErrorMsg] = useState(null); // Storing error messages
  const [data, setData] = useState([]); // Storing API data
  const [region, setRegion] = useState(null); // Storing the area for map
  const colorScheme = useColorScheme(); // Light or dark mode
  const theme = colorScheme === 'light' ? lightTheme : darkTheme; // Theme based on colour scheme
  const mapRef = React.useRef(null); // Referencing the map
  const diameter = 200; // Diameter of the purple circle that signifies a location

  // Current location
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setLocation(position);
      },
      error => {
        setErrorMsg(error.message);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/location/?api_key=${API_KEY}`);

        if (response.status === 200) {
          const data = await response.data;
          const filteredData = data.filter(
            item => item.latitude !== null && item.longitude !== null,
          );
          // Error Messages 
          setData(filteredData);
        } else {
          setErrorMsg('Failed to fetch data from the API');
        }
      } catch (error) {
        setErrorMsg('Error while fetching data from the API');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (location && data.length > 0) {
      nearbySongsCheck();
    }
  }, [location, data]);

  /**
   * This function can return the samples based on the Location ID through the API
   *
   * @param {number} locationId - Location ID
   * @return {void}
   */

  const handleLocation = async locationId => {
    try {
      // GET Request
      const response = await axios.get(
        `${URL}/sampletolocation/?api_key=${API_KEY}`,
      );

      if (response.status === 200) {
        const data = response.data;
        const filteredData = data.map(item => {
          if (item.location_id === locationId) {
            return item;
          }
        });
        // Extract Sample IDs
        const sampleIds = filteredData.map(item => item?.sample_id);
        onSendSampleId(sampleIds);
      } else {
        setErrorMsg('Failed to fetch data from the API');
      }
    } catch (error) {
      console.log(error);
      setErrorMsg('Error while fetching data from the API');
    }
  };

  /**
   * Checking for locations nearby
   *
   * @return {void}
   */

  const nearbySongsCheck = () => {
    if (location) {
      // Define the radius for locations
      const radius = diameter;
      const earthRadiusKm = 6371;
      const lat1 = location.coords.latitude;
      const lon1 = location.coords.longitude;

      const nearbyLocation = data.find(coord => {
        const lat2 = parseFloat(coord.latitude);
        const lon2 = parseFloat(coord.longitude);
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);

        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadiusKm * c * 1000;

        return distance <= radius;
      });

      if (nearbyLocation) {
        onNameOfLocation(nearbyLocation.name);
        handleLocation(nearbyLocation.id);
        onNearbyStateChange(true);
      } else {
        onNearbyStateChange(false);
      }
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.bgColor,
        },
      ]}>
      {errorMsg ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text>{errorMsg}</Text>
        </View>
      ) : !location || data.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color={colors.purpleColorLighter} />
        </View>
      ) : (
        <MapView
          ref={mapRef}
          initialRegion={region}
          customMapStyle={colorScheme === 'light' ? [] : mapCustomStyle}
          style={{flex: 1}}
          showsUserLocation={true}
          showsMyLocationButton={true}>
          {data.map((coord, index) => {
            return (
              <Circle
                key={index}
                center={{
                  latitude: parseFloat(coord.latitude),
                  longitude: parseFloat(coord.longitude),
                }}
                radius={diameter}
                fillColor={theme.lightPink}
                strokeColor={theme.fgColor}
              />
            );
          })}
        </MapView>
      )}
    </View>
  );
};

export default MapScreen;
