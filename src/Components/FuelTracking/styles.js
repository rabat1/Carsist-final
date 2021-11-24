import { StyleSheet } from "react-native"
import Colors from "../../Utils/Colors"

export default StyleSheet.create({
    itemContainer:{
        paddingVertical:5,
        marginLeft:50,
       
    },
    image:{
        width:'100%',
        height:170,
    },
    itemText:{
        color:Colors.primaryDark, 
        fontSize:16,
        fontWeight:'bold', 
        marginLeft:20, 
        
    },
    itemTextValue:{
        color:Colors.primary,
    },
    editContactButton:{
        backgroundColor:Colors.secondary,
        width:55,
        height:55,
        borderRadius:100,
        justifyContent:'center',alignItems:'center',
        position:"absolute",
        top:480,
        right:20,
    
        }
})