import {Dimensions, StyleSheet} from 'react-native';
import {
  fontScale,
  heighScale,
  primaryScale,
  widthScale,
} from '../../constants/sizes';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleStyle: {
    fontSize: fontScale(30),
    fontWeight: 'bold',
    paddingBottom: 0,
    marginHorizontal: widthScale(20),
  },
  subTitleStyle: {
    fontSize: fontScale(14),
    fontWeight: 'bold',
    paddingBottom: 0,
    marginHorizontal: widthScale(20),
  },
  box1: {
    borderWidth: 2,
    borderRadius: primaryScale(10),
    borderStyle: 'dashed',
    height: height / 1.625,
    marginTop: heighScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: widthScale(20),
  },
  addPhotoButton: {
    fontWeight: 'bold',
    padding: primaryScale(10),
    borderRadius: primaryScale(10),
    textAlign: 'center',
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterFullNameCont: {
    marginTop: heighScale(20),
    borderRadius: primaryScale(5),
    height: primaryScale(40),
    marginHorizontal: widthScale(20),
  },
  input: {
    flex: 1,
    fontSize: fontScale(14),
    textAlign: 'center',
  },
  photoBox: {
    height: height / 1.625,
    marginTop: heighScale(20),
    marginHorizontal: widthScale(20),
  },
  photoStyle: {
    height: height / 1.625,
    width: '100%',
    borderRadius: primaryScale(10),
  },
  removeContainer: {
    position: 'absolute',
    top: heighScale(10),
    right: heighScale(10),
    width: primaryScale(30),
    height: primaryScale(30),
    borderRadius: primaryScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
