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
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../../../Components/CustomButton";

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
      <SafeAreaView style={{minHeight:'100%',backgroundColor:'white'}}>
      <Center flex={1} px="3" style={{marginHorizontal:20}}>
        {status === "pending" && (
          <HStack space={5} alignItems="center">
            <Spinner accessibilityLabel="Loading posts" size="lg" color={Colors.primaryDark}/>
            <Heading color={Colors.primaryDark} fontSize="md">
             Confirming Your Mechanic...
            </Heading>
          </HStack>
        )}

        {status === "accepted" && (
          <HStack space={5} alignItems="center">
          <Spinner accessibilityLabel="Loading posts" size="lg" color={Colors.primaryDark}/>
          <Heading color={Colors.primaryDark} fontSize="md" style={{marginRight:'5%'}}>
            Mechanic is on it's way and ready to serve you !!
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
              Cost :    {details.cost}
              </Text>
              <Text fontWeight="400">
              Services :   {details.service_name}
              </Text>
              <Text fontWeight="400">
              Odometer :  {details.odometer}
              </Text>
              <Text fontWeight="400">
              Date:   {details.date}
              </Text>
            {details.payment == "not done" &&
             <VStack alignItems="center" space={4} justifyContent="space-between"> 
              

             <Text fontWeight="400" color="red">
              You have not done payment yet!! Please Pay it directly to mechanic or do online payment:
             </Text>
    <CustomButton primary title="Online Payment" style={{minWidth:'80%'}} onPress={() => navigation.navigate("stripe")} />
                
              </VStack> 
            }
           
             <Button size="md" bg={Colors.primaryDark} 
             onPress={() => {Alert.alert("Service Completed"); navigate("giveRating",{details})}}>
             {/* can send element to print mechanic Name */}
               Ok</Button>
                

            
           
            </Stack>
          </Box>
          </Box>
          )}
      </Center>
      </SafeAreaView>
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


//   {
//     details.payment == "done" && 
    
// <<<<<<< HEAD
//     </VStack>}
//     {details.payment == "done" && 
    
//     <Button size="md" bg="green.700" onPress={() => {Alert.alert("Service Completed");
//      navigation.navigate("home")}}>Ok</Button>}
// =======
//     <Button size="md" bg={Colors.primaryDark} 
//     onPress={() => {Alert.alert("Service Completed"); navigate("giveRating",{details})}}>
//     {/* can send element to print mechanic Name */}
//       Ok</Button>
//        } 
// >>>>>>> 111d01b8a947fb42fbd556f55436f7e955ebb38d
   
  
// {
//   details.payment == "done" && 
  
// <<<<<<< HEAD
//   </VStack>}
//   {details.payment == "done" && 
  
//   <Button size="md" bg="green.700" onPress={() => {Alert.alert("Service Completed");
//    navigation.navigate("home")}}>Ok</Button>}
// =======