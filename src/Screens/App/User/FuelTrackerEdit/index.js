import React,{useState} from 'react'
import { View, Text, Alert } from 'react-native'
import { CustomHeader } from '../../../../Navigation/CustomHeader'
import FuelTrackEdit from '../../../../Components/FuelTrackEdit'
import { ScrollView } from 'react-native-gesture-handler'
import Colors from '../../../../Utils/Colors'
import Icon from '../../../../Utils/Icon'
import { connect } from 'react-redux';
import { addRecFuelTracking } from '../../../../config/firebase'

const index = (props) => {
    const [form,setForm] = useState({});
    const [loading,setLoading]= useState(false);
  
    const onChangeText=({name,value})=>{
        setForm({...form,[name]: value});
      };

const onSubmit=async ()=>{
console.log('props count',props.userData.userReducer.user.id);
console.log(form);
if(form.date==''|| form.cost==''|| form.amount==''){
  Alert.alert('Please Fill all the details');
  
}
else{
  const anything= await addRecFuelTracking(form,props.userData.userReducer.user.id);
}
  }    
    return (
        < >
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
        </>
    )
}
function mapStateToProps(user) {
  return {
    userData:user
    
  }
}

export default connect(mapStateToProps)(index);
