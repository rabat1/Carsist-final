import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../../Screens/Auth/Login';
import SignUp from '../../Screens/Auth/SignUp';
import MechanicRegistration from '../../Screens/Auth/MechanicRegistration';

 
 const AuthNavigator=()=>{
    const AuthStack = createNativeStackNavigator();
    return(
    <AuthStack.Navigator>
        
            <AuthStack.Screen name='Login' component={Login}></AuthStack.Screen>
            <AuthStack.Screen name='SignUp' component={SignUp}></AuthStack.Screen>
            <AuthStack.Screen name='MechanicRegistration' component={MechanicRegistration}></AuthStack.Screen>
   
    </AuthStack.Navigator>
)
}
export default AuthNavigator;