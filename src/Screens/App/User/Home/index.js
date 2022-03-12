import React,{useState} from 'react'
import { View, Text,TouchableOpacity } from 'react-native'
import SearchTab from '../../../../Components/SearchTab'
import MapComponent from '../../../../Components/MapComponent'
import CustomButton from '../../../../Components/CustomButton'
import { useNavigation, useFocusEffect } from '@react-navigation/core';
import Icon from '../../../../Utils/Icon'
import { CustomHeader } from '../../../../Navigation/CustomHeader';
import { getUser,getMechanic } from '../../../../config/firebase'
import {useSelector} from 'react-redux';
import axios from "axios";

const index = () => {
    const [shop, setShop] = useState("San Francisco");
    const [token,setToken] = useState();
    const user = useSelector(state => state.userReducer.user);
    async function fetch() {
        if(user.mechanic == false)
        {
            const data = await getUser(user.id);
            setToken(data.token);
        }
        else if(user.mechanic == true)
        {
            const data = await getMechanic(user.id);
            setToken(data.token);
        }
     
    //   console.log(data.token);
      
    }
    fetch();
    const {navigate} = useNavigation();
    
    const onPress = () => {
        navigate('issue');
    }
    const sendNotification= ()=>{
          
           axios.post('http://a0a2-39-50-253-234.ngrok.io/send-notification',{
            token:token
        
    }).then((response) => response.data).catch((e)=>console.log(e));
    
       }

    // React.useEffect(()=>{
    //     setOptions({headerLeft:()=><TouchableOpacity onPress={()=>{
    //         toggleDrawer();
    //     }}><Icon type='material' name='menu' size={25} style={{padding:10}} />
    //     </TouchableOpacity>})
    // },[]);


    return (
        <View>
            <CustomHeader isHome={true} title='Home' />

            <View style={{backgroundColor:'white', padding:5,}}>
                <SearchTab shopHandler={setShop} />
            </View>
            
             <MapComponent />
             <CustomButton
              title='Are You facing any trouble?'
              primary
              onPress={onPress}
              style={{width:'70%', alignSelf:'center', marginTop:30}}
              />
         
              <CustomButton
              title='Testing Notification'
              primary
              onPress={sendNotification}
              style={{width:'70%', alignSelf:'center', marginTop:10}}
              />
        </View>
    )
}

export default index
