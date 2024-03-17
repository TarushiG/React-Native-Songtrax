import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import ImagePicker from 'react-native-image-crop-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {darkTheme, lightTheme} from '../../constants/colors';
import {heighScale, primaryScale} from '../../constants/sizes';

/**
 * ProfileScreen component to display and edit user profile information
 *
 * @returns {React.Element} Returns the JSX representation of the ProfileScreen.
 */

const ProfileScreen = () => {
  const color = useColorScheme();
  const theme = color === 'light' ? lightTheme : darkTheme;
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');

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
  }, []);

  useEffect(() => {
    if (name) {
      AsyncStorage.setItem('name', name)
        .then(() => {
          console.log('Name saved to AsyncStorage: ', name);
        })
        .catch(error => {
          console.error('Error saving name to AsyncStorage: ', error);
        });
    }
  }, [name]);

  const addPhoto = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      setSelectedImage(image.path);
      await AsyncStorage.setItem('selectedImage', image.path);
    } catch (error) {
      console.error('Error picking an image: ', error);
    }
  };

  const removePhoto = async () => {
    try {
      setSelectedImage(null);
      await AsyncStorage.removeItem('selectedImage');
      AsyncStorage.removeItem('name');
    } catch (error) {
      console.error('Error removing an image: ', error);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          marginTop: heighScale(20),
          backgroundColor: theme.bgColor,
        },
      ]}>
      <Text
        style={[
          styles.titleStyle,
          {
            color: theme.fgColor,
          },
        ]}>
        Edit Profile
      </Text>
      <Text
        style={[
          styles.subTitleStyle,
          {
            color: theme.fgColor,
          },
        ]}>
        Mirror,Mirror on the wall...
      </Text>
      {selectedImage ? (
        <View style={styles.photoBox}>
          <Image source={{uri: selectedImage}} style={styles.photoStyle} />
          <TouchableOpacity
            onPress={removePhoto}
            style={[
              styles.removeContainer,
              {
                backgroundColor: theme.fgColorLighter,
              },
            ]}>
            <Text
              style={{
                color: theme.fgColor,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              X
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={addPhoto}
            style={[
              styles.addPhotoButton,
              {
                backgroundColor: theme.fgColor,
                position: 'absolute',
                bottom: heighScale(20),
                alignSelf: 'center',
              },
            ]}>
            <Text
              style={{
                color: theme.bgColor,
              }}>
              Change Photo
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={[
            styles.box1,
            {
              borderColor: theme.fgColorLighter,
            },
          ]}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={addPhoto}
            style={[
              styles.addPhotoButton,
              {
                backgroundColor: theme.fgColor,
              },
            ]}>
            <Text
              style={{
                color: theme.bgColor,
              }}>
              Add Photo
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View
        style={[
          styles.enterFullNameCont,
          {
            backgroundColor: theme.fgColorLighter,
          },
        ]}>
        <TextInput
          style={[
            styles.input,
            {
              color: theme.fgColor,
            },
          ]}
          value={name}
          onChangeText={text => setName(text)}
          placeholder="Enter Your name"
          placeholderTextColor={theme.fgColor}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
