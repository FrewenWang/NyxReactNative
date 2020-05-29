import {StyleSheet} from 'react-native';

export const DiscoveryStyles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  flowNoMoreBox: {
    flexDirection: 'row',
    height: 60,
    marginTop: 10,
    marginBottom: 80,
    padding: 10,
    backgroundColor: 'rgba(39,62,136,1)',
    borderRadius: 9,
  },
  flowNoMoreBoxEmbed: {
    flexDirection: 'column',
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flowNoMoreText: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
  },
});
