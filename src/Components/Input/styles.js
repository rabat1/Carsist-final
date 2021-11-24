import { StyleSheet } from "react-native"
import Colors from '../../Utils/Colors';

export default StyleSheet.create({
    inputContainer:{
        paddingVertical:8,
    },
    textInput:{
    flex:1,
    width:'100%',
    
},
wrapper:{
    height:42,
    marginTop:5,
    borderWidth:1,
    borderRadius:10,
    flexDirection:'row',
    paddingHorizontal:5,
    alignContent:'center'
},
error:{
    color:Colors.danger,
    paddingTop:4,
    fontSize:12
}

});