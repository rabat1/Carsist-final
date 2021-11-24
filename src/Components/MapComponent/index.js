import React from 'react'
import { View, Text,Image } from 'react-native'

const index = () => {
    return (
        <View style={{marginVertical:20}}>
            <Image
            width={355} height={320}
            source={{uri:'https://www.google.com/maps/d/thumbnail?mid=1rwSC4Zel8v3ywPeaibqjPQPWGMo'}}
            style={{width:'100%', height:320}}
            />
        </View>
    )
}

export default index
