import React, { useEffect, useState } from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  Text, Pressable, HStack, VStack, Spacer, Box, Icon, Switch
} from 'native-base';

export default function swipeList() {

  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      fullName: 'Oil Check',
      timeStamp: 'Days Left', //pick by subtracting setdate from current  
      recentText: 'Good Day!'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      fullName: 'Sujita Mathur',
      timeStamp: '11:11 PM',
      recentText: 'Cheer up, there!'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      fullName: 'Anci Barroco',
      timeStamp: '6:22 PM',
      recentText: 'Good Day!',
    },
    {
      id: '68694a0f-3da1-431f-bd56-142371e29d72',
      fullName: 'Aniket Kumar',
      timeStamp: '8:56 PM',
      recentText: 'All the best',
    },
    {
      id: '28694a0f-3da1-471f-bd96-142456e29d72',
      fullName: 'Kiara',
      timeStamp: '12:47 PM',
      recentText: '9.00 AM'
    },
  ];
  const [listData, setListData] = useState(data);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };
  // const [daysLeft, setDaysLeft] = useState('');

  // const serviceDays = () => {
  //   useEffect(() => {
  //     var date = new Date().getDate();
  //     var month = new Date().getMonth() + 1;
  //     var year = new Date().getFullYear();
  //     setDaysLeft(

  //     )
  //   })
  // return (
  //   <Text>
  //     {daysLeft}
  //   </Text>
  // );
  // };

  const renderItem = ({ item, index }) => (
    <Box>
      <Pressable onPress={() => console.log('You touched me')} bg="white">
        <Box
          pl="4"
          pr="5"
          py="6"
        >
          <HStack alignItems="center" space={7}>
            <VStack>
              <Text color="coolGray.800" _dark={{ color: 'warmGray.50' }} bold>
                {item.fullName}
              </Text>
              <Text color="coolGray.600" _dark={{ color: 'warmGray.200' }}>{item.recentText}</Text>
            </VStack>
            <Spacer />
            <Text fontSize="sm" color="coolGray.800" _dark={{ color: 'warmGray.50' }} alignSelf="flex-start">
              {item.timeStamp}
            </Text>
            <Switch size="lg" />
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );
  const renderHiddenItem = (data, rowMap) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        cursor="pointer"
        bg="coolGray.200"
        justifyContent="center"
        onPress={() => closeRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
          <Icon
            as={<EntypoIcon name="dots-three-horizontal" />}
            size="xs"
            color="coolGray.800"
          />
          <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
            Edit
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcon name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );
  return (
    <Box bg="white" safeArea flex="1">
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-130}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}

      />
    </Box>
  );
}