import { StyleSheet } from "react-native"
import Colors from '../../Utils/Colors';

export default StyleSheet.create({
  ratingContainer:
  {
    paddingVertical: 20, 
    flexDirection: 'row', 
    alignSelf: 'center'
  },
  ratingsText: {
    fontSize: 18, 
    color: Colors.primaryDark,fontFamily:'Sofia-Regular',
  },
    containerStyle:{ width: '60%', alignSelf: 'center',marginLeft:'5%',
  }

}); 