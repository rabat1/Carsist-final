import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Ratings from '../../../../Components/Ratings';
import { useRoute } from '@react-navigation/native';
import { CustomHeader } from '../../../../Navigation/CustomHeader';
import Colors from '../../../../Utils/Colors';

const index = () => {
  const { params: { details} } = useRoute();
  console.log(details);

  
  return (
    <View style={{backgroundColor:'white', minHeight:'100%'}}>
      <CustomHeader title="Give Ratings" />
    <View style={styles.container}>
      <Text style={styles.textStyle}>Thanks {details.username} for availing the service.. : )</Text>
      <Text style={[styles.textStyle,{marginTop:'10%',fontSize:19}]}>Rate Your Mechanic</Text>
      </View>
          <Ratings disable={false} mechanic_id={details.mechanicId} />
    </View>
  )
}

export default index;

const styles = StyleSheet.create({
 textStyle:{
  fontSize:17,
  fontFamily:'Sofia-Regular',
  textAlign:'center',
  color:Colors.primaryDark

 },
 container:
 {
 marginTop:'40%',
 marginHorizontal:20,
 }
});
