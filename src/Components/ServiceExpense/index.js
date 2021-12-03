import React, { useEffect} from 'react'
import { View, Text,TouchableOpacity,Image,FlatList } from 'react-native'
import Icon from '../../Utils/Icon';
import styles from './styles';
import AppModal from '../AppModal';
import Colors from '../../Utils/Colors';

const index = ({
    data,
    modalVisible,
    setModalVisible,
    slipData,
    setSlipData}) => {

    const ListEmptyComponent=()=>{
        return(
        <View style={{ paddingVertical:50, alignSelf:'center'}}>
            <Text>No Expenses to show</Text>
        </View>
        )
    };

    const renderItem = ({item}) =>{
        const {service_name,cost,date,mechanic_name,image_url,odometer} = item;
        return (
      
            <TouchableOpacity style={styles.itemContainer} 
              onPress={()=>{
                setSlipData(item);
                setModalVisible(true);
             }}>
                <Text style={styles.serviceName}>{`Service: ${service_name}`}</Text>
               
                <View style={styles.item}>

                    <View style={{flex:1}}>
                    <Image
                        style={{width:65, height:70,borderRadius:10}}
                        source={require('../../../assets/Images/clearSlip.jpeg')}/>
                    </View>
    
                     <View style={styles.verticalSeperator} >

                         <View style={styles.textWrapper}>
                             <Text style={styles.label}>Date: </Text>
                             <Text style={styles.label}>{date} </Text>
                        </View>
                        <View style={styles.textWrapper}>
                             <Text style={styles.label}>Cost: </Text>
                             <Text style={styles.label}>{cost} </Text>
                        </View>
                        <View style={styles.textWrapper}>
                             <Text style={styles.label}>Mechanic: </Text>
                             <Text style={styles.label}>{mechanic_name} </Text>
                        </View>
                        <View style={styles.textWrapper}>
                             <Text style={styles.label}>Odometer: </Text>
                             <Text style={styles.label}>{odometer} </Text>
                        </View>
                      
                     </View>
                     <Icon name='right' type='ant' size={17} color={Colors.primaryDark} />
                </View>
       
            </TouchableOpacity>
        )
    }
   
useEffect(()=>{
return()=>{}
},[modalVisible,slipData]);

    return (
        <View style={{marginTop:10, backgroundColor:Colors.white}}>
            
            <FlatList
            keyExtractor={(item)=>String(item.mechanic_name)} 
            data={data} 
            renderItem={renderItem}
            ItemSeparatorComponent={()=>
            (
            <View style={styles.itemSeperator}></View>
            )}
            ListEmptyComponent={ListEmptyComponent}
            ListFooterComponent={<View style={{height:200}}></View>}
            />
     
            <AppModal 
            modalVisible={modalVisible}
            title='Slip'
            closeOnTouchOutside={false}
            setModalVisible={setModalVisible}
             modalBody={
                    <View style={{paddingTop:5,}}>
                         <View style={styles.imageContainer}>
                          <Image style={styles.image} width={100} height={100} source={{uri:'https://images.hdqwalls.com/wallpapers/sea-green-lamborghini-aventador-4k-9g.jpg'}} />
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
        </View>
    )
}

export default index;
