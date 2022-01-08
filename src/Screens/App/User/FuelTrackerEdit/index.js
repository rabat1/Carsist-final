import React,{useState} from 'react'
import { View, Text, Alert } from 'react-native'
import { CustomHeader } from '../../../../Navigation/CustomHeader'
import FuelTrackEdit from '../../../../Components/FuelTrackEdit'
import { ScrollView } from 'react-native-gesture-handler'
import Colors from '../../../../Utils/Colors'
import Icon from '../../../../Utils/Icon'
const index = () => {
    const [form,setForm] = useState({});
    const [loading,setLoading]= useState(false);
    const onChangeText=({name,value})=>{
        setForm({...form,[name]: value});
      };
  const onSubmit=()=>{
//setLoading(true);
console.log(form);
if(form.date==''|| form.cost==''|| form.amount==''){
  console.log('arayyy')
  //setLoading(false);
  Alert.alert('Please Fill all the details');
  
}
  }    
    return (
        <View>
            <CustomHeader title='Add Record' />
            <View style={{backgroundColor:Colors.primary, height:80, justifyContent:'center',alignItems:'center'}}>
              <Text style={{color:Colors.white,fontSize:16,fontWeight:'700'}}>Add Your Car's Fuel Tracking Record</Text>
              <Icon name='recording' type='ionicon' size={23} color={Colors.white} />
            </View>

            <ScrollView style={{paddingHorizontal:20,backgroundColor:Colors.white}}>
            <FuelTrackEdit
            onChangeText={onChangeText}
            onSubmit={onSubmit}
            form={form}
            loading={loading}
            />
            </ScrollView>
        </View>
    )
}

export default index
