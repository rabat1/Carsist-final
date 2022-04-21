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
import { getMechanic,getUser,addride} from '../../../../config/firebase';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
//import * as admin from 'firebase-admin'
//https://rnfirebase.io/messaging/server-integration
//https://instamobile.io/react-native-tutorials/push-notifications-react-native-firebase/

const index = ({route}) => {

  const {mechanicId,pickup,form,element} = route.params;
 
  // const [addressUnique,setAddressU]= useState('');
  // const [token,setToken] = useState();
 
   const user = useSelector(state => state.userReducer.user)
  // console.log(pickup,form,mechanicId,user,element);
  const { navigate } = useNavigation();

  const sendNotification= ()=>{
          
    axios.post('https://36c5-39-50-235-147.ngrok.io/send-notification',{
     token:element.token
 
   }).then((response) => response.data).catch((e)=>console.log(e));
    
   }

   
 

    // const { params: { mechanicId } = {} } = useRoute();
    
  async function onMechanicSelected() {
    const {id}=user;
    const {name,phoneNo,issue} = form;
   
    const docid = await addride({mechanicId,id,pickup,name,phoneNo,issue});
    //sending notification to mechanic;
      sendNotification();
    //  console.log(docid);
    navigate("request",{docid});
    
    

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
    // console.log('dataaa', data)
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


         <Ratings disable={true} mechanic_id={mechanicId} />

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
