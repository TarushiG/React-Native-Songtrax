import {Dimensions, Platform, StatusBar} from 'react-native';
const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const widthScale = size => (width / guidelineBaseWidth) * size;
const heighScale = size => (height / guidelineBaseHeight) * size;
const primaryScale = (size, factor = 0.5) =>
  size + (widthScale(size) - size) * factor;
const fontScale = percent => {
  const screenHeight = Dimensions.get('window').height;
  const ratio =
    Dimensions.get('window').height / Dimensions.get('window').width;
  const deviceHeight = 375
    ? screenHeight * (ratio > 1.8 ? 0.126 : 0.15)
    : Platform.OS === 'android'
    ? screenHeight - (StatusBar.currentHeight ?? 0)
    : screenHeight;

  const heightPercent = (percent * deviceHeight) / 100;
  return Math.round(heightPercent);
};

export {widthScale, heighScale, primaryScale, fontScale, width, height};
