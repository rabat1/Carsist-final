import React,{useState} from 'react'
import { View, Text } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../../Utils/Colors';
import styles from './styles';


const index = (props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    console.log('mechServ', props.services)
   
    return (
        <View style={{alignItems:'center'}}>
            <Text style={{color:Colors.primaryDark,fontFamily:'Sofia-Regular',fontSize:20}}>Services :</Text>
            <Text style={{color:Colors.primaryDark,fontSize:16}}>{props.services}</Text>
             {/* <DropDownPicker
                listMode="SCROLLVIEW"  
                open={open}
                setOpen={setOpen}
               items={props.services}
                setItems={props.setServices}
                style={styles.dropdown}
            /> */}

        </View>
    )
}

export default index;
