import React from 'react';
import {useState} from 'react';
import {View,Center,NativeBaseProvider, Box,Heading,VStack,FormControl,
  Input,Button,Spinner,Image,TextArea,ScrollView,Divider} from "native-base";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {registerMechanic,uploadMechanicInfo} from '../../../config/firebase';

export default function MechanicRegistration({navigation})
{
  // console.log('params' + route.params);
  // const id = route.params;
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [contact,setContact] = useState('');
  const [password,setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [loading,setLoading] = useState(false);
  const [shopImage, setShopImage] = useState();
  const [shopName,setShopName]  = useState('');
  const [address,setAddress] = useState('');
  const [cnic , setCnic] = useState('');
  const [slipImage,setSlipImage] = useState();
  const [services,setServices] = useState('');

  
  
  const register = async () =>{
    setLoading(true);
    //  const url = await uploadImage(imageUriGallary);
    //  console.log(url);
    const validateCNIC = (cnic) => {
      var re = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
      return re.test(cnic);
    };
    if (!validateCNIC(cnic)) {
      // not a valid email
      console.log('not a valid cnic')
      return; 
    }
      try{
    
        await registerMechanic({name,email,contact,password,shopName,address,services,cnic,slipImage,shopImage});
        setLoading(false);
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
    //const data = await uploadMechanicInfo({id,shopName,address,services,cnic,slipImage,shopImage});
    //  console.log(data);

  }

  const openGallery = () => {
    const options = {
    storageOptions: {
    path: 'images',
    mediaType: 'photo',
    }
    };
    setShopImage();
    launchImageLibrary(options, response => {
    // console.log( 'Response=', response["assets"][0]);
    if (response.didCancel) {
    console.log('User cancelled image picker');
    } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
    } else {
    // You can also display the image using data:
    // const source =  'data:image/jpeg;base64,' + response.base64;
    // const source = response.uri;
    setShopImage(response["assets"][0]);
     console.log(shopImage);
    }
    });
    };

    const openGallery2 = () => {
      const options = {
      storageOptions: {
      path: 'images',
      mediaType: 'photo',
      }
      };
      
      setSlipImage();
      launchImageLibrary(options, response => {
      // console.log( 'Response=', response["assets"][0]);
      if (response.didCancel) {
      console.log('User cancelled image picker');
      } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      } else {
      // You can also display the image using data:
      // const source =  'data:image/jpeg;base64,' + response.base64;
      // const source = response.uri;
      setSlipImage(response["assets"][0]);
      }
      });
      };

  
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
      Mechanic Details
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
      Enter your details to continue!
    </Heading>
    <VStack space={6} mt="5">
      <FormControl isRequired>
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
         <FormControl.Label> Shop Name</FormControl.Label>
         <Input value={shopName} onChangeText={(text) => setShopName(text)}/>
      </FormControl>
      <FormControl isRequired>
         <FormControl.Label> Shop Address</FormControl.Label>
         <Input value={address} onChangeText={(text) => setAddress(text)}/>
      </FormControl>

      <FormControl isRequired>
      <FormControl.Label>CNIC</FormControl.Label>
      <Input value={cnic} onChangeText={(text) => setCnic(text)} placeholder="XXXXX-XXXXXXX-X"/>
      </FormControl>
      <Divider />
      {shopImage && 
        <View>
        <Image
        size="xl"
        resizeMode="cover"
        source={{
          uri:shopImage.uri
        }}
        alt={"no image"}
        />
        <Button mt="1" size="xs" bgColor="red.700" w="50%" onPress={() => setShopImage()}>
         Remove
      </Button>
      </View>}
      
      <FormControl>
      <FormControl.Label> Shop Image</FormControl.Label>
      <Button mt="2" onPress={openGallery} bgColor="primary.800">Select your Shop Image</Button>
      </FormControl>
      <Divider />
      {slipImage && <View><Image
        size="xl"
        resizeMode="cover"
        source={{
          uri:slipImage.uri
        }}
        alt={"no image"}
        /> 
      <Button mt="1" size="xs" bgColor="red.700" w="50%" onPress={() => setSlipImage()}>
        Remove
       </Button>
     </View>}
    
     
      <FormControl>
      <FormControl.Label> Shop Registration Document Image</FormControl.Label>
      <Button mt="2" onPress={openGallery2} bgColor="primary.800">Select Shop Registration Document Image</Button>
      </FormControl>
      
      <Divider />
      <FormControl>
      <FormControl.Label>Set of services available</FormControl.Label>
      <TextArea
      h={20}
      placeholder="please list services that will be provided by you"
      w={{
        base: "100%",
        md: "25%",
      }}
      value={services}
      onChangeText={(text) => setServices(text)}
      />
      </FormControl>
    
     {loading? <Spinner color="emerald.500" size="lg"/>: 
      <Button mt="2" bgColor="primary.600" onPress={register}>
     Submit
   </Button>}
    
     
    </VStack>
  </Box>
  </Center>
  </ScrollView>
  </NativeBaseProvider>
  );


}


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
