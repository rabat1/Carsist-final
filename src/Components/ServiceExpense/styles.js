import { StyleSheet } from "react-native"
import Colors from "../../Utils/Colors"

export default StyleSheet.create({
    item:{
        flexDirection:'row',
        paddingHorizontal:10,
        paddingVertical:7,
        alignItems:'center',
      // justifyContent:'space-between',
       flex:1,
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
    itemSeperator:{
        height:0.5,
        opacity:0.7,
        backgroundColor:Colors.primaryDark,
        width:'95%',
        alignSelf:'center'
    },
    serviceName:{
        color:Colors.primaryDark,
        fontSize:16,
        fontWeight:'700',
        paddingVertical:5,
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
        marginBottom:15,borderRadius:50,alignItems:'center'
      },
      image:{
        width:100,height:100,borderRadius:50
      },
})