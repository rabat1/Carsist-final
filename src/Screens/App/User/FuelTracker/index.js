import React, { useState } from 'react'
import { View, Text } from 'react-native'
import FuelTracking from '../../../../Components/FuelTracking'
import { delRecFuelTracking, userFuelList } from '../../../../config/firebase';
import { CustomHeader } from '../../../../Navigation/CustomHeader';
import { connect } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/core';

const index = (props) => {
  const {navigate} = useNavigation();
  const [fuelList, setFuelList] = useState();
  const { params: { latestdata = null } = {} } = useRoute();

  const DeleteRecord = async (id) => {
    const updateRec = await delRecFuelTracking(id, props.userData.userReducer.user.id);
    setFuelList(updateRec);
  }

  const EditRecord = async (item) => {
    navigate('fuelTrackerEdit', {item});
}


  const getFuelData = async () => {
    const data = await userFuelList(props.userData.userReducer.user.id);
    
    setFuelList(data);
  }

  // { latestdata !== null ? getFuelData() : console.log('ok') }
React.useEffect(()=>{
  getFuelData()
},[latestdata])
  React.useEffect(() => {
    getFuelData();
    console.log("again")
  }, []);

  return (
    <View>
      <CustomHeader isHome={true} title='Fuel Tracker' />
      <FuelTracking data={fuelList} DeleteRecord={DeleteRecord} EditRecord={EditRecord} />
    </View>
  )
}
function mapStateToProps(user) {
  return {
    userData: user

  }
}

export default connect(mapStateToProps)(index);
