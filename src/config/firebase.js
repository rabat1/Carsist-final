import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/core';
import messaging from '@react-native-firebase/messaging';

async function registerUser(authparams)
{  
    const {name,email,contact,password} = authparams;
    const {user} = await auth().createUserWithEmailAndPassword(email,password);
      
      user.sendEmailVerification();
      
      let uid=user.uid.toString();
      let mechanic=false;
      
      await firestore().collection('users').doc(uid).set({
          name,email,contact,mechanic
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
  console.log('getuserdata',_data);
  console.log('getuserdata',_data.email);
  _data.id=uid;
  
  return _data;
}

async function getMechanic(uid)
{
  const {_data} = await firestore().collection('mechanic').doc(uid).get();
  // console.log('getuserdata',_data);
  // console.log('getuserdata',_data.email);
  _data.id=uid;
  
  return _data;
}

//expense list by rabat
async function userExpenseList(uid)
{
  const {_data} = await firestore().collection('users').doc(uid).get();
  _data.id=uid;
  expenses= _data.expenses;
  return expenses;
}
async function addRecFuelTracking(form, uid) {

  const { _data } = await firestore().collection('users').doc(uid).get();
  var tempArray = [];
  for (var i = 0; i < _data.fuelList.length; i++) {
    tempArray.push(_data.fuelList[i].id);
  }
  RandomIdGenerator();

  function RandomIdGenerator() {
    let makeId = Math.floor((Math.random() * 634));

    if (!tempArray.includes(makeId)) {
      form.id = makeId;
      firestore().collection('users').doc(uid).update({
        fuelList: firestore.FieldValue.arrayUnion(form)
      });
    }
    else if (tempArray.includes(makeId)) {
      RandomIdGenerator();
    }
  }
  const latestdata = await userFuelList(uid);
  return latestdata;
}

async function editRecFuelTracking(updatedData, uid) {

  const { _data } = await firestore().collection('users').doc(uid).get();
  let fuelList;
  fuelList = _data.fuelList;
  const items = fuelList.filter(item => item.id !== updatedData.id);
  const temp = await firestore().collection('users').doc(uid).set({
    fuelList: items
  }, { merge: true })

  await firestore().collection('users').doc(uid).update({
    fuelList: firestore.FieldValue.arrayUnion(updatedData)
  });

  const latestdata = await userFuelList(uid);
  return latestdata;

}

async function delRecFuelTracking(id, uid) {
  const { _data } = await firestore().collection('users').doc(uid).get();
  let fuelList;
  fuelList = _data.fuelList;
  const items = fuelList.filter(item => item.id !== id);
  await firestore().collection('users').doc(uid).set({
    fuelList: items
  }, { merge: true })
  return items;



}

async function userFuelList(uid) {
  console.log('callll')

  const { _data } = await firestore().collection('users').doc(uid).get();
  let fuelList;
  fuelList = _data.fuelList;
  console.log('callll')
  return fuelList;
}


async function saveTokenToDatabase(token) {

  const userId = auth().currentUser.uid;

  // Add the token to the users datastore
  await firestore().collection('users').doc(userId).set({
    token: token
  }, { merge: true })


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
    registerUser,loginUser,getUser,updateStatus,registerMechanic,getMechanic,delRecFuelTracking,userExpenseList, addRecFuelTracking, userFuelList, editRecFuelTracking
    
}


