import { View, Text, FlatList, Dimensions, Image, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles';
import Colors from '../../Utils/Colors';

const index = (props) => {
  console.log('getdata', props.data);
  console.log('tit', props.title);
  const SCREEN_WIDTH = Dimensions.get('window').width;

  const renderView = ({ item, index }) => {

    return (

      <View style={styles.sliderContainer}>
        {
          index < (props.data.length - 1) ? <Text style={styles.title}>Slide to Next</Text> : <Text style={styles.title}>Already on Last Slide</Text>
        }
        <Image width={250} height={250} style={styles.img} source={{ uri: 'http://www.shutterstock.com/blog/wp-content/uploads/sites/5/2016/03/fall-trees-road-1.jpg' }} />
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

export default index