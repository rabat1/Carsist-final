import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const index = ({shopHandler}) => {
    return (
        <View style={styles.searchBarContainer}>
         

        </View>
    )
}

export default index;
// <GooglePlacesAutocomplete
// //it will work if you enable billing from site https://console.cloud.google.com/google/maps-apis/credentials?project=hotelapp-331914
// query={{key:'AIzaSyBMSY62hNIvzmyzHSFo5IKd72XYjgCY_DQ'}}
// onPress={(data, details = null) => {
//     console.log(data.description);
//     const shop = data.description.split(",")[0];
//     shopHandler(shop);
//   }}
// placeholder="Search Shop"
// styles={{
//     textInput:{
//            backgroundColor:'#eee',
//            marginTop:7,
//            fontWeight:"700",
//     },
//     textInputContainer:{
//             backgroundColor:"#eee",
//             borderRadius:50,
//             flexDirection:'row',
//             alignItems:'center',
//          //   marginRight:5,
//     },
// }}
// renderLeftButton={()=>(
//     <View style={{marginLeft:10}}>
//         <Ionicons color='black' name='location-sharp' size={24} />
//     </View>
// )}

// renderRightButton={()=>(
//     <TouchableOpacity>
//     <View style={styles.searchBtn}                    >
//         <Text style={{marginHorizontal:20}}>Search</Text>
//     </View>
//     </TouchableOpacity>
// )}
// />