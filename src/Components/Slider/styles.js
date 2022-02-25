import { Dimensions, StyleSheet } from "react-native"
import Colors from '../../Utils/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
    sliderContainer:
    {
        width: SCREEN_WIDTH + 5,
        height: 'auto',
        alignItems: "center",
    },
    img: {
        width: 250,
        height: 250,
        borderColor:Colors.primaryDark,
        borderWidth:2,
        resizeMode:'stretch'
    },
    container:
    {
        minHeight: 700,
        backgroundColor: Colors.primary,

    },
    title: {
        color: Colors.white,
        marginBottom: '10%',
        fontSize: 20,
        fontFamily: 'Sofia-Regular',
        textAlign:'center'
    },
    descriptionText: {
        color: Colors.white,
        fontSize: 14,
        marginHorizontal:16,

    }

}); 