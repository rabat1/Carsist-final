import React from 'react';
import {View, Text} from 'react-native';
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { CustomHeader } from '../../../Navigation/CustomHeader';
import Home from '../User/Home';
import MechanicHome from '../Mechanic/MechanicHome';



const index = () => {
  const user = useSelector(state => state.userReducer.user);
  return (
    <View>
  
      <CustomHeader isHome={true} title="Home" />
      {user.mechanic == true? <MechanicHome/>: <Home/>}
    </View>
  );
};

export default index;
