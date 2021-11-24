import React from 'react'
import FuelTrackerEdit from '../../Screens/App/User/FuelTrackerEdit';
import FuelTracker from '../../Screens/App/User/FuelTracker';
import Expenses from '../../Screens/App/User/Expenses'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const ApplicationStack= createNativeStackNavigator();

export function FuelTrackStack(){
    return(
      <ApplicationStack.Navigator initialRouteName='fuelTracker'>
        <ApplicationStack.Screen name='fuelTracker' component={FuelTracker} options={{headerShown:false}}/>
        <ApplicationStack.Screen name='fuelTrackerEdit' component={FuelTrackerEdit} options={{headerShown:false}}/>
  
      </ApplicationStack.Navigator>
    )
  }
  
  export function ExpenseStack(){
    return(
      <ApplicationStack.Navigator initialRouteName='expenses'>
        <ApplicationStack.Screen name='expenses' component={Expenses} options={{headerShown:false}}/>
        
      </ApplicationStack.Navigator>
    )
  }


