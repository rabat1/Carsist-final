import React,{useState} from 'react';
import {View, Text,Alert} from 'react-native';
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { CustomHeader } from '../../../Navigation/CustomHeader';
import { NativeBaseProvider,Box,Button,Stack,HStack,Spinner} from 'native-base';
import {addExpense,confirmPayment} from '../../../../config/firebase';


const index = ({route,navigation}) => {
 const [loading,setLoading] = useState(false);
  const {id,form,userId} = route.params;

  const confirmPay = async ()=>{
    setLoading(true);
    await confirmPayment(id);
    await addExpense(form,userId);
    setLoading(false);
     Alert.alert('Congratulations, you have completed service!');
  navigation.navigate("home");

  }
  return (
    
    <NativeBaseProvider>
    

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
     
      <Text fontWeight="400">
       If you have received payment , please click below button:
      </Text>
   
    
      <HStack alignItems="center" space={4} justifyContent="space-between">
      {loading? <Spinner color="emerald.500" size="lg"/>: 
      <Button size="md" bg="green.700" onPress={confirmPay}>Payment received</Button>
           }
       
      </HStack>
    </Stack>
  </Box>
  </Box>
  
   
   </NativeBaseProvider>
  );
};

export default index;






