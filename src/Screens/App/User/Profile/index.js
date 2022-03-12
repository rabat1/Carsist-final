import React,{useState,useEffect} from 'react';
import {Center,NativeBaseProvider, 
  Box,Heading,VStack,FormControl,Input,Button,Spinner,ScrollView,TextArea} from "native-base";
import { getUser,updateUserProfile,getMechanic,updateMechanicProfile} from '../../../../config/firebase'
import {useSelector,useDispatch} from 'react-redux';
import {updateUser} from '../../../../store/actions/userAction';

const index = ({navigation}) => {
  const dispatch = useDispatch();
    const [name,setName] = useState();
    const [contactno,setContactNo] = useState();
    const [services,setServices] = useState();
    const [loading,setLoading] = useState(false);
    const user = useSelector(state => state.userReducer.user);
     //console.log('user getting tttt',user);

    useEffect(() => {
      async function fetchData() {
          // You can await here
          try{
         if(user.mechanic == false)
         {
          let tempUser = await getUser(user.id);
          setName(tempUser.name);
          setContactNo(tempUser.contact);
         }
         else if(user.mechanic == true)
         {
          let tempUser = await getMechanic(user.id);
          setName(tempUser.name);
          setContactNo(tempUser.contact);
          setServices(tempUser.services);
         }
          
          
        } catch(e){
          console.log(e);
        }
      } 
        fetchData()
    }, [])

    const updateProfile = async ()=>{
        setLoading(true);
        if(user.mechanic == false){
       await updateUserProfile({name,contactno,user});
        const u = await getUser(user.id);
        dispatch(updateUser(u));
      }
      else if(user.mechanic == true)
      {
        await updateMechanicProfile({name,contactno,services,user});
        const u2 = await getMechanic(user.id);
        dispatch(updateUser(u2));
      }
     
       setLoading(false);
      navigation.navigate('HomeTab');
     
    }

    return (
        
    <NativeBaseProvider>
    <ScrollView
    _contentContainerStyle={{
      px: "20px",
      mb: "4",
      minW: "72",
    }}
  >
    <Center flex={1} px="3">
    <Box safeArea p="2" w="90%" maxW="290" py="8">
    <Heading
      size="lg"
      color="coolGray.800"
      _dark={{
        color: "warmGray.50",
      }}
      fontWeight="semibold"
    >
      Profile
    </Heading>
    
    <VStack space={3} mt="5">
      
      {name &&  <FormControl isRequired>
      <FormControl.Label> Name</FormControl.Label>
      <Input value={name} onChangeText={(text) => setName(text)}/>
      </FormControl>}
        
      {contactno &&   <FormControl isRequired>
        <FormControl.Label>Contact No.</FormControl.Label>
        <Input keyboardType="numeric" maxLength={11} value={contactno} onChangeText={(text) => setContactNo(text)}/>
      </FormControl>}
     
      {services &&   <FormControl isRequired>
        <FormControl.Label>Services</FormControl.Label>
        <TextArea h={20}  w="75%" maxW="300"  value={services} onChangeText={(text) => setServices(text)}/>
      </FormControl>}
    
     
      
      
      {loading? <Spinner color="emerald.500" size="lg"/>: 
      <Button mt="2" colorScheme="primary" onPress={updateProfile}>
     Update
   </Button>}
    
     
    </VStack>
  </Box>
  </Center>
  </ScrollView>
  </NativeBaseProvider>
    )
}

export default index
