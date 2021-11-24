import React,{useState} from 'react'
import { View, Text,TouchableOpacity } from 'react-native'
import SearchTab from '../../../../Components/SearchTab'
import MapComponent from '../../../../Components/MapComponent'
import CustomButton from '../../../../Components/CustomButton'
import { useNavigation, useFocusEffect } from '@react-navigation/core';
import Icon from '../../../../Utils/Icon'
import { CustomHeader } from '../../../../Navigation/CustomHeader'

const index = () => {
    const [shop, setShop] = useState("San Francisco");
    //const {setOptions, toggleDrawer, navigate} = useNavigation();
    
    const onPress = () => {
        //navigate from here
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
              title='Are You facing any trouble..?'
              primary
              onPress={onPress}
              style={{width:'70%', alignSelf:'center', marginTop:30}}
              />
        </View>
    )
}

export default index
