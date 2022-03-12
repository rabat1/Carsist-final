import React,{useState} from 'react';
import {
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    HStack,
    Spinner,
    AlertDialog,
    Modal,
    Radio
  } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Center,NativeBaseProvider} from "native-base";
import { useDispatch} from 'react-redux';
import {loginUser,getUser,updateStatus,getMechanic,generateUserToken} from '../../../config/firebase';
import { updateUser } from '../../../store/actions/userAction';

export default function Login({ navigation })
{
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [loading,setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [option, setOption] = useState("user")

  const onClose = () => setIsOpen(false)
  const dispatch = useDispatch();


  const login = async () =>{
      setLoading(true);
      try{
        // start
        var user = await loginUser(email,password);
        if(user.emailVerified === true)
        { 
          
          
          const data = await getUser(user.uid);
          generateUserToken(user.uid,true);
            //console.log(data);
            if(data !== undefined)
            {
              dispatch(updateUser(data));
            }
           
            
          
        }
        else setIsOpen(true);
      }
      catch(e)
      {
        // start of catch
      //undefined is not an object (evaluating '_data.email')
        //undefined is not an object (evaluating '_data.id = uid')
        if(e.message=="undefined is not an object (evaluating '_data.id = uid')")
        {
          // try{
          //   var user2 = await loginUser(email,password);
          //   if(user2.emailVerified === true)
          //   {
          //     const data = await getMechanic(user2.uid);
          //     if(data.status === "pending")
          //     {
          //       alert("your status is still pending");
          //     }
          //     else dispatch(updateUser(data));
          //   }
          //   else alert("you have not verified your email");
           
          // }
          // catch(e)
          // {
          //   alert(e.message);
          // }
           try{
            var user2 = await loginUser(email,password);
            // console.log("user2",user2);
            if(user2.emailVerified === true)
            {
              // console.log(" am here ");
              generateUserToken(user2.uid,false);
              // console.log(user2);
              const data = await getMechanic(user2.uid);
              // console.log("dataaa",data);
              if(data.status == "pending")
              {
                alert("your status is still pending");
              }
              else if (data.status=="rejected")
              {
                alert("sorry, you can't use app, please check your email. ");
              }
              else if (data.status=="accepted")
              {  
                // console.log(" am here 2");
                 dispatch(updateUser(data));
              }
            
           }
           else setIsOpen(true);
            
          }
          catch(e)
          {
            if(e.message =="The password is invalid or the user does not have a password.")
            {
              alert("password is wrong");
            }
          }
          
         
        }
        else 
        {
          if(e.message =="The password is invalid or the user does not have a password.")
          {
            alert("password is wrong");
          }
           
          console.log(e.message);
          alert(e.message);
        }
       
        
      }
      setLoading(false);
  }

    return (
      <NativeBaseProvider>
        <Center flex={1} px="3">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Sign in to continue!
          </Heading>
    
          <VStack space={3} mt="5">
            <FormControl isRequired>
              <FormControl.Label>Email ID</FormControl.Label>
              <Input keyboardType="email-address" value={email} onChangeText={(text) => setEmail(text)} isRequired={true}/>
            </FormControl>
            <FormControl isRequired>
        <FormControl.Label>Password</FormControl.Label>
        <Input type={hidePass ? 'password' : 'text'} value={password} onChangeText={(text) => setPassword(text)}  InputRightElement={
            <Icon
            name={hidePass ? 'eye-slash' : 'eye'}
            size={20}
            color="black"
            onPress={() => setHidePass(!hidePass)}
          />
          } isRequired={true}/>
      
            </FormControl>
           
            {loading? <Spinner color="emerald.500" size="lg"/>: 
               <Button mt="2" colorScheme="primary" onPress={login}>
                Login
              </Button>
           }
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                I'm a new user.{" "}
              </Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                href="#"
                onPress={() => setShowModal(true)}
              >
                Sign Up
              </Link>
              <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Sign Up</Modal.Header>
                <Modal.Body>
                <FormControl>
                <FormControl.Label>Are you?</FormControl.Label>
                <Radio.Group
                name="myRadioGroup"
                accessibilityLabel="choose option"
                value={option}
                onChange={(nextValue) => {
                  setOption(nextValue)
                }}
              >
                <Radio value="user" my={1}>
                  User
                </Radio>
                <Radio value="mechanic" my={1}>
                  Mechanic
                </Radio>
              </Radio.Group>
              </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                      onPress={() => {
                        setShowModal(false);
                        option === "user"? navigation.navigate('SignUp') : navigation.navigate('MechanicRegistration');
                      }}
                    >
                      continue
                    </Button>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
            
            </HStack>
          </VStack>
        </Box>
        <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Body>
            Please verify your email
          </AlertDialog.Body>
         
        </AlertDialog.Content>
      </AlertDialog>
        </Center>
        </NativeBaseProvider>

    );


}