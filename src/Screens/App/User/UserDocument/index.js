import React, {useEffect, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {
  Box,
  FlatList,
  Avatar,
  HStack,
  Text,
  Button,
  Modal,
  FormControl,
  Input,
  NativeBaseProvider,
  Center,
  Spinner,
  VStack,
  Spacer,
  Pressable,
  AlertDialog,
} from 'native-base';
import {CustomHeader} from '../../../../Navigation/CustomHeader';
import firestore from '@react-native-firebase/firestore';

import Colors from '../../../../Utils/Colors';

import {useSelector} from 'react-redux';
import {addUserDocument} from '../../../../config/firebase';

const index = ({navigation}) => {
  const [singleFile, setSingleFile] = useState();
  // const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [password3, setPassword3] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const onClose2 = () => setIsOpen2(false);
  const user = useSelector(state => state.userReducer.user);

  // useEffect(() => {

  //   async function fetchData()
  //   {
  //     const data = await getUserDocuments(user.id);
  //     // console.log('data-------------', data[0]['createdAt'].toDate());
  //    setDocuments(data);

  //   }
  // fetchData();
  // }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('UserDocuments')
      .where('uid', '==', user.id)
      .onSnapshot(querySnapshot => {
        let data = [];

        querySnapshot.forEach(documentSnapshot => {
          data.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setDocuments(data);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  const checkPassword = () => {
    if (password2 === password3) {
      navigation.navigate('Document', {currentUrl});
    } else setIsOpen(true);
    setShowModal2(false);
  };
  const selectOneFile = async () => {
    //Opening Document Picker for selection of one file

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      // console.log('res : ' + JSON.stringify(res));
      // console.log('URI : ' + res.uri);
      // console.log('Type : ' + res.type);
      // console.log('File Name : ' + res.name);
      // console.log('File Size : ' + res.size);
      //Setting the state to show single file attributes
      setSingleFile(res);
      // setShowModal(true);
      setIsOpen2(true);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        // alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
      console.log('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const saveDocument = async () => {
    setLoading(true);
    await addUserDocument(singleFile[0], user.id, password);
    // console.log(url);
    // setUrl_(url);
    setLoading(false);
    // setShowModal(false);
    setIsOpen2(false);

    // navigation.navigate('Document', {currentUrl});
  };
  return (
    <NativeBaseProvider>
      <CustomHeader isHome={true} title="Documents" />
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.Body>Wrong Password</AlertDialog.Body>
          <Button colorScheme="danger" onPress={onClose}>
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog>

      {singleFile && (
        <AlertDialog isOpen={isOpen2} onClose={onClose2}>
          <AlertDialog.Content>
            <AlertDialog.Header>Upload Document</AlertDialog.Header>
            <AlertDialog.Body>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Name</Text>
                <Text color="blueGray.600">{singleFile[0].name}</Text>
              </HStack>
              <FormControl mt="3">
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  type={hidePass ? 'password' : 'text'}
                  value={password}
                  onChangeText={text => setPassword(text)}
                  InputRightElement={
                    <Icon
                      name={hidePass ? 'eye-slash' : 'eye'}
                      size={20}
                      color="black"
                      onPress={() => setHidePass(!hidePass)}
                    />
                  }
                  isRequired={true}
                />
              </FormControl>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              {loading ? (
                <Spinner color="emerald.500" size="lg" />
              ) : (
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setIsOpen2(false);
                    }}>
                    Cancel
                  </Button>
                  <Button onPress={saveDocument}>Save</Button>
                </Button.Group>
              )}
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      )}
      <Modal isOpen={showModal2} onClose={() => setShowModal2(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Enter Password</Modal.Header>
          <Modal.Body>
            <FormControl mt="3">
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                value={password2}
                onChangeText={text => setPassword2(text)}
                isRequired={true}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={checkPassword}>continue</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {documents && (
        <Box
          w={{
            base: '100%',
            md: '25%',
          }}>
          <FlatList
            data={documents}
            renderItem={({item}) => (
              <Pressable
                onPress={() => {
                  setShowModal2(true);
                  setPassword3(item.password);
                  setCurrentUrl(item.url);
                }}>
                {({isHovered, isFocused, isPressed}) => {
                  return (
                    <Box
                      borderBottomWidth="1"
                      _dark={{
                        borderColor: 'gray.600',
                      }}
                      borderColor="coolGray.200"
                      pl="4"
                      pr="5"
                      py="2"
                      bg={
                        isPressed
                          ? 'dark.600'
                          : isHovered
                          ? 'dark.600'
                          : 'white'
                      }>
                      <HStack space={3} justifyContent="space-between">
                        <Avatar
                          size="48px"
                          source={{
                            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMt_j8pt607rFJZ0ez2M8fuEhD8bQIHovZGcX_VoUIZF96M2tJflbVxbrGTuoRwPea_Go&usqp=CAU',
                          }}
                        />
                        <VStack>
                          <Text
                            _dark={{
                              color: 'warmGray.50',
                            }}
                            color="coolGray.800"
                            bold>
                            {item.name}
                          </Text>
                          <Text
                            color="coolGray.600"
                            _dark={{
                              color: 'warmGray.200',
                            }}>
                            {item.createdAt != null
                              ? item.createdAt.toDate().toDateString() +
                                ' ' +
                                item.createdAt
                                  .toDate()
                                  .toLocaleTimeString('en-US')
                              : ''}
                          </Text>
                        </VStack>
                        <Spacer />
                      </HStack>
                    </Box>
                  );
                }}
              </Pressable>
            )}
            keyExtractor={item => item.id}
          />
        </Box>
      )}
      <TouchableOpacity onPress={selectOneFile} style={styles.addButton}>
        <Icon name="plus" size={20} color={Colors.white} />
      </TouchableOpacity>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: Colors.secondary,
    width: 55,
    height: 55,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '75%',
    right: 20,
  },
  pdf: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    zIndex: 1,
  },
});

export default index;

//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMt_j8pt607rFJZ0ez2M8fuEhD8bQIHovZGcX_VoUIZF96M2tJflbVxbrGTuoRwPea_Go&usqp=CAU
