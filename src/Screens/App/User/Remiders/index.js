import React, { useState } from 'react';
import { NativeBaseProvider, Box, Fab, Icon } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { CustomHeader } from '../../../../Navigation/CustomHeader';
import SwipeList from '../../../../Components/swipeList';
import { useNavigation } from '@react-navigation/core';


const index = () => {
    const [mode, setMode] = useState('SwipeList');
    const { navigate } = useNavigation();
    return (
        <NativeBaseProvider >
            <Box>
                <CustomHeader isHome={true} title='Reminders' />
            </Box>
            <Box bg="white" flex="1" safeAreaTop>
                <SwipeList />
                <Box position='relative' h={100} w="100%">
                    <Fab
                        bgColor='teal.500'
                        position="absolute"
                        icon={<Icon size="full" color="white" as={<AntDesign name="plus" />} size="md" />}
                       onPress={() => { navigate('addReminder') }}
                    />
                </Box>
            </Box>
        </NativeBaseProvider >
    )
}


export default index
