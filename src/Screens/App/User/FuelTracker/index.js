import React from 'react'
import { View, Text } from 'react-native'
import FuelTracking from '../../../../Components/FuelTracking'
import { CustomHeader } from '../../../../Navigation/CustomHeader';
const index = () => {

    const fuelTrackingData = [
        {
            month:'Jan',
            date:'22/10.20121',
            mileage: "Beachside Bar",
            cost: 260,
            amount: "$$",
            type_fuel:'petrol',
        },
        {
            month:'Jan',
            date:'22/10.20121',
            mileage: "Beachside Bar",
            cost: 250,
            amount: "$$",
            type_fuel:'petrol',
        },
        {
            month:'Jan',
            date:'22/10.20121',
            mileage: "Beachside Bar",
            cost: 240,
            amount: "$$",
            type_fuel:'petrol',
        },
        {
            month:'Jan',
            date:'22/10.20121',
            mileage: "Beachside Bar",
            cost: 230,
            amount: "$$",
            type_fuel:'petrol', 
          },
          {
            month:'Jan',
            date:'22/10.20121',
            mileage: "Beachside Bar",
            cost: 220,
            amount: "$$",
            type_fuel:'petrol', 
          },
          {
            month:'Jan',
            date:'22/10.20121',
            mileage: "Beachside Bar",
            cost: 200,
            amount: "$$",
            type_fuel:'petrol',
          },
           
      ];
    

    return (
        <View>    
            <CustomHeader isHome={true} title='Fuel Tracker' />
            <FuelTracking data={fuelTrackingData} />
        </View>        
    )
}

export default index
