import React from 'react';
import {useState} from 'react';
import {Center,NativeBaseProvider, 
  Box,Heading,VStack,FormControl,Input,Button,Spinner,ScrollView} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { registerUser} from '../../../config/firebase';


export default function SignUp({navigation})
{
   const [name,setName] = useState('');
   const [email,setEmail] = useState('');
   const [contact,setContact] = useState('');
   const [password,setPassword] = useState('');
   const [hidePass, setHidePass] = useState(true);
   const [loading,setLoading] = useState(false);
  //  const [option, setOption] = useState("user");
  

   const signup = async () =>{
  
       setLoading(true);
       
      
        try{
      
          await registerUser({name,email,contact,password});
          navigation.goBack();
          // console.log(user);
          // dispatch(updateUser(user));
         
          
         //  console.log(user.uid);
         //  console.log(email,password);
         //  console.log('User account created & signed in!');
         //  const temp =auth().currentUser;
         //  console.log(temp);
        }
        catch(e)
       {  if (e.code === 'auth/email-already-in-use') {
             alert('That email address is already in use!');
           }
       
           else if (e.code === 'auth/invalid-email') {
             alert('That email address is invalid!');
           }
            console.log(e)
        }
        
      setLoading(false);
      
       
      //  else 
      //  {
      //   try{
      
      //     const id = await registerMechanic({name,email,contact,password});
      //     navigation.navigate("MechanicRegistration",id);
      //     // console.log(user);
      //     // dispatch(updateUser(user));
         
          
      //    //  console.log(user.uid);
      //    //  console.log(email,password);
      //    //  console.log('User account created & signed in!');
      //    //  const temp =auth().currentUser;
      //    //  console.log(temp);
      //   }
      //   catch(e)
      //  {  if (e.code === 'auth/email-already-in-use') {
      //        alert('That email address is already in use!');
      //      }
       
      //      else if (e.code === 'auth/invalid-email') {
      //        alert('That email address is invalid!');
      //      }
      //       console.log(e)
      //   }

         
     
      //  setLoading(false);
      //  return;
      // }

     

    }
    // const handleChange = (event) => setValue(event.target.value)

   return(
    
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
      Welcome
    </Heading>
    <Heading
      mt="1"
      color="coolGray.600"
      _dark={{
        color: "warmGray.200",
      }}
      fontWeight="medium"
      size="xs"
    >
      Sign up to continue!
    </Heading>
    <VStack space={3} mt="5">
      <FormControl isRequired>
         <FormControl.Label> Name</FormControl.Label>
         <Input value={name} onChangeText={(text) => setName(text)}/>
      </FormControl>
      <FormControl isRequired>
        <FormControl.Label>Contact No.</FormControl.Label>
        <Input keyboardType="numeric" maxLength={11} value={contact} onChangeText={(text) => setContact(text)}/>
      </FormControl>
      <FormControl isRequired>
      <FormControl.Label>Email</FormControl.Label>
      <Input keyboardType="email-address" value={email} onChangeText={(text) => setEmail(text)}/>
      </FormControl>
      
      <FormControl isRequired>
        <FormControl.Label>Password</FormControl.Label>
        <Input type={hidePass ? 'password' : 'text'} value={password}
         onChangeText={(text) => setPassword(text)} 
         InputRightElement={
            <Icon
            name={hidePass ? 'eye-slash' : 'eye'}
            size={25}
            color="black"
            onPress={() => setHidePass(!hidePass)}
          />
          } isRequired={true}/>
      </FormControl>
      
     {loading? <Spinner color="emerald.500" size="lg"/>: 
      <Button mt="2" colorScheme="primary" onPress={signup}>
     Sign up
   </Button>}
    
     
    </VStack>
  </Box>
  </Center>
  </ScrollView>
  </NativeBaseProvider>
   )
}


// function onAuthStateChanged(user) {
//   setUser(user);
//   if (initializing) setInitializing(false);
// }

// useEffect(() => {
//   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//   return subscriber; // unsubscribe on unmount
// }, []);

// const user = await auth().onAuthStateChanged()