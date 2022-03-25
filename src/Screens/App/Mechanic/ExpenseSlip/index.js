import React, { useEffect, useState } from 'react'
import { View, Text, Alert, ScrollView, Image } from 'react-native'
import { CustomHeader } from '../../../../Navigation/CustomHeader'
import Colors from '../../../../Utils/Colors'
import Icon from '../../../../Utils/Icon'
import { connect } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/core'
import SlipGenerator from '../../../../Components/SlipGenerator'

const index = (props) => {
  const [form, setForm] = useState({mechanic_name:'',mechanicId:''});
  const [loading, setLoading] = useState(false);
  
  const { navigate } = useNavigation();
  useEffect(()=>{
    setForm({...form,mechanic_name:props.userData.userReducer.user.name,
        mechanicId:props.userData.userReducer.user.id});
//    setForm({...form,mechanicId:props.userData.userReducer.user.id});
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
        console.log(form);
      //  const latestdata = await addRecFuelTracking(form, props.userData.userReducer.user.id);
     //   navigate('fuelTracker', { latestdata });
        setLoading(false)
      }
    }
  return (
    < >
      <CustomHeader title='Slip' />
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
