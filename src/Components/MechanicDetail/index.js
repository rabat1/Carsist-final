import React from 'react'
import { View, Text } from 'react-native'
import Colors from '../../Utils/Colors'
import Icon from '../../Utils/Icon'
import styles from './styles'

const index = ({label,value,iconName}) => {

      
      

    return (
      <View style={styles.detailsContainer}>
      <Icon name={iconName} size={18} style={{flex:0.4}} color={Colors.primaryDark}/>
      <Text style={styles.detailsText}>{label}</Text>
      <Text style={[styles.detailsText,{flex:2.1}]}>{value}</Text>
    </View>

    )
}

export default index
