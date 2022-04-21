import React, { useState, useEffect } from "react";
import { View, Text,TouchableOpacity,StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/core';
import {useSelector} from 'react-redux';
import MapView, { PROVIDER_GOOGLE ,Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import Icon from 'react-native-vector-icons/FontAwesome5';

import {
    Input,
    Button,
    NativeBaseProvider,
    Center,
    FlatList,
    Box,
    VStack,
    Pressable,
    AlertDialog
  } from "native-base";

  export default function PickupLocation({navigation,route }) {

    // console.log('params' ,route.params);
    const {form} = route.params;
   const [location, setLocation] = useState();
   const [value, setValue] = useState("");
    const [result, setResult] = useState();
   const [pickup, setPickup] = useState();
   const [isOpen, setIsOpen] = useState(false)
   const [latitude,setLatitude]=useState();
   const [longitude,setLongitude]=useState();
  
  //  console.log('i am user', user);
   const onClose = () => setIsOpen(false)


  
  useEffect(()=>{

    Geolocation.getCurrentPosition(info => {setLatitude(info['coords']['latitude']);
    setLongitude(info['coords']['longitude']);});

  },[])

  const handle = (text) => {
    setValue(text);
    setResult();
  };
  const currentLocation = () =>{
   
    Geolocation.getCurrentPosition(info => {setLatitude(info['coords']['latitude']);
    setLongitude(info['coords']['longitude']);
    let temp={};
    temp.latitude= info['coords']['latitude'];
    temp.longitude= info['coords']['longitude'];
    setPickup(temp);
     });
  
    setIsOpen(true);
   
  }
 

   const pickupSelection = (item) =>{
    const temp = {};
    temp.latitude = item["geocodes"]["main"]["latitude"]
    temp.longitude= item["geocodes"]["main"]["longitude"]
    temp.name=item["name"]
    temp.address = item["location"].address + ' ' + item["location"].locality
    setPickup(temp)
    setIsOpen(true)
    setLocation(item["geocodes"]["main"]);
   setLatitude(item["geocodes"]["main"]["latitude"]);
    setLongitude(item["geocodes"]["main"]["longitude"]);
    setResult();
  
   }
 
   const searchLocation = async () => {
      //  const latitude_ = location.coords.latitude;
      //  const longitude_ = location.coords.longitude;
      //  console.log(longitude_, latitude_,value);
    // const { latitude, longitude} = location;
     const res = await fetch(
       `https://api.foursquare.com/v3/places/search?query=${value}&ll=${latitude},${longitude}&radius=600&limit=15`,
       {
         method: "GET",
         headers: {
           Accept: "application/json",
           Authorization: "fsq3EJNEcyb9GmLWEC+izjE0RmlbJ2yZuuP/pOmFOhTdqFA=",
         },
       }
     );
     const response = await res.json();
     //console.log(response["results"]);
     if(response["results"] != []){
      setResult(response["results"]);
     }
     
  //    const re = response["results"]; // this will be array
   
  //    console.log(
  //        re,
  //      re[0],
  //      re[0].location.address,
  //      re[0].location.locality,
  //      re[0].name,
  //      re[0].geocodes.main.latitude,
  //      re[0].geocodes.main.longitude
  //    );
  };
 
 
   return (
     <NativeBaseProvider>
       <Input
         size="xl"
         h="60px"
         InputLeftElement={
           <Icon
           name={'search-location'}
           size={30}
            color="black"
           />
         }
         isFullWidth={true}
         placeholder="Search Pickup"
         InputRightElement={
           <Button
             size="md"
             rounded="none"
             w="1/4"
             h="full"
             bg="green.700"
             onPress={searchLocation}
           >
             search
           </Button> 
         }
         mb="6"
         onChangeText={handle}
       />
       {result && (
         <FlatList
           data={result}
           renderItem={({ item }) => (
             <Pressable
               onPress={() => {
                 pickupSelection(item);
               }}
             >
               {({ isHovered, isFocused, isPressed }) => {
                 return (
                   <Box
                     borderBottomWidth="1"
                     _dark={{
                       borderColor: "gray.600",
                     }}
                     borderColor="coolGray.200"
                     pl="4"
                     pr="5"
                     py="2"
                     bg={
                       isPressed ? "dark.600" : isHovered ? "dark.600" : "white"
                     }
                   >
                     <VStack>
                       <Text
                         _dark={{
                           color: "warmGray.50",
                         }}
                         color="coolGray.800"
                         bold
                       >
                         {item["name"]}
                       </Text>
                       <Text
                         color="coolGray.600"
                         _dark={{
                           color: "warmGray.200",
                         }}
                       >
                         {item["location"].address} {item["location"].locality}
                       </Text>
                     </VStack>
                   </Box>
                 );
               }}
             </Pressable>
           )}
           keyExtractor={(item) => item.id}
           zIndex={2}
           position="absolute"
           mt="16"
           width="100%"
          
         />
       )}
       <MapView
       style={styles.map}
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       region={{
         latitude: latitude || 24.908040851439186, 
         longitude:  longitude || 67.11852547690728,
         latitudeDelta: 0.033,
         longitudeDelta: 0.033,
      }}
    >
    <Marker
    coordinate={{
      latitude: latitude || 24.907636522606577,
      longitude: longitude || 67.11521435271561,
    }}
  />
   
     </MapView>
      
      
 
     <TouchableOpacity
     style={{alignItems: "center",
     backgroundColor: "#DDDDDD",
     padding: 10,
      margin:10}}
     onPress={() =>currentLocation()}
   >
     <Text>select current location as Pickup</Text>
   </TouchableOpacity>
     {pickup && <AlertDialog
           isOpen={isOpen}
           onClose={onClose}
         >
           <AlertDialog.Content>
             <AlertDialog.CloseButton />
             <AlertDialog.Body>
             pickup selected name : {pickup.name? pickup.name:'not define'}  address : {pickup.address? pickup.address:'not define'}
             latitude : {pickup.latitude}  longitude : {pickup.longitude}
             </AlertDialog.Body>
           
           </AlertDialog.Content>
         </AlertDialog>}
    
      {pickup && <Button size="md" variant="white" bg="green.700" w="70%" h="12" marginLeft="16" marginTop="7"
      onPress={() => navigation.navigate('mechanicSelection',{pickup,form})}>
     choose mechanic
     </Button>}
     
 
     </NativeBaseProvider>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: "#fff",
     alignItems: "center",
     justifyContent: "center",
   },
   map: {
     width: Dimensions.get("window").width,
     height: Dimensions.get("window").height * 0.5,
   },
 });
 