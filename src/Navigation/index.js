import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {connect} from 'react-redux';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import {useSelector } from 'react-redux';

const AuthLoading = props => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const user = useSelector(state => state.userReducer.user)

  return (
    <NavigationContainer>
      {user ? <DrawerNavigator></DrawerNavigator> : <AuthNavigator></AuthNavigator>}
    </NavigationContainer>
  );
};

export default AuthLoading;
