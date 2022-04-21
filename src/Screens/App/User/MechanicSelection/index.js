import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import CustomButton from '../../../../Components/CustomButton'
import { getMechanicList } from '../../../../config/firebase'
import { CustomHeader } from '../../../../Navigation/CustomHeader'
import Colors from '../../../../Utils/Colors'
import Icon from '../../../../Utils/Icon'
import styles from './styles'

const index = ({route}) => {
    // console.log(' i am params' , route.params);
    const { pickup,form,user} = route.params;
    const { navigate } = useNavigation();
    const [mechList, setMechList] = useState({});

    function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);
    
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
      }
    
      // Converts numeric degrees to radians
      function toRad(Value) {
        return (Value * Math.PI) / 180;
      }

    const onPress = (element) => {
        let mechanicId=element.id;
        //you've to send the id which user selected with navigate
        // console.log('i ma mechid',mechanicId);
        navigate('mechanicDetails',{mechanicId,pickup,form,element});
    }
    const getMechanics = async () => {
        const mechanic = await getMechanicList();
        
        // console.log(data);
        const distance = [];
        const rides = [];
        // console.log(drivers);
        for (let i = 0; i < mechanic.length; i++) {
          const {latitude,longitude} = mechanic[i];
        //   console.log(latitude,
        //     longitude,
        //     pickup.latitude,
        //     pickup.longitude)
    
          const result = calcCrow(
            latitude,
            longitude,
            pickup.latitude,
            pickup.longitude
          ).toFixed(1);
          distance.push(result);
          rides.push({distance:result,...mechanic[i]});
        }
        console.log('no of distances calculated');
        console.log(distance);
        const min = Math.min(...distance);
        console.log('minimum distance');
        console.log(min);
        let rider = rides.find(item => item.distance == min);
        console.log("finally nearby mechanic is " , rider);
        setMechList([rider]);
    
        // const output = Object.assign({}, ...data)
     
    }
    useEffect(() => {
        getMechanics();
    }, []);
    useEffect(() => {

    }, [mechList])

    return (

        <View style={{ backgroundColor: 'white', minHeight: '100%' }}>
            <CustomHeader title='Select Mechanic' />
            <View style={styles.container}>
                <Text style={styles.title}>Near By Mechanics</Text>

                {mechList.length > 0 ? (mechList.map((element) => {
                    return (
                        <>
                            <TouchableOpacity onPress={()=>onPress(element)} key={element.id} style={styles.listContainer}>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Image width={45} height={45} source={{ uri: element.shopUrl }} style={styles.img} />
                                </View>

                                <View style={{ flex: 4 }}>
                                    <Text style={styles.textColor}>{element.name}</Text>
                                    <Text style={styles.textColor}>{element.contact}</Text>
                                    <Text style={[styles.textColor, { marginBottom: 10 }]}>{element.address}</Text>

                                </View>
                                <View style={styles.iconContainer}>
                                    <Icon name='right' type='ant' size={17} color={Colors.primaryDark} />
                                </View>

                            </TouchableOpacity>

                        </>
                    );
                })) : (<View style={{ alignSelf: 'center', marginTop: 20 }}><Text>Finding Near By Mechanic...</Text><ActivityIndicator size={55} /></View>)
                }
                <View style={{ marginTop: 30 }}>
                    <Text style={{}}>Recommendation :</Text>


                </View>


            </View>


        </View>
    )
}

export default index
