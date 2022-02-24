import { Dimensions, StyleSheet } from "react-native"
import Colors from '../../Utils/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
    sliderContainer:
    {
        width: SCREEN_WIDTH + 5,
        height: 'auto',
        alignItems: "center",
        marginTop: '10%',
        minHeight: '100%',



    },
    img: {
        width: 300,
        height: 300,
        borderRadius:50,
        borderColor:Colors.primary,
        borderWidth:5,
    },
    container:
    {
        minHeight: 700,
        backgroundColor: Colors.white
    },
    title: {
        color: Colors.primary,
        marginBottom: '10%',
        fontSize: 20,
        fontFamily: 'Sofia-Regular'
    },
    descriptionText: {
        color: Colors.primaryDark,
        fontSize: 15,
        fontFamily: 'Sofia-Regular'
    }

}); 