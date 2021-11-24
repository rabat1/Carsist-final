import React from 'react'
import { View, Text, Image, SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {useDispatch } from 'react-redux'
import { updateUser } from '../../../store/actions/userAction'
import Colors from '../../../Utils/Colors';
import Icon from '../../../Utils/Icon'
import styles from './style';


const SideMenu = ({navigation}) => {
  const dispatch = useDispatch()
    const menuItems=[
      {icon:<Icon color={Colors.primaryDark} type='material' name='home' size={22} />, name:'HomeTab', onPress:()=>{navigation.navigate('HomeTab')}},
        {icon:<Icon color={Colors.primaryDark} type='material' name='logout' size={22} />, name:'Logout', onPress:()=>{dispatch(updateUser())}}
      
    ]
    return(
        <SafeAreaView>
             <View style={{marginTop:140,marginHorizontal:20}}>
                  {menuItems.map(({icon,name,onPress})=>
                (
                  <View key={name} style={styles.drawerContainer}>
                  <TouchableOpacity onPress={onPress} style={styles.item} >
                        {icon}
                        <Text style={styles.itemText}>{name}</Text>
                  </TouchableOpacity>
                  </View>
                )
               )}
               </View>

        </SafeAreaView>
    )
}

export default SideMenu
