import React, { useEffect, useState } from "react";
import {
  HStack,
  Heading,
  Spinner,
  Center,
  NativeBaseProvider,
  Text,
} from "native-base";
import { View,StyleSheet, Dimensions} from "react-native";
import firestore from '@react-native-firebase/firestore';

export default function Request({ navigation, route }) {
  const [status, setStatus] = useState();
  const [details,setDetails] = useState();
  const { docid} = route.params;
  
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
            <Spinner accessibilityLabel="Loading posts" size="lg" color="black"/>
            <Heading color="black" fontSize="md">
              Confirming Your Mechanic
            </Heading>
          </HStack>
        )}

        {status === "accepted" && (
          <HStack space={2} alignItems="center">
          <Spinner accessibilityLabel="Loading posts" size="lg" color="black"/>
          <Heading color="black" fontSize="sm">
            Mechanic is on it's way 
            and ready to serve you!
          </Heading>
        </HStack>
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