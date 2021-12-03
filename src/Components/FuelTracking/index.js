import React from 'react'
import { View, Text,TouchableOpacity,Image,FlatList, ScrollView, Dimensions, Alert } from 'react-native'
import Colors from '../../Utils/Colors'
import Icon from '../../Utils/Icon';
import styles from './styles';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';



const ListComponent=(props)=>{
    return(
        <>
        <List.Item style={styles.itemContainer} 
            titleStyle={{height:15,}}
             title={
        <View style={{flexDirection:'row', }}>
            <Icon name={props.iconName} type='fa' size={18} color={Colors.primaryDark} />
            <Text style={[styles.itemText]}>{props.label} :</Text>
            <Text style={[styles.itemText, styles.itemTextValue]}>{props.value}</Text>
        </View>
        }
         />
         </>
    )
};

const index = ({data}) => {
     const {navigate} = useNavigation();
    // const screenHeight = Dimensions.get('window').height; 
    //     const [expanded, setExpanded] = React.useState(true);
    //     const handlePress = () => setExpanded(!expanded);   
    return (
    <>
    
    <View style={{marginVertical:5,}}>
        <Image source={{uri:'https://image.shutterstock.com/image-photo/close-picture-fuel-monitoring-system-260nw-1205547790.jpg'}}
            width={100} height={100} style={styles.image} />
    </View>
      
    <ScrollView>
        <List.Section title="Your's car fuel History"
                titleStyle={{fontSize:18, alignSelf:'center', color:Colors.primaryDark}}
                style={{backgroundColor:Colors.white}}
        >

        {data?data.map((item)=>(
            
         <>
            <List.Accordion
                theme={{ colors: { primary: Colors.white } }}
                style={{ backgroundColor: Colors.primary,paddingVertical:0, marginTop:8 }}
                    title={item.date}
                    left={props => <List.Icon {...props} icon="fuel" />}
                    titleStyle={{color:Colors.white}}
            >
                    <ListComponent value={item.cost} label='Cost' iconName='money' />
                    <ListComponent value={item.amount} label='Amount' iconName='wpforms' />
                    <ListComponent value={item.mileage} label='Mileage' iconName='car' />
                    <ListComponent value={item.type_fuel} label='Fuel Type' iconName='database' />
            
            </List.Accordion>
             </> 
            )
            ):<Text>No data</Text>}

        </List.Section>
      
        <View style={{height:300}} ></View>
      
        </ScrollView>

        <TouchableOpacity 
        onPress={()=>{navigate('fuelTrackerEdit')}}
        style={styles.editContactButton}>
            <Icon name='plus' size={20} color={Colors.white}/>
        </TouchableOpacity>
      
    </>
    
    )
}

export default index;
