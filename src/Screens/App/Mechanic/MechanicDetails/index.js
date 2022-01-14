import React from 'react'
import { View, Text } from 'react-native'
import CustomButton from '../../../../Components/CustomButton';
import { CustomHeader } from '../../../../Navigation/CustomHeader'
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';

//import * as admin from 'firebase-admin'
//https://rnfirebase.io/messaging/server-integration
//https://instamobile.io/react-native-tutorials/push-notifications-react-native-firebase/

const index = (props) => {

// Node.js

// ownerId - who owns the picture someone liked
// userId - id of the user who liked the picture
// picture - metadata about the picture

async function onMechanicSelected() {
  // Get the owners details
  //const mechanic = admin.firestore().collection('users').doc(mechanicId).get();
  const userId= props.userData.userReducer.user.id
  console.log(userId)
  //console.log('data',data);
 
  // Get the users details
   const user = await firestore().collection('users').doc(userId).get();
  const token= user._data.token;
  messaging()
    .getToken()
    .then(token => {
      console.log(token)
     // saveTokenToDatabase(token);
    });

//    const registrationToken = 'YOUR_REGISTRATION_TOKEN';

    const message = {
    token,
      data: {
        score: '850',
        time: '2:45'
      },
    
    };
    messaging().sendMessage(message).then((res)=>{console.log('Haha')}).catch((err)=>{console.log('err',err)})
   
    


//   messaging().sendToDevice(
//     token, // ['token_1', 'token_2', ...]
//     {
//         // notification: {
//         //             title: "Welcome",
//         //             body: "thank for installed our app",
//         //           }
//       data: {
//         // notification: {
//         //     title: "Welcome",
//         //     body: "thank for installed our app",
//         //   },
//         //     data hata kar notification rakho bs 
//        title: 'ha',
//        body: 'hy',
//         //picture: 'hu',
//       },
//     },
//     {
//       //Required for background/quit data-only messages on iOS
//       contentAvailable: true,
//       //Required for background/quit data-only messages on Android
//      priority: 'high',
//     },
//   )
//   .then(function(response) {
//     console.log("Notification sent successfully:", response);
//   })
//   .catch(function(error) {
//     console.log("Notification sent failed:", error);
//   });  




}





    return (
        <View>
                 <CustomHeader title='Mecahnic Details' />
        
            <Text>Details</Text>
            <CustomButton title='Select' primary onPress={onMechanicSelected}  />
        </View>
    )
}

function mapStateToProps(user) {
    return {
      userData:user
      
    }
  }
  
  
  export default connect(mapStateToProps)(index);
  