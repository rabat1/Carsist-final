import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text } from 'react-native'
import CustomButton from '../../../../Components/CustomButton'
import { CustomHeader } from '../../../../Navigation/CustomHeader'

const index = () => {
    const {navigate} = useNavigation();
    const onPress=()=>{
        navigate('mechanicDetails')
    }
    console.log("you should there")
    return (
        <View>
                <CustomHeader title='Select Mechanic' />
        
            <Text>select Mechanic</Text>
            <Text>Recommendations</Text>
           
            <CustomButton title='Select' primary onPress={onPress}  />
        </View>
    )
}

export default index
