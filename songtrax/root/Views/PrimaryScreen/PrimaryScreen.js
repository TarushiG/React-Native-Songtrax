/**
 * Handle the change of the nearby state.
 *
 * @param {boolean} newState - The new state of the nearby feature.
 */
import {View, Text, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import Tabbar from '../../components/Tabbar';
import MapScreen from '../MapScreen/MapScreen';
import NearbyScreen from '../NearbyScreen/NearbyScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';

const PrimaryScreen = () => {
  const [tab1, setTab1] = useState(true);
  const [tab2, setTab2] = useState(false);
  const [tab3, setTab3] = useState(false);
  const [nearByState, setNearByState] = useState(false);
  const [sampleToLocationData, setSampleToLocationData] = useState([]);
  const [nameOfLocation, setNameOfLocation] = useState('');

  // Handling press events
  
  const handleNearByStateChange = newState => {
    setNearByState(newState);
  };

  const handleSendSampleId = sampleId => {
    setSampleToLocationData(sampleId);
  };

  const handleLocationName = locationName => {
    setNameOfLocation(locationName);
  };

  const onPressTab1 = () => {
    setTab1(true);
    setTab2(false);
    setTab3(false);
  };

  const onPressTab2 = () => {
    setTab1(false);
    setTab2(true);
    setTab3(false);
  };

  const onPressTab3 = () => {
    setTab1(false);
    setTab2(false);
    setTab3(true);
  };
  return (
    <View style={styles.container}>
      {tab1 ? (
        <MapScreen
          onNameOfLocation={handleLocationName}
          onSendSampleId={handleSendSampleId}
          onNearbyStateChange={handleNearByStateChange}
        />
      ) : tab2 ? (
        <NearbyScreen
          sampleId={sampleToLocationData}
          locationName={nameOfLocation}
        />
      ) : (
        <ProfileScreen />
      )}
      <Tabbar
        tab1={tab1}
        tab2={tab2}
        tab3={tab3}
        onPressTab1={onPressTab1}
        onPressTab2={onPressTab2}
        onPressTab3={onPressTab3}
        nearByState={nearByState}
      />
    </View>
  );
};

export default PrimaryScreen;
