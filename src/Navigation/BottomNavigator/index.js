import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../Screens/App/User/Home';
import Expenses from '../../Screens/App/User/Expenses';
import UserHistory from '../../Screens/App/User/UserHistory';
import FuelTracker from '../../Screens/App/User/FuelTracker';
import Icon from '../../Utils/Icon';
import Colors from '../../Utils/Colors';
import { ExpenseStack, FuelTrackStack, HomeStack,ReminderStack,UserDocumentStack} from '../StackNavigation';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
    
    initialRouteName="Home"
   
    screenOptions={({ route }) => ({
        headerShown:false,
        tabBarHideOnKeyboard:true,
        tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.grey,
            tabBarLabelStyle: { textAlign: 'center',fontSize:11, marginBottom:5 },
            tabBarIndicatorStyle: {
              borderBottomColor: 'red',
              borderBottomWidth: 2,
            },
        tabBarStyle: {
            height:60,
            backgroundColor:'white',
            paddingVertical:5,
            borderTopLeftRadius:20,
            borderTopRightRadius:20,
            
          },

            
        tabBarIcon: ({ focused, Color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          [iconName,Color, size] = focused  ?  ['home',Colors.primary,25]  :  ['home',Colors.grey,22]
        } 
        else if (route.name === 'Expenses') {
          [iconName, Color, size] = focused ? ['money',Colors.primary,25]  :  ['money',Colors.grey,22]
        } 
        else if (route.name === 'UserHistory') {
          [iconName, Color, size] = focused ? ['money',Colors.primary,25]  :  ['money',Colors.grey,22]
        }

        else if (route.name === 'FuelTracker') {
          [iconName, Color, size] = focused ? ['calculator',Colors.primary,25]  :  ['calculator',Colors.grey,22]
        }
        else if (route.name === 'Remiders') {
          [iconName, Color, size] = focused ? ['bell',Colors.primary,25]  :  ['bell',Colors.grey,22]
        }
        else if (route.name === 'UserDocs') {
          [iconName, Color, size] = focused ? ['file-o',Colors.primary,25]  :  ['file-o',Colors.grey,22]
        }

         return <Icon color={Color} name={iconName} type='FAIcon' size={size} />;
      },
    })}
  >

    <Tab.Screen name="Home" component={HomeStack}
        options={{
        //  headerShown:false,
        //   tabBarIcon: ({Color}) => (
        //     <Icon name='home' type='material' color={Color} size={30} />
        //   ),
         }}
      />
  {/* <Tab.Screen  name="UserHistory" component={UserHistory} /> */}
  <Tab.Screen  name="FuelTracker" component={FuelTrackStack} />
  <Tab.Screen  name="Remiders" component={ReminderStack} />
  <Tab.Screen  name="Expenses" component={ExpenseStack} />
  <Tab.Screen  name="UserDocs" component={UserDocumentStack} />

    </Tab.Navigator>
  );
}
