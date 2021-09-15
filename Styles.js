import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1},
  gridItem: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
    height: 300,
    justifyContent: 'center',
  },
  imageContainer: {
    height: 290,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  leftGridMargin: {
    marginLeft: 10,
    marginRight: 5,
  },
  rightGridMargin: {
    marginLeft: 5,
    marginRight: 10,
  },
  loader: {
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0482f7',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  square: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 0, 132, 0.3)',
  },
  circle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 0, 132, 0.3)',
  },
});
