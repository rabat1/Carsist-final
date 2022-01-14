import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Pdf from 'react-native-pdf';

const index = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);

  // console.log('params',route.params);
  const {currentUrl} = route.params;
  return (
    <View>
      {loading === true ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View></View>
      )}
      <Pdf
        source={{uri: currentUrl}}
        onLoadComplete={(numberOfPages, filePath) => {
          setLoading(false);
          // console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          // console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={url_ => {
          // console.log(`Link pressed: ${url_}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    //   zIndex:1
  },
  loading: {
    
    position: 'absolute',
    top: 200,
    left: 160,
  },
});

export default index;
