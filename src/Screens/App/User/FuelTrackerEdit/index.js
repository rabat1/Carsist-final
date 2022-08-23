import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { CustomHeader } from '../../../../Navigation/CustomHeader'
import FuelTrackEdit from '../../../../Components/FuelTrackEdit'
import { ScrollView } from 'react-native-gesture-handler'
import Colors from '../../../../Utils/Colors'
import Icon from '../../../../Utils/Icon'
import { connect } from 'react-redux';
import { addRecFuelTracking, editRecFuelTracking } from '../../../../config/firebase'
import { useNavigation, useRoute } from '@react-navigation/core'

const index = (props) => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const [render, setRender] = useState(true)
  const { navigate } = useNavigation();
  const { params: { item = null } = {} } = useRoute();

  {
    item !== null && render ?
    setData()
    : console.log(edit)
  }

  function setData() {
    setRender(false);
    setForm(item);
    setEdit(true);

  }
  const onChangeText = ({ name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async () => {

    if (edit == true) {
      setLoading(true)
      const latestdata = await editRecFuelTracking(form, props.userData.userReducer.user.id);
      navigate('fuelTracker', { latestdata });
      setLoading(false)
    }
    
    else {
      if (form.date == undefined || form.cost == undefined || form.amount == undefined ||
        form.date.length==0||form.cost.length==0 || form.amount.length==0
        
        ) {
        Alert.alert('Please Fill All the Compulsory Fields');

      }
      else {
        setLoading(true)
        const latestdata = await addRecFuelTracking(form, props.userData.userReducer.user.id);
        navigate('fuelTracker', { latestdata });
        setLoading(false)
      }
    }
  }
  return (
    < >
      <CustomHeader title='Add Record' />
      <View style={{ backgroundColor: Colors.primary, height: 80, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: Colors.white, fontSize: 19,fontFamily:'Sofia-Regular' }}>Add Your Car's Fuel Tracking Record</Text>
        <Icon name='recording' type='ionicon' size={23} color={Colors.white} />
      </View>

      <ScrollView style={{ paddingHorizontal: 20, backgroundColor: Colors.white }}>
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
    userData: user

  }
}

export default connect(mapStateToProps)(index);
