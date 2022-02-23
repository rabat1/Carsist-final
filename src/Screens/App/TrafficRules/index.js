import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import TrafficCard from '../../../Components/TrafficCard';
import Colors from '../../../Utils/Colors';
import { CustomHeader } from '../../../Navigation/CustomHeader';
import styles from './styles';
const index = () => {
    return (
        <ScrollView style={styles.container}>
                <CustomHeader title='Traffic Rules' isHome={true} />
                <Text style={styles.title}>Select the Rule You want to Learn</Text>
     
        <View style={styles.cardContainer}>
              
            <TrafficCard size={70} name='car' type='ionicon' color={Colors.primary} title='Mandatory' onPress={()=>console.log('Pressed')} />
            <TrafficCard size={70} name='dribbble' type='entypo' color={Colors.primary} title='Informatory' />
            <TrafficCard size={70} name='road-variant' type='materialCommunity' color={Colors.primary} title='Road' />
            <TrafficCard size={70} name='traffic' type='material' color={Colors.primary} title='Traffic Lights' />
            <TrafficCard size={70} name='traffic-cone' type='entypo' color={Colors.primary} title='Traffic Signals' />
          

        </View>
        </ScrollView>
    )
}

export default index;