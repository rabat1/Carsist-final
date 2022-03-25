import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import CustomButton from '../../../../Components/CustomButton';
import { CustomHeader } from '../../../../Navigation/CustomHeader'
import { connect } from 'react-redux';
import Colors from '../../../../Utils/Colors';
import Icon from '../../../../Utils/Icon';
import Ratings from '../../../../Components/Ratings'
import MechanicDetail from '../../../../Components/MechanicDetail'
import styles from './styles';
import MechanicServices from '../../../../Components/MechanicServices'
import { getMechanic } from '../../../../config/firebase';
import { useNavigation, useRoute } from '@react-navigation/native';
//import * as admin from 'firebase-admin'
//https://rnfirebase.io/messaging/server-integration
//https://instamobile.io/react-native-tutorials/push-notifications-react-native-firebase/

const index = (props) => {


  const [addressUnique,setAddressU]= useState('');

    const { params: { mechanicId } = {} } = useRoute();
    const {navigate}=useNavigation();
    
  function onMechanicSelected() {
    
    // Get the owners details
    //const mechanic = admin.firestore().collection('users').doc(mechanicId).get();
    const userId = props.userData.userReducer.user.id;
    navigate('Slip');

    

  }


  const [services, setServices] = useState('');
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [shopName, setShopName] = useState('')
  const [mechId, setMechId] = useState('')

  const MechData = async () => {
    //here give that id which user seleceted mechanic
    const data = await getMechanic(mechanicId);
    setAddress(data.address)
    setName(data.name)
    setContact(data.contact)
    setShopName(data.shopName)
    setMechId(data.id)
    setServices(data.services)
    console.log('dataaa', data)
  }
  React.useEffect(() => {
    MechData();
  }, [])

  return (
    <>
     <CustomHeader title='Mecahnic Details' />
     
    <ScrollView style={{ backgroundColor: Colors.white, minHeight: '100%' }}>
      <View style={{ marginHorizontal: 15,marginVertical:40 }}>

          <Text style={styles.mechanicName}>{name}</Text>

          <MechanicDetail label='Shop Name:' value={shopName} iconName='home' />
          <MechanicDetail label='Shop Address:' value={address} iconName='map-marker' />
          <MechanicDetail label='Contact Information:' value={contact} iconName='phone' />
        

         <Ratings disable={true} mechanic_id={mechanicId} />

        <MechanicServices services={services} />
        {/* give mechanic_id to services component */}


        <CustomButton style={{marginVertical:30}} title='Select this Mechanic' primary onPress={onMechanicSelected} />
      </View>
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
