import React,{useState} from 'react'
import { View, Text } from 'react-native'
import FuelTracking from '../../../../Components/FuelTracking'
import { userFuelList } from '../../../../config/firebase';
import { CustomHeader } from '../../../../Navigation/CustomHeader';
import { connect } from 'react-redux';

const index = (props) => {

      const [fuelList, setFuelList]= useState();
      
      const getFuelData=async ()=>{
        
      const data= await userFuelList(props.userData.userReducer.user.id);
      console.log('data',data);
      setFuelList(data);
    }
    
    
    React.useEffect(()=>{
      console.log('calledd')
        getFuelData();
       
     },[]);
    
     React.useEffect(()=>{
    },[fuelList]);
    
    

    return (
        <View>    
            <CustomHeader isHome={true} title='Fuel Tracker' />
            <FuelTracking data={fuelList} />
        </View>        
    )
}
function mapStateToProps(user) {
    return {
      userData:user
      
    }
  }
  
  
  export default connect(mapStateToProps)(index);
  