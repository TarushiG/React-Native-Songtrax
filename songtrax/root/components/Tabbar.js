import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../constants/colors';
import {fontScale, primaryScale, widthScale} from '../constants/sizes';
import images from '../constants/images';

const Tabbar = ({
  tab1,
  tab2,
  tab3,
  onPressTab1,
  onPressTab2,
  onPressTab3,
  nearByState,
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.purpleColorLighter, colors.blueColorDarker]}
        style={styles.linearStyle}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <TouchableOpacity
          onPress={onPressTab1}
          style={[
            styles.icon,
            {
              backgroundColor: tab1
                ? colors.blackColorTranslucentLess
                : 'transparent',
            },
          ]}>
          <Image
            source={images.map}
            style={styles.iconStyle}
            tintColor={colors.whiteColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressTab2}
          style={[
            styles.icon,
            {
              backgroundColor: tab2
                ? colors.blackColorTranslucentLess
                : 'transparent',
            },
          ]}>
          <Text style={styles.text}>SongTrax</Text>
          {nearByState ? (
            <Text style={styles.text}>There's Music Nearby</Text>
          ) : (
            ''
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressTab3}
          style={[
            styles.icon,
            {
              backgroundColor: tab3
                ? colors.blackColorTranslucentLess
                : 'transparent',
            },
          ]}>
          <Image
            source={images.profile}
            style={styles.iconStyle}
            tintColor={colors.whiteColor}
          />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  linearStyle: {
    flex: 1,
    height: primaryScale(80),
    paddingHorizontal: widthScale(40),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    alignItems: 'center',
    padding: primaryScale(14),
    justifyContent: 'center',
  },
  iconStyle: {
    height: primaryScale(30),
    width: primaryScale(30),
    resizeMode: 'contain',
  },
  text: {
    color: colors.whiteColorTranslucent,
    fontSize: fontScale(18),
  },
});

export default Tabbar;
