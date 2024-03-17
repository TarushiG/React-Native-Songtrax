/**
 * Component for displaying details of a song.
 *
 * @param {Object} item - Song details object
 * @param {string} locationName - Name
 * @param {Function} onPress - Function to handle press event
 * @return {JSX.Element} - JSX element representing the SongDetails component
 */
import {
  View,
  Text,
  SafeAreaView,
  useColorScheme,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {AirbnbRating} from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import {API_KEY, URL} from '../../constants/BaseUrls';
import images from '../../constants/images';
import {fontScale, heighScale} from '../../constants/sizes';
import {darkTheme, lightTheme} from '../../constants/colors';

const SongDetails = ({item, locationName, onPress}) => {
  const [name, setName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [rating, setRating] = useState(0); // Store the rating of a song
  const [webViewState, setWebViewState] = useState({
    loaded: false,
    actioned: false,
  });

  const colorScheme = useColorScheme();
  const webViewRef = React.useRef();
  const theme = colorScheme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    AsyncStorage.getItem('name')
      .then(storedName => {
        if (storedName) {
          setName(storedName);
        }
      })
      .catch(error => {
        console.error('Error loading name from AsyncStorage: ', error);
      });

    AsyncStorage.getItem('selectedImage')
      .then(imageURI => {
        if (imageURI) {
          setSelectedImage(imageURI);
        }
      })
      .catch(error => {
        console.error('Error loading selectedImage from AsyncStorage: ', error);
      });
    AsyncStorage.getItem(`rating_${item.id}`)
      .then(storedRating => {
        if (storedRating) {
          setRating(parseFloat(storedRating));
        }
      })
      .catch(error => {
        console.error('Error loading rating from AsyncStorage: ', error);
      });
  }, []);
  /**
   * Take notice of rating change and register the change in the API
   *
   * @param {number} newRating - Value of recently added rating
   * @return {void}
   */
  const handleRating = newRating => {
    setRating(newRating);
    AsyncStorage.setItem(`rating_${item.id}`, newRating.toString());
    const apiEndpoint = `${URL}/samplerating/?api_key=${API_KEY}`;

    const data = {
      api_key: API_KEY,
      sample_id: item.id,
      rating: rating,
    };

    axios
      .post(apiEndpoint, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.status === 201) {
          console.log('Rating sent successfully');
        } else {
          console.error('Failed to send rating');
        }
      })
      .catch(error => {
        console.error('Error while sending the rating:', error);
      });
  };

  const webViewLoaded = () => {
    setWebViewState({
      ...webViewState,
      loaded: true,
    });
  };
  /**
   * Handling the play/stop button on-click event.
   *
   * @return {void}
   */
  const handleActionPress = () => {
    if (!webViewState.actioned) {
      const jsCode = `playSong('${item.recording_data}');`;
      webViewRef.current.injectJavaScript(jsCode);
    } else {
      webViewRef.current.injectJavaScript('stopSong();');
    }
    setWebViewState({
      ...webViewState,
      actioned: !webViewState.actioned,
    });
  };
  /**
   * Render the song details.
   *
   * @return {JSX.Element} - JSX element representing the song details
   */
  const songDetails = () => {
    return (
      <View style={styles.container3}>
        <Text
          style={[
            styles.nameOfStyle,
            {
              color: theme.fgColor,
            },
          ]}>
          {item.name}
        </Text>
        <TouchableOpacity
          onPress={handleActionPress}
          style={[
            styles.container4,
            {
              backgroundColor: theme.fgColor,
            },
          ]}>
          <Text
            style={[
              styles.playText,
              {
                color: theme.bgColor,
              },
            ]}>
            {webViewState.actioned ? 'Stop Music' : 'Play Music'}
          </Text>
        </TouchableOpacity>
        <AirbnbRating
          ratingContainerStyle={{marginTop: heighScale(10)}}
          unSelectedColor={theme.fgColorLighter}
          showRating={false}
          count={5}
          defaultRating={rating}
          size={30}
          onFinishRating={handleRating}
        />

        <View>
          <WebView
            ref={ref => (webViewRef.current = ref)}
            originWhitelist={['*']}
            source={{
              uri: 'https://comp2140.uqcloud.net/static/samples/index.html',
            }}
            pullToRefreshEnabled={true}
            onLoad={webViewLoaded}
            style={styles.webView}
          />
        </View>
      </View>
    );
  };
   /**
   * Retrieve the location details.
   *
   * @return {JSX.Element} - JSX element representing the location details
   */
  const locationDetails = () => {
    return (
      <View>
        <Text
          style={[
            styles.currentText,
            {
              color: theme.fgColor,
            },
          ]}>
          Currently At This Location:
        </Text>
        <View style={styles.container6}>
          <Image
            resizeMode="contain"
            source={{uri: selectedImage}}
            style={[
              styles.imageStyle,
              {
                borderColor: theme.fgColor,
              },
            ]}
          />
          <View style={styles.container5}>
            <Text
              style={{
                color: theme.fgColor,
              }}>
              {name}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.container6,
            {
              marginBottom: heighScale(50),
            },
          ]}>
          <Image
            resizeMode="contain"
            source={colorScheme === 'light' ? images.emojiD : images.emojiL}
            style={[
              styles.imageStyle,
              {
                borderColor: theme.fgColor,
              },
            ]}
          />
          <View style={styles.container5}>
            <Text
              style={{
                color: theme.fgColor,
              }}>
              Add Others...
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.bgColor,
        },
      ]}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          position: 'absolute',
          top: heighScale(20),
          left: heighScale(30),
          height: heighScale(30),
          width: heighScale(30),
          borderRadius: heighScale(30),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.fgColorLighter,
        }}>
        <Text
          style={{
            fontSize: fontScale(20),
          }}>
          X
        </Text>
      </TouchableOpacity>
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
      {songDetails()}
      {locationDetails()}
    </SafeAreaView>
  );
};

export default SongDetails;
