import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import Icon from '../../Utils/Icon';
import styles from './styles';
import AppModal from '../AppModal';
import Colors from '../../Utils/Colors';
import { useNavigation, useRoute } from '@react-navigation/core';
import { ActivityIndicator } from 'react-native-paper';

const index = ({
    data,
    modalVisible,
    setModalVisible,
    slipData,
    setSlipData }) => {
    const { navigate } = useNavigation();

    const ExpenseDataComp = (props) => {
        return (
            <View style={styles.textWrapper}>
                <Text style={styles.label}>{props.label} </Text>
                <Text style={styles.label}>{props.value} </Text>
            </View>

        );
    }

    useEffect(() => {
        return () => { }
    }, [modalVisible, slipData]);

    return (
        <>
            {
                data ? (
                    data.map((item, index) => {
                        return (
                            <>
                                <TouchableOpacity style={styles.itemContainer}
                                    onPress={() => {
                                        setSlipData(item);
                                        setModalVisible(true);
                                    }}>
                                    <Text style={styles.serviceName}>{`Service: ${item.service_name}`}</Text>

                                    <View style={styles.item}>

                                        <View style={{ flex: 1 }}>
                                            <Image
                                                style={{ width: 65, height: 70, borderRadius: 10 }}
                                                source={require('../../../assets/Images/clearSlip.jpeg')} />
                                        </View>

                                        <View style={styles.verticalSeperator} >

                                            <ExpenseDataComp label='Date' value={item.date} />
                                            <ExpenseDataComp label='Cost' value={item.cost} />
                                            <ExpenseDataComp label='Mechanic' value={item.mechanic_name} />
                                            <ExpenseDataComp label='Odometer' value={item.odometer} />

                                        </View>
                                        <Icon name='right' type='ant' size={17} color={Colors.primaryDark} />
                                    </View>

                                </TouchableOpacity>
                                <View style={styles.itemSeperator}></View>
                            </>
                        );



                    })
                ) : <ActivityIndicator color={Colors.primary} />
            }

            <AppModal
                modalVisible={modalVisible}
                title='Slip'
                closeOnTouchOutside={false}
                setModalVisible={setModalVisible}
                modalBody={
                    <View style={{ paddingTop: 5, }}>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={require('../../../assets/Images/carlogo.png')} />
                        </View>

                        <Text style={styles.slipText} >{`Service : ${slipData.service_name}`}</Text>
                        <Text style={styles.slipText} >{`Mechanic : ${slipData.mechanic_name}`}</Text>
                        <Text style={styles.slipText}>{`Date : ${slipData.date}`}</Text>
                        <Text style={styles.slipText}>{`Cost : ${slipData.cost}`}</Text>
                        <Text style={styles.slipText}>{`Odometer : ${slipData.odometer}`}</Text>

                    </View>
                }
            //  modalFooter={<></>}
            />
        </>
    )
}

export default index;
