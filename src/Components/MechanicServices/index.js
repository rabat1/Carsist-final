import React,{useState} from 'react'
import { View, Text } from 'react-native'
import Colors from '../../Utils/Colors';

const index = (props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    console.log('mechServ', props.services)
   
    return (
        <View style={{alignItems:'center'}}>
            <Text style={{color:Colors.primaryDark,fontFamily:'Sofia-Regular',fontSize:24}}>Services :</Text>
            <Text style={{color:Colors.primaryDark,fontSize:16}}>{props.services}</Text>
         
        </View>
    )
}

export default index;
