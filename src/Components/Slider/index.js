import { View, Text, FlatList, Dimensions, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles';
import Colors from '../../Utils/Colors';

const index = (props) => {
  
  
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const renderView = ({ item, index }) => {
  
    return (

      <View style={styles.sliderContainer}>
        {
          index < (props.data.length - 1) ? <Text style={styles.title}>Slide to Next &#62;&#62;&#62;</Text> : <Text style={styles.title}>Already on Last Slide</Text>
        }
        <Image width={250} height={250} style={styles.img} source={item.image } />
        <Text style={[styles.title,{marginVertical:'3%',marginBottom:'0%'}]}>
          {item.title}
        </Text>
        <Text style={styles.descriptionText}>
          {item.description}
        </Text>


      </View>
    )
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={[styles.title,{marginTop:'5%'}]}>{props.title} Traffic Rules</Text>
   <FlatList
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}
        data={props.data}
        renderItem={item => renderView(item)}
        keyExtractor={item => item.title}
        style={{ width: SCREEN_WIDTH + 5, height: '100%' }}
      
      />
</View>
    </ScrollView>
  )
}

export default index;