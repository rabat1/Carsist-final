import { StyleSheet } from "react-native"
import Colors from '../../Utils/Colors';

export default StyleSheet.create({
    textLabel: {
        color: Colors.primaryDark,
        marginBottom: 5
    },
    dropdown:
    {
        borderColor: Colors.grey,
        height: 45,
        marginBottom: 8
    },
    animatedview: {
        backgroundColor: Colors.primary,
        width: '99.5%', height: 100,
        justifyContent: 'center',
        borderBottomRightRadius: 80,

    },
    animatedText: {
        color: Colors.white,
        fontSize: 20,
        textAlign: 'center',
        fontFamily:'Sofia-Regular',
    },
    formTitle:{
        fontSize:16,
        marginTop:5,
        color:Colors.primaryDark,
        textAlign:'center',
        fontFamily:'Sofia-Regular'
    },
    divider:{backgroundColor:Colors.primary, width:'84%', height:1, marginTop:3}
});