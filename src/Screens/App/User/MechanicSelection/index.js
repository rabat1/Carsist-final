import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import CustomButton from '../../../../Components/CustomButton'
import { getMechanicList } from '../../../../config/firebase'
import { CustomHeader } from '../../../../Navigation/CustomHeader'
import Colors from '../../../../Utils/Colors'
import Icon from '../../../../Utils/Icon'
import styles from './styles'

const index = () => {
    const { navigate } = useNavigation();
    const [mechList, setMechList] = useState({});

    const onPress = (mechanicId) => {
    
        //you've to send the id which user selected with navigate
        navigate('mechanicDetails',{mechanicId})
    }
    const getMechanics = async () => {
        const data = await getMechanicList();
        setMechList(data);
        const output = Object.assign({}, ...data)
     
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
                <Text style={styles.title}>Related Mechanics</Text>

                {mechList.length > 0 ? (mechList.map((element) => {
                    return (
                        <>
                            <TouchableOpacity onPress={()=>onPress(element.id)} key={element.id} style={styles.listContainer}>
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
                })) : (<View style={{ alignSelf: 'center', marginTop: 20 }}><Text>Loading...</Text><ActivityIndicator size={55} /></View>)
                }
                <View style={{ marginTop: 30 }}>
                    <Text style={{}}>Recommendation :</Text>


                </View>


            </View>


        </View>
    )
}

export default index
