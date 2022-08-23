import React, { useEffect, useState } from 'react'
import { View, Text, Alert, ScrollView, Image } from 'react-native'
import { CustomHeader } from '../../../../Navigation/CustomHeader'
import Colors from '../../../../Utils/Colors'
import Icon from '../../../../Utils/Icon'
import { connect,useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/core'
import SlipGenerator from '../../../../Components/SlipGenerator'
import { addBill } from '../../../../config/firebase'

const index = ({route}) => {
  const [form, setForm] = useState({mechanic_name:'',mechanicId:''});
  const { navigate } = useNavigation();
  const {id,userId}= route.params.pass;
  const user = useSelector(state => state.userReducer.user);
  const [loading, setLoading] = useState(false);
  
  
  useEffect(()=>{
    setForm({...form,mechanic_name:user.name,
        mechanicId:user.id});
  
  },[])
    
  
  const onChangeText = ({ name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async () => {
    const {service_name, date,  cost, odometer}=form;

    if (!service_name || !date || !cost || !odometer) {

        Alert.alert('Please Fill All the Compulsory Fields');
        }
      else {
        setLoading(true)
    
    await addBill(id,"done",form.cost,form.date,form.odometer,form.service_name,form.mechanic_name,userId,form.mechanicId);
        setLoading(false);
       
        navigate("confirmation",{id,form,userId});
      }
    }
  return (
    <>
     
      <ScrollView style={{ paddingHorizontal: 20, backgroundColor: Colors.white }}>
    
      <Image style={{width:120,height:100,marginTop:20,alignSelf:'center'}} source={require('../../../../../assets/Images/carlogo.png')} />
                      
     
        <SlipGenerator
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
    userData: user

  }
}

export default connect(mapStateToProps)(index);
// <CustomHeader title='Slip' />