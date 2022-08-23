import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import TrafficCard from '../../../Components/TrafficCard';
import Colors from '../../../Utils/Colors';
import { CustomHeader } from '../../../Navigation/CustomHeader';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/core';

const index = () => {
    const {navigate} = useNavigation();
  
    const onPress=(title)=>{
        navigate('RuleDescribe', {title});
    }
    return (
        <ScrollView style={styles.container}>
                <CustomHeader title='Traffic Rules' isHome={true} />
                <Text style={styles.title}>Select the Rule You want to Learn</Text>
     
        <View style={styles.cardContainer}>
              
            <TrafficCard size={70} name='car' type='ionicon' color={Colors.primary} title='Mandatory' onPress={()=>onPress('Mandatory')} />
            <TrafficCard size={70} name='dribbble' type='entypo' color={Colors.primary} title='Informatory' onPress={()=>onPress('Informatory')} />
            <TrafficCard size={70} name='road-variant' type='materialCommunity' color={Colors.primary} title='Road' onPress={()=>onPress('Road')} />
            <TrafficCard size={70} name='traffic' type='material' color={Colors.primary} title='Traffic Lights' onPress={()=>onPress('TrafficLight')} />
            <TrafficCard size={70} name='traffic-cone' type='entypo' color={Colors.primary} title='Traffic Signals' onPress={()=>onPress('TrafficSignal')} />
          

        </View>
        </ScrollView>
    )
}

export default index;