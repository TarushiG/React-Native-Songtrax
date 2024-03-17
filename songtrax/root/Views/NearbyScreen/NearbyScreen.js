/**
 * This part dispays music based on SampleID and Location name
 *
 * @param {Array} sampleId - Sample IDs Array
 * @param {string} locationName 
 * @return {JSX.Element} 
 */
import {
  View,
  Text,
  SafeAreaView,
  useColorScheme,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {AirbnbRating} from 'react-native-ratings';
import SongDetails from './SongDetails';
import axios from 'axios';
import {API_KEY, URL} from '../../constants/BaseUrls';
import {darkTheme, lightTheme} from '../../constants/colors';
import images from '../../constants/images';

const NearbyScreen = ({sampleId, locationName}) => {
  /**
   * Playing song
   *
   * @type {boolean}
   */
  const [isPlaying, setIsPlaying] = useState(false);
  const [songDetails, setSongDetails] = useState({});
  const [sampleData, setSampleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loadingRatings, setLoadingRatings] = useState(false);
  const [ratingsData, setRatingsData] = useState({});
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    sampleRetreival();
    rating();
  }, []);

  const rating = async () => {
    setLoadingRatings(true);
    const apiEndpoint = `${URL}/samplerating/?api_key=${API_KEY}`;
    const promises = sampleId.map(async id => {
      try {
        const response = await axios.get(`${apiEndpoint}&sample_id=${id}`);
        const data = response.data;
        console.log(data);
        const matchingRatings = data.filter(item => item.sample_id === id);
        if (matchingRatings.length > 0) {
          const ratings = matchingRatings.map(item => item.rating);
          const averageRating = ratingAverage(ratings);
          return {id, averageRating};
        } else {
          return {id, averageRating: 0};
        }
      } catch (error) {
        console.log(`Error while fetching data for id ${id}`);
        return {id, averageRating: 0};
      }
    });

    Promise.all(promises).then(results => {
      const averageRatingsData = {};
      results.forEach(result => {
        averageRatingsData[result.id] = result.averageRating;
      });
      setRatingsData(averageRatingsData);
      setLoadingRatings(false);
    });
  };

  const sampleRetreival = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${URL}/sample/?api_key=${API_KEY}`);

      if (response.status === 200) {
        const data = response.data;
        const filteredSampleData = data.filter(item =>
          sampleId.includes(item.id),
        );
        setSampleData(filteredSampleData);
        setLoading(false);
      } else {
        setErrorMsg('Failed to fetch data from the API');
      }
    } catch (error) {
      setErrorMsg('Error while fetching data from the API');
    }
  };
  /**
   * Function to calculate the average rating
   *
   * @param {Array} arr - Array of ratings
   * @return {number}
   */
  const ratingAverage = arr => {
    if (arr.length === 0) return 0;
    const sum = arr.reduce((total, rating) => total + rating, 0);
    return sum / arr.length;
  };

  const formatDateToDisplay = datetime => {
    const dateObject = new Date(datetime);
    const day = dateObject.getUTCDate();
    const month = dateObject.getUTCMonth() + 1;
    const year = dateObject.getUTCFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${formattedDay}-${formattedMonth}-${year}`;
  };
  /**
   * Retrieve list of songs based on sample data
   *
   * @return {JSX.Element} - List of Songs
   */
  const songLists = () => {
    if (sampleData.length === 0) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <Text style={styles.noDataText}>No songs near to your location</Text>
        </View>
      );
    }

    return (
      <View>
        <FlatList
          data={sampleData}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                setIsPlaying(true), setSongDetails(item);
              }}
              style={styles.songContainer}>
              <Text
                style={[
                  styles.textSong,
                  {
                    color: theme.fgColorLighter,
                  },
                ]}>
                {item.name}
              </Text>
              <Text
                style={[
                  styles.textSong,
                  {
                    color: theme.fgColorLighter,
                  },
                ]}>
                {formatDateToDisplay(item.datetime)}
              </Text>

              <AirbnbRating
                unSelectedColor={theme.fgColorLighter}
                isDisabled
                showRating={false}
                count={5}
                defaultRating={ratingsData[item.id]}
                size={20}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  if (loading && loadingRatings) {
    return (
      <View
        style={[
          styles.container,
          {
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <ActivityIndicator size="small" color={theme.fgColor} />
      </View>
    );
  }

  return (
    <>
      {isPlaying ? (
        <SongDetails
          onPress={() => setIsPlaying(false)}
          item={songDetails}
          locationName={locationName}
        />
      ) : (
        <SafeAreaView
          style={[
            styles.container,
            {
              backgroundColor: theme.bgColor,
            },
          ]}>
          <View style={styles.container2}>
            <Image
              source={colorScheme === 'light' ? images.pointD : images.pointL}
              style={styles.iconSize}
            />
            <Text
              style={[
                styles.uqText,
                {
                  color: theme.fgColor,
                },
              ]}>
              {locationName}
            </Text>
          </View>
          {songLists()}
        </SafeAreaView>
      )}
    </>
  );
};

export default NearbyScreen;
