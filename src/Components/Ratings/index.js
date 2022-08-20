import React from 'react'
import { useState } from 'react'
import { View, Text } from 'react-native'
import { getMechanicRatings, setMechanicRatings } from '../../config/firebase'
import StarRating from 'react-native-star-rating';
import Colors from '../../Utils/Colors';
import { useNavigation, useRoute } from '@react-navigation/core';
import styles from './styles'

const index = ({disable,mechanic_id}) => {
    const [rating, setRating] = useState(0);

    const { navigate } = useNavigation();
    
    const GiveRating = async (rating,mechanic_id) => {
        console.log(rating)
        setRating(rating)
             await setMechanicRatings(mechanic_id,rating);
             navigate('home');
             
           }
  
    const GetRatings = async (mechanic_id) => {
        const ratings = await getMechanicRatings(mechanic_id)
        var calculateAvg = 0;
        var totalRatings = ratings.length;
        var avgRating;

        for (var i = 0; i < totalRatings; i++) {
            calculateAvg = calculateAvg + parseInt(ratings[i].value)
        }
        avgRating = (calculateAvg / totalRatings);
        console.log(avgRating)
        setRating(avgRating);
    }
  
    React.useEffect(()=>{
       {disable?GetRatings(mechanic_id):null}
    },[])

    return (
        <View style={styles.ratingContainer}>
            <Text style={styles.ratingsText}>Rating:</Text>
            <StarRating
                disabled={disable}
                containerStyle={styles.containerStyle}
                maxStars={5}
                rating={rating}
                starSize={25}
                fullStarColor={Colors.primaryDark}
                selectedStar={(rating) => GiveRating(rating,mechanic_id)}
            />


        </View>
    )
}

export default index
