import React from 'react'
import { View, Text } from 'react-native'
import { CustomHeader } from '../../../../Navigation/CustomHeader'

var admin = require('firebase-admin');



const index = () => {

// Node.js

// ownerId - who owns the picture someone liked
// userId - id of the user who liked the picture
// picture - metadata about the picture

// async function onMechanicSelected(mechanicId, userId, picture) {
//   // Get the owners details
//   const mechanic = admin.firestore().collection('users').doc(mechanicId).get();

//   // Get the users details
//   const user = admin.firestore().collection('users').doc(userId).get();

//   await admin.messaging().sendToDevice(
//     mechanic.token, // ['token_1', 'token_2', ...]
//     {
//       data: {
//         // notification: {
//         //     title: "Welcome",
//         //     body: "thank for installed our app",
//         //   },
//             //data hata kar notification rakho bs 
//         mechanic: JSON.stringify(mechanic),
//         user: JSON.stringify(user),
//         picture: JSON.stringify(picture),
//       },
//     },
//     {
//       // Required for background/quit data-only messages on iOS
//       contentAvailable: true,
//       // Required for background/quit data-only messages on Android
//       priority: 'high',
//     },
//   ).then(function(response) {
//     console.log("Notification sent successfully:", response);
//   })
//   .catch(function(error) {
//     console.log("Notification sent failed:", error);
//   });  
// }





    return (
        <View>
                 <CustomHeader title='Mecahnic Details' />
        
            <Text>Details</Text>
        </View>
    )
}

export default index
