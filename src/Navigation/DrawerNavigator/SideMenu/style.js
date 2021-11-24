import { StyleSheet } from "react-native";
import Colors from "../../../Utils/Colors";

export default StyleSheet.create({
    
logoImage:{
  width:70,
  height:70,
  alignSelf:'center',
  margin:10,
},
item:{
    flexDirection:'row',
    alignItems:'center',
   
},
drawerContainer:{
  borderBottomWidth:1,borderColor:Colors.primary, padding:3

},
itemText:{
    paddingLeft:25,
    paddingVertical:7,
    color:Colors.primaryDark,
  
}


});