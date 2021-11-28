import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

async function registerUser(authparams)
{  
    const {name,email,contact,password} = authparams;
    const {user} = await auth().createUserWithEmailAndPassword(email,password);
      
      user.sendEmailVerification();
      
      let uid=user.uid.toString();
      
      await firestore().collection('users').doc(uid).set({
          name,email,contact
      });
      // const {_data} = await firestore().collection('users').doc(uid).get();
      // _data.id=uid;
      // return _data;
  //     if (user.emailVerified) {
  //    }
  // else {
  //    console.log('Not verified');
  // }
   
    
   
    
  
}

async function loginUser(email,password)
{

  const {user} = await auth().signInWithEmailAndPassword(email,password);
  console.log(user);
  //  let  uid =user.uid;
  ////user = userCredential.user.uid.toString();

  
    

    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }

  return user;
  
  // user = userCredential.user.uid.toString();

}

async function getUser(uid)
{
  const {_data} = await firestore().collection('users').doc(uid).get();
  _data.id=uid;
  return _data;
}

async function updateStatus(uid)
{
await firestore()
  .collection('users')
  .doc(uid)
  .update({
    emailVerified : true
  })
}

async function uploadImage(folder,response)
{
  const reference = storage().ref(folder + response['fileName']);
  await reference.putFile(response["uri"]);
  const url = await storage().ref(folder+ response['fileName']).getDownloadURL();
  return url;
}

//'shop images/'
async function registerMechanic(params)
{
  const {name,email,contact,password,shopName,address,services,cnic,slipImage,shopImage} = params;
  const {user} = await auth().createUserWithEmailAndPassword(email,password);

  user.sendEmailVerification();
  const shopUrl = await uploadImage('shop images/',shopImage);
  const slipUrl = await uploadImage('registration-slip/',slipImage);
  
  let uid=user.uid.toString();
    
    await firestore().collection('mechanic').doc(uid).set({
        name,email,contact,status:'pending',shopName,address,services,cnic,shopUrl,slipUrl
    });
    return uid;
}



// async function uploadMechanicInfo(params)
// {
//   // const {id,shopName,address,services,cnic,slipImage,shopImage} = params;
//   // console.log(params,id);

//   const shopUrl = await uploadImage('shop images/',shopImage);
//   const slipUrl = await uploadImage('registration-slip/',slipImage);

//   await firestore()
//   .collection('mechanic')
//   .doc(id)
//   .update({
//     shopName,address,services,cnic,shopUrl,slipUrl
//   });
// return;
//   // return(shopName,address,services,cnic,shopUrl,slipUrl);


  
// }


export{
    registerUser,loginUser,getUser,updateStatus,registerMechanic
}