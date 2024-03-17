import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import {
  heighScale,
  widthScale,
  fontScale,
  primaryScale,
} from '../../constants/sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconSize: {
    width: primaryScale(35),
    height: primaryScale(105),
    resizeMode: 'contain',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: widthScale(20),
    marginHorizontal: widthScale(80),
  },
  uqText: {
    fontSize: fontScale(20),
    fontWeight: 'bold',
  },
  songContainer: {
    marginHorizontal: widthScale(20),
    marginVertical: widthScale(10),
    borderBottomWidth: 1,
    paddingVertical: widthScale(10),
    borderBottomColor: colors.blackColorTranslucentLess,
  },
  textSong: {
    color: colors.blackColorTranslucentLess,
    fontSize: fontScale(12),
  },
  container: {
    flex: 1,
  },
  iconSize: {
    width: primaryScale(35),
    height: primaryScale(105),
    resizeMode: 'contain',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: widthScale(20),
    marginHorizontal: widthScale(80),
  },
  uqText: {
    fontSize: fontScale(20),
    fontWeight: 'bold',
  },
  songContainer: {
    marginHorizontal: widthScale(20),
    marginVertical: widthScale(10),
    borderBottomWidth: 1,
    paddingVertical: widthScale(10),
    borderBottomColor: colors.blackColorTranslucentLess,
  },
  textSong: {
    color: colors.blackColorTranslucentLess,
    fontSize: fontScale(12),
  },
  nameOfStyle: {
    fontSize: fontScale(20),
    fontWeight: 'bold',
  },
  container3: {
    marginHorizontal: widthScale(20),
    flex: 1,
  },
  container4: {
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heighScale(20),
  },
  playText: {
    fontWeight: 'bold',
  },
  currentText: {
    fontSize: fontScale(16),
    fontWeight: 'bold',
    marginHorizontal: widthScale(20),
    marginTop: heighScale(20),
  },
  imageStyle: {
    height: primaryScale(50),
    width: primaryScale(50),
    borderRadius: primaryScale(25),
    borderWidth: 1,
    marginLeft: widthScale(20),
    marginTop: heighScale(20),
  },
  container5: {
    flex: 1,
    marginTop: heighScale(20),
    marginLeft: widthScale(10),
  },
  container6: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  webViewContainer: {
    borderWidth: 3,
    marginBottom: heighScale(20),
    height: primaryScale(100),
    marginTop: heighScale(20),
  },
});

export default styles;
