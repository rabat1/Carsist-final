import { StyleSheet } from "react-native"
import Colors from '../../Utils/Colors';

export default StyleSheet.create({
    wrapper: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        flex: 1,
        justifyContent: 'center',
      },
    
      modalView: {
        backgroundColor: Colors.white,
        marginHorizontal: 20,
        borderRadius: 10,
        minHeight: 300,
      },
    
      headerModal: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
      },
    
      title: {
        fontSize: 18,
        color:Colors.secondary,
        fontWeight:"700",
      },
    
      body: {
        minHeight: 350,
        paddingHorizontal: 20,
        paddingVertical: 10,
      },
    
      footer: {
        justifyContent: 'space-evenly',
        paddingVertical: 7,
        alignItems: 'center',
        flexDirection: 'row',
      },
    
      termsView: {
        width: 5,
        height: 5,
        borderRadius: 100,
        backgroundColor: Colors.grey,
      },
    
      footerSeparator: {
        height: 1,
        backgroundColor: Colors.primary,
      },
    
      footerItems: {
        width: '100%',
        padding: 10,
      },
    
      footerText: {
        fontSize: 12,
      },
});