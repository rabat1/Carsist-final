import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/core';
import { CustomHeader } from '../../../../Navigation/CustomHeader';
import { LineChart } from 'react-native-chart-kit';

const index = () => {
    const { params: { expenseList } = {} } = useRoute();
    
    const labels=[];
    const data1=[];

    for(var i=0;i<expenseList.length;i++){
        labels.push(expenseList[i]['date']);
        data1.push(expenseList[i]['cost']);
    }
    
console.log('lab',labels)
    console.log('cos',data1);
    
    
    const data = {
        labels: labels,
        datasets: [
          {
            data: data1,
          color: (opacity = 1) => `rgb(29, 160, 153, ${opacity})`, // optional
            strokeWidth: 3 // optional
          }
        ],
        legend: ["Expenses Visualization"] // optional
      };
      const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: 'white',
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgb(16, 89, 85, ${opacity})`, // optional
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

  return (
    <View style={{backgroundColor:'white',minHeight:'100%'}}>
        <CustomHeader title='Graph' />
    <ScrollView horizontal={true}>
      <LineChart
        style={{alignSelf:'center'}}
        data={data}
        width={450}
        height={420}
        chartConfig={chartConfig} />
    </ScrollView>
    </View>
  )
}

export default index