import React, { useEffect, useState } from "react";
import {
  Heading,
  Spinner,
  Center,
  NativeBaseProvider,
  Text,
  Stack,
  HStack,
  Button,
  VStack,
  Box
} from "native-base";
import { View,StyleSheet, Dimensions,Alert} from "react-native";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import Colors from "../../../../Utils/Colors";

export default function Request({ navigation, route }) {
  const [status, setStatus] = useState();
  const [details,setDetails] = useState();
  const { docid,element} = route.params;
  const {navigate}= useNavigation();
  
  useEffect(() => {

    // for listening to real time changes
    const subscriber = firestore()
      .collection('rides')
      .doc(docid)
      .onSnapshot(documentSnapshot => {
        // console.log('data: ', documentSnapshot.data());
        setDetails(documentSnapshot.data());
        setStatus(documentSnapshot.data()["status"]);
      
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        {status === "pending" && (
          <HStack space={2} alignItems="center">
            <Spinner accessibilityLabel="Loading posts" size="lg" color={Colors.primaryDark}/>
            <Heading color={Colors.primaryDark} fontSize="md">
              Confirming Your Mechanic
            </Heading>
          </HStack>
        )}

        {status === "accepted" && (
          <HStack space={2} alignItems="center">
          <Spinner accessibilityLabel="Loading posts" size="lg" color={Colors.primaryDark}/>
          <Heading color={Colors.primaryDark} fontSize="sm">
            Mechanic is on it's way 
            and ready to serve you!
          </Heading>
        </HStack>
        )}

        {status === "done" && (
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
              <Stack space={2} alignItems='center'>
                <Heading size="md" ml="-1" color={Colors.primary} >
                 Service Done 
                </Heading>
                <Text fontSize="md" _light={{
                color: Colors.primaryDark
              }} _dark={{
                color: "violet.400"
              }} fontWeight="500" ml="-0.5" mt="-1">
                 Service Done By : {element.name}
                </Text>
              </Stack>
             
              <Text fontWeight="400">
              Cost : {details.cost}
              </Text>
              <Text fontWeight="400">
              Services : {details.service_name}
              </Text>
              <Text fontWeight="400">
              Odometer: {details.odometer}
              </Text>
              <Text fontWeight="400">
              Date: {details.date}
              </Text>
             {details.payment == "not done" &&<VStack alignItems="center" space={4} justifyContent="space-between">
              

             <Text fontWeight="400" color="red">
              You have not done payment yet , pay it to mechanic or do online payment:
             </Text>
               <Button size="md" bg="green.700" onPress={() => navigation.navigate("stripe")}>Online Payment</Button>
     
             
             </VStack>}
             {details.payment == "done" && 
             
             <Button size="md" bg={Colors.primaryDark} 
             onPress={() => {Alert.alert("Service Completed"); navigate("giveRating",{details})}}> 
             {/* can send element to print mechanic Name */}
               Ok</Button>}
            
           
            </Stack>
          </Box>
          </Box>
          )}
      </Center>
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
  });