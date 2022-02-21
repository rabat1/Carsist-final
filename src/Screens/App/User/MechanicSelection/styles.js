import { StyleSheet } from "react-native"
import Colors from '../../../../Utils/Colors';



export default StyleSheet.create({
    container:
    { marginHorizontal: 15, marginTop: 20 },
    title:{fontSize:20,color:Colors.primaryDark,textAlign:'center',marginBottom:10},
    listContainer:{ flexDirection: 'row', marginVertical: 10, borderBottomColor:Colors.primaryDark,borderBottomWidth:0.3 },
    img:{ width: 45, height: 45, },
    iconContainer:{ flex: 0.5, justifyContent: 'center' },
    seperator:{ height: 0.3, backgroundColor: Colors.primary },
    textColor:{color:Colors.primaryDark},
}); 