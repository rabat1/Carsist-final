import React from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import Input from '../Input';
import CustomButton from '../CustomButton'
import Colors from '../../Utils/Colors';

const index = ({onChangeText,onSubmit,form,loading}) => {
    
    return (
        <KeyboardAvoidingView>
           
           <Input
             onChangeText={(value)=>{
                onChangeText({name:'date', value:value})
                }}
            value={form.date||""}
            label='Date*' placeholder="Enter Date" />

        <Input
             onChangeText={(value)=>{
                onChangeText({name:'mileage', value:value})
                }}
                keyboardType='numeric'
            value={form.mileage||""}
            label='Mileage' placeholder="Enter Mileage" />

        <Input
             onChangeText={(value)=>{
                onChangeText({name:'cost', value:value})
                }}
                keyboardType='numeric'
            value={form.cost||""}
            label='Cost*' placeholder="Enter Cost" />

        <Input
             onChangeText={(value)=>{
                onChangeText({name:'amount', value:value})
                }}
                keyboardType='numeric'
            value={form.amount||""}
            label='Amount/Quantity*' placeholder="Enter Amount" />

        <Input
             onChangeText={(value)=>{
                onChangeText({name:'type_fuel', value:value})
                }}
            value={form.type_fuel||""}
            label='Fuel Type' placeholder="Enter Type of fuel" />
          
        <CustomButton 
         //disabled={loading}
         loading={loading} 
         onPress={onSubmit} 
         title='Submit' 
         primary />
          <View style={{height:100}} />


        </KeyboardAvoidingView>
    )
}

export default index
