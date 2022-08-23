import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomHeader } from '../../../../Navigation/CustomHeader'
import { useRoute } from '@react-navigation/native'
import { InformatoryRules, MandatoryRules, RoadRules, TrafficLightRules, TrafficSignalRules } from '../RulesData'
import Slider from '../../../../Components/Slider';

const index = (props) => {
    const { params: { title } = {} } = useRoute();
    const [titleHeader, setTileHeader] = useState('');
    const [rulesData, setRulesData] = useState('');

    useEffect(() => {
        setTileHeader(title);
        getData();
    }, [title]);
    useEffect(()=>{

    },[rulesData]);

    const getData=async ()=>
    {
    if(title=='Mandatory'){
        const data= await MandatoryRules();
        setRulesData(data);
        
    }
    else if(title=='Informatory'){
        const data= await InformatoryRules();
        setRulesData(data);
        
    }
    else if(title=='Road'){
        const data= await RoadRules();
        setRulesData(data);
        
    }
    else if(title=='TrafficLight'){
        const data= await TrafficLightRules();
        setRulesData(data);
        
    }
    else if(title=='TrafficSignal'){
        const data= await TrafficSignalRules();
        setRulesData(data);
        
    }
    
    }
    
    return (

        <View>
            <CustomHeader title={titleHeader} />
            
            <View >
            {title=="Mandatory"?<Slider title={title} data={rulesData} />:(
                title=="Informatory"?<Slider title={title} data={rulesData} />:(
                    title=='Road'?<Slider title={title} data={rulesData} />:(
                        title=='TrafficLight'?<Slider title={title} data={rulesData} />:(
                            <Slider title={title} data={rulesData}/>
                        )
                    )
                )
            )}
            </View>

        </View>
    )
}

export default index;
