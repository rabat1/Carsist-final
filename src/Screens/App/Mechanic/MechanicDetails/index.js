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
import { useRoute } from '@react-navigation/native';
//import * as admin from 'firebase-admin'
//https://rnfirebase.io/messaging/server-integration
//https://instamobile.io/react-native-tutorials/push-notifications-react-native-firebase/

const index = (props) => {


  const [addressUnique,setAddressU]= useState('');

    const { params: { addressU } = {} } = useRoute();
    
  async function onMechanicSelected() {
    
    // Get the owners details
    //const mechanic = admin.firestore().collection('users').doc(mechanicId).get();
    const userId = props.userData.userReducer.user.id
    

  }


  const [services, setServices] = useState('');
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [shopName, setShopName] = useState('')
  const [mechId, setMechId] = useState('')

  const MechData = async () => {
    //here give that id which user seleceted mechanic
    const data = await getMechanic(addressU);
    const output = Object.assign({}, ...data)
    
    setAddress(output.address)
    setName(output.name)
    setContact(output.contact)
    setShopName(output.shopName)
    setMechId(output.id)
    setServices(output.services)
    console.log('outputaa', output)
  }
  React.useEffect(() => {
    MechData();
  }, [])

  return (
    <ScrollView style={{ backgroundColor: Colors.white, minHeight: '100%' }}>
      <CustomHeader title='Mecahnic Details' />
      <View style={{ marginHorizontal: 10 }}>

        <View>
          <Text style={styles.mechanicName}>{name}</Text>

          <MechanicDetail label='Shop Name:' value={shopName} iconName='home' />
          <MechanicDetail label='Shop Address:' value={address} iconName='map-marker' />
          <MechanicDetail label='Contact Information:' value={contact} iconName='phone' />
        </View>


        <Ratings disable={true} mechAddress={addressU} />

        <MechanicServices services={services} />
        {/* give mechanic_id to services component */}

        <CustomButton title='Choose this Mechanic' primary onPress={onMechanicSelected} />
      </View>
    </ScrollView>
  )
}

function mapStateToProps(user) {
  return {
    userData: user

  }
}
export default connect(mapStateToProps)(index);
