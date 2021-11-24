import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SideMenu from './SideMenu';
import BottomNavigator from '../BottomNavigator'

const getDrawerContents=(navigation)=>{
    return(
    <SideMenu navigation={navigation} />
    )}

const DrawerNavigator=()=>{
    const DrawerStack = createDrawerNavigator();

    const navOptionHandler=()=>({
        headerShown:false
      })
    
    return(
    <DrawerStack.Navigator drawerContent={({navigation})=>getDrawerContents(navigation)}>
   
        <DrawerStack.Screen options={navOptionHandler} name='HomeTab' component={BottomNavigator} ></DrawerStack.Screen>
      
       
    </DrawerStack.Navigator>
)
}
export default DrawerNavigator;