import { StyleSheet } from "react-native"
import Colors from '../../Utils/Colors';

export default StyleSheet.create({
  detailsContainer:{
  flexDirection:'row', 
  display:'flex',
  borderBottomWidth:0.5, 
  borderBottomColor:Colors.grey,
  marginTop:'5%', 
  alignItems:'center'
 },
  detailsText: 
    {flex:1.7,
    fontSize:16,
    color:Colors.primaryDark}

}); 