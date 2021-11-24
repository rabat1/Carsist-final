import React from 'react';
import {useState} from 'react';
import {Center,NativeBaseProvider, Box,Heading,VStack,FormControl,Input,Button,Radio,Spinner,Image} from "native-base";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function MechanicRegistration()
{
  const [imageUriGallary, setimageUriGallary] = useState('');
  const [name,setName]  = useState('');
  const [address,setAddress] = useState('');
  const [loading,setLoading] = useState(false);
  const openGallery = () => {
    const options = {
    storageOptions: {
    path: 'images',
    mediaType: 'photo',
    }
    };
    
    launchImageLibrary(options, response => {
    console.log( 'Responsehhhhhhhhh =', response);
    if (response.didCancel) {
    console.log('User cancelled image picker');
    } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
    } else {
    // You can also display the image using data:
    // const source =  'data:image/jpeg;base64,' + response.base64;
    const source = response.uri;
    setimageUriGallary(source);
    }
    });
    };

  return(
    <NativeBaseProvider>
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
    <VStack space={3} mt="5">
      <FormControl isRequired>
         <FormControl.Label> Shop Name</FormControl.Label>
         <Input value={name} onChangeText={(text) => setName(text)}/>
      </FormControl>
      <FormControl isRequired>
         <FormControl.Label> Shop Address</FormControl.Label>
         <Input value={address} onChangeText={(text) => setAddress(text)}/>
      </FormControl>
      <Image
              size="xl"
              resizeMode="cover"
              source={{
                uri:imageUriGallary
              }}
              alt={"no image"}
            />
      <FormControl>
      <FormControl.Label> Shop Image</FormControl.Label>
      <Button mt="2" colorScheme="primary" onPress={openGallery}>Select your Shop Image</Button>
      </FormControl>
    
     {loading? <Spinner color="emerald.500" size="lg"/>: 
      <Button mt="2" colorScheme="primary">
     Submit
   </Button>}
    
     
    </VStack>
  </Box>
  </Center>
  </NativeBaseProvider>
  );
}