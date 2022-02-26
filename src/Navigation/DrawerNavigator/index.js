import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SideMenu from './SideMenu';
import BottomNavigator from '../BottomNavigator'
import TrafficRules from '../../Screens/App/TrafficRules'
import RuleDescription from '../../Screens/App/TrafficRules/RuleDescription'
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
      
   
        <DrawerStack.Screen options={navOptionHandler} name='RuleDescribe' component={RuleDescription} ></DrawerStack.Screen>
      
        <DrawerStack.Screen options={navOptionHandler} name='TrafficRules' component={TrafficRules} ></DrawerStack.Screen>
      
       
    </DrawerStack.Navigator>
)
}
export default DrawerNavigator;