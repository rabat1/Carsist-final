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
import {loginUser,getUser,updateStatus} from '../../../config/firebase';
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
        const user = await loginUser(email,password);
        if(user.emailVerified === true)
        { 
          const data = await getUser(user.uid);
        //is se check karo data main id wohi hai jo furebase par hai to means reducer se expense list mn user lo wahan se id lo or listget mn send
          console.log(data.id);
          dispatch(updateUser(data));
           
        }
        else setIsOpen(true);
      }
      catch(e)
      {
        alert(e.message);
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