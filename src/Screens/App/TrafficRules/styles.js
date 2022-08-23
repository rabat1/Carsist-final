import { StyleSheet } from "react-native"
import Colors from "../../../Utils/Colors";

export default StyleSheet.create({
   
    title:{textAlign:'center',color:Colors.white,fontSize:24,marginHorizontal:20,fontFamily:'Redressed-Regular'},
    cardContainer:{ 
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'space-around',
        marginHorizontal: 20,
        minHeight:'100%', 
        marginTop:'30%'
          
          },
          container:{backgroundColor:Colors.primary},
}); 