import React, { useEffect,useState } from 'react';
import {NativeBaseProvider,Box,Stack,Heading,Text,HStack,Center,Image,Button,Modal,Spinner,VStack} from "native-base";
import { useSelector } from 'react-redux';
import MapView, { PROVIDER_GOOGLE ,Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import { View,StyleSheet,Dimensions} from 'react-native';
import { updateRide } from '../../../../config/firebase';

import { useNavigation, useRoute } from '@react-navigation/core'


const index = () => {
    const [request,setRequest] = useState();
    const [pass,setPass] =useState();
    const [showModal, setShowModal] = useState(false);
    const [working,setWorking] = useState(false);
    const user = useSelector(state => state.userReducer.user);
    const {navigate}=useNavigation();


    
  useEffect(() => {
    const subscriber = firestore()
      .collection('rides')
      .where('mechanicId', '==', user.id)
      .where('status', '==','pending')
      .onSnapshot(querySnapshot => {
        let data = [];

        querySnapshot.forEach(documentSnapshot => {
          data.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        // console.log(data);
        setRequest(data[0]);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const accepted = async ()=>{
    await updateRide(request.id,"accepted");
    setPass(request);
    setWorking(true);
   
  
  }
    return (
        <NativeBaseProvider>
        {request? 
        (<Center flex={0.5}>
        <Box alignItems="center">
        <Box mt="20" w="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700"
        }} _web={{
        shadow: 2,
        borderWidth: 0
        }} _light={{
        backgroundColor: "gray.50"
        }}>
        
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
               New Request
              </Heading>
              <Text fontSize="md" _light={{
              color: "violet.500"
            }} _dark={{
              color: "violet.400"
            }} fontWeight="500" ml="-0.5" mt="-1">
                Issue :  {request.issue}
              </Text>
            </Stack>
            <Text fontWeight="400">
            Username : {request.username}
            </Text>
            <Text fontWeight="400">
            Phone No : {request.userphone}
            </Text>
            {request.pickup.name && (<Text fontWeight="400">
            Location : {request.pickup.name}
            </Text>)}
            {request.pickup.address && ( <Text fontWeight="400">
            Address : {request.pickup.address}
            </Text>)}
           
            <Button size="lg" bg="yellow.600" onPress={() => setShowModal(true)}>View Location On Map</Button>
            <HStack alignItems="center" space={4} justifyContent="space-between">
            
              <Button size="lg" bg="green.700" onPress={accepted}>Accept</Button>
              <Button size="lg" bg="red.700" onPress={() => console.log("hello world")}>Reject</Button>

            
            </HStack>
          </Stack>
        </Box>
        </Box>
        </Center>): (<Center flex={0.5}>
          <Box alignItems="center">
          <Box mt="20" w="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700"
          }} _web={{
          shadow: 2,
          borderWidth: 0
          }} _light={{
          backgroundColor: "gray.50"
          }}>
          
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1">
                 No New Request
                </Heading>
               </Stack>
            </Stack>
          </Box>
          </Box>
          </Center>)}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Client Location</Modal.Header>
          <Modal.Body>
         {request &&(<MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          region={{
            latitude:request.pickup.latitude, 
            longitude:request.pickup.longitude,
            latitudeDelta: 0.033,
            longitudeDelta: 0.033,
         }}
       >
       <Marker
       coordinate={{
         latitude:request.pickup.latitude,
         longitude:request.pickup.longitude,
       }}
     />

      
        </MapView>)}
          
          </Modal.Body>
          
        </Modal.Content>
      </Modal>
      {working &&  <Center flex={1}><VStack space={2} alignItems="center">
      <Spinner accessibilityLabel="Loading posts" size="lg" color="black"/>
      <Heading color="black" fontSize="md">
        work in progress
      </Heading>
      <Heading color="black" fontSize="md">
        Click below button when work is done!
      </Heading>
      <Button size="lg" bg="black" onPress={()=>{setWorking(false);
        navigate("Slip",{pass});}}>Generate Slip</Button>

    </VStack>
    </Center>}
       
      
        </NativeBaseProvider>
    
      
    )
}
 
const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").height * 0.5,
  },
});

export default index;

// <Modal.Footer>
//             <Button onPress={checkPassword}>continue</Button>
//           </Modal.Footer>


