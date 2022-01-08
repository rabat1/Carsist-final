import React from 'react'
import FuelTrackerEdit from '../../Screens/App/User/FuelTrackerEdit';
import FuelTracker from '../../Screens/App/User/FuelTracker';
import Expenses from '../../Screens/App/User/Expenses'
import Home from '../../Screens/App/User/Home';
import Issue from '../../Screens/App/User/Issue'
import MechanicSelection from '../../Screens/App/User/MechanicSelection'
import MechanicDetails from '../../Screens/App/Mechanic/MechanicDetails'
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
  export function HomeStack(){
    return(
      <ApplicationStack.Navigator initialRouteName='home'>
        <ApplicationStack.Screen name='home' component={Home} options={{headerShown:false}}/>
        <ApplicationStack.Screen name='issue' component={Issue} options={{headerShown:false}}/>
        <ApplicationStack.Screen name='mechanicSelection' component={MechanicSelection} options={{headerShown:false}}/>
        <ApplicationStack.Screen name='mechanicDetails' component={MechanicDetails} options={{headerShown:false}}/>
       
      </ApplicationStack.Navigator>
    )
  }


  


