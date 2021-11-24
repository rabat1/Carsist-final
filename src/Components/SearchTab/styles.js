import { StyleSheet } from "react-native"
import Colors from '../../Utils/Colors';

export default StyleSheet.create({

searchBarContainer:{
    flexDirection:'row',
    marginTop:0,
    borderBottomColor:Colors.primary,
    borderWidth:1,
    borderRadius:100,
                     
  },
  searchBtn:{
        flexDirection:'row',
        borderRadius:50,
        backgroundColor:'white', 
        height:56,
        alignItems:'center',
      //  marginRight:2,
        borderLeftWidth:1,
        borderBottomColor:Colors.primary
    },

}); 