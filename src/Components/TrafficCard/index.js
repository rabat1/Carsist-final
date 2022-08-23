import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import Icon from '../../Utils/Icon'

const index = (props) => {
  return (
      
    <TouchableOpacity onPress={props.onPress} style={{ margin: 10,}}>
          <Icon style={[styles.Roundcard,{}]} name={props.name} type={props.type} size={props.size} color={props.color} />
         <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>

  )
}

export default index