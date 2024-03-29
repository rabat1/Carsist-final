import { StyleSheet } from "react-native"
import Colors from "../../Utils/Colors"

export default StyleSheet.create({
    item:{
        flexDirection:'row',
        paddingHorizontal:10,
        paddingVertical:7,
        alignItems:'center',
    
    },
    itemContainer:{
        paddingHorizontal:10,
    },
    label:{
     flex:2,
    },
    textWrapper:{
        flexDirection:'row',
    },
    serviceName:{
        color:Colors.primaryDark,
        fontSize:20,
        paddingVertical:5,
        fontFamily:'Redressed-Regular'
    },
    verticalSeperator:{
        borderLeftWidth:0.3,
        borderLeftColor:Colors.primaryDark, 
        paddingLeft:20,
        flex:2,
    },
    //for slip Details Modal
    slipText:{
        width:'100%',
        borderBottomColor:Colors.primaryDark,
        borderBottomWidth:2 ,
        height:40,
        backgroundColor:Colors.primary,
        color:Colors.white,
        fontWeight:'700',
        fontSize:16,
        textAlign:'center',
      },
      imageContainer:{
        marginBottom:15,alignItems:'center'
      },
      image:{
        width:90,height:75
      },
      itemSeperator:{borderBottomEndRadius:2,borderBottomWidth:0.5},
})