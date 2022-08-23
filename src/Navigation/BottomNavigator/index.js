import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '../../Utils/Icon';
import Colors from '../../Utils/Colors';
import { ExpenseStack, FuelTrackStack, HomeStack, ReminderStack, UserDocumentStack } from '../StackNavigation';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const user = useSelector(state => state.userReducer.user);
  const [statee, setState] = useState(user.mechanic);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.grey,
        tabBarLabelStyle: { textAlign: 'center', fontSize: 11, marginBottom: 5 },
        tabBarIndicatorStyle: {
          borderBottomColor: 'red',
          borderBottomWidth: 2,
        },
        tabBarStyle: {
          height: 60,
          backgroundColor: 'white',
          paddingVertical: 5,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,

        },


        tabBarIcon: ({ focused, Color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            [iconName, Color, size] = focused ? ['home', Colors.primary, 25] : ['home', Colors.grey, 22]
          }
          else if (route.name === 'Expenses') {
            [iconName, Color, size] = focused ? ['money', Colors.primary, 25] : ['money', Colors.grey, 22]
          }
          else if (route.name === 'UserHistory') {
            [iconName, Color, size] = focused ? ['money', Colors.primary, 25] : ['money', Colors.grey, 22]
          }

          else if (route.name === 'FuelTracker') {
            [iconName, Color, size] = focused ? ['calculator', Colors.primary, 25] : ['calculator', Colors.grey, 22]
          }
          else if (route.name === 'Remiders') {
            [iconName, Color, size] = focused ? ['bell', Colors.primary, 25] : ['bell', Colors.grey, 22]
          }
          else if (route.name === 'UserDocs') {
            [iconName, Color, size] = focused ? ['file-o', Colors.primary, 25] : ['file-o', Colors.grey, 22]
          }

          return <Icon color={Color} name={iconName} type='FAIcon' size={size} />;
        },
      })}
    >
      {
        statee ?
          <Tab.Screen name="Home" component={HomeStack}
            options={{
              tabBarStyle: {
                display: 'none'
              },
            }}
          /> :
          <Tab.Screen name="Home" component={HomeStack} />
      }

      <Tab.Screen name="FuelTracker" component={FuelTrackStack} />
      <Tab.Screen name="Remiders" component={ReminderStack} />
      <Tab.Screen name="Expenses" component={ExpenseStack} />
      <Tab.Screen name="UserDocs" component={UserDocumentStack} />

    </Tab.Navigator>
  );
}
