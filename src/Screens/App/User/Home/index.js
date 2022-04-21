import React,{useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import MapView, { PROVIDER_GOOGLE ,Marker} from 'react-native-maps';
import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import SearchTab from '../../../../Components/SearchTab'
// import MapComponent from '../../../../Components/MapComponent'
import CustomButton from '../../../../Components/CustomButton'
import { useNavigation, useFocusEffect } from '@react-navigation/core';
// // import Icon from '../../../../Utils/Icon'
// import { CustomHeader } from '../../../../Navigation/CustomHeader';
import { getUser,getMechanic,getMechanicList} from '../../../../config/firebase'


const index = () => {

    const [markers,setMarkers]=useState();
    const [region,setRegion] = useState({
      latitude: 24.908040851439186, 
      longitude:  67.11852547690728,
      latitudeDelta: 0.033,
      longitudeDelta: 0.033,
   });
  //  const user = useSelector(state => state.userReducer.user);
  //  console.log(user);
    
    useEffect( async ()=>{
       var data = await getMechanicList();
      setMarkers(data);
     


    },[]);
     
   
    const {navigate} = useNavigation();
    
    const onPress = () => {
        navigate('issue');
       
      
    }
    const onRegionChange = (region)=>{
           setRegion(region);
    }
   

    return (
        <View style={styles.home}>
            <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            initialRegion={{
              latitude: 24.908040851439186, 
              longitude:  67.11852547690728,
              latitudeDelta: 0.033,
              longitudeDelta: 0.033,
           }}
           onRegionChange={onRegionChange}
         >
         {markers && markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{latitude : marker['latitude'], longitude:marker['longitude']}}
              title={marker.shopName}
              description={marker.address}
              image={require('../../../../../assets/Images/car_mechanic_icon2.png')}
            />
          ))}
         
          </MapView>
            
             <CustomButton
              title='Are You facing any trouble?'
              primary
              onPress={onPress}
              style={{width:'70%', alignSelf:'center', marginTop:10}}
              />
         

        </View>
    )
}
const styles = StyleSheet.create({
  home:{
    // marginTop:"10%",
  },
    map: {
      width:"100%",
      height:"80%"
    },
   });

export default index;

//<CustomHeader isHome={true} title='Home' />
