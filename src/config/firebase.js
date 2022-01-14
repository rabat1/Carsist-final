import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
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

async function saveTokenToDatabase(token) {

  const userId = auth().currentUser.uid;

  // Add the token to the users datastore
  await firestore().collection('users').doc(userId).set({
    token: token
  }, { merge: true })

}

async function loginUser(email, password) {

  const { user } = await auth().signInWithEmailAndPassword(email, password);
  // Get the device token
  messaging()
    .getToken()
    .then(token => {
      //console.log(token)
      saveTokenToDatabase(token);
    });


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





async function updateStatus(uid)
{
await firestore()
  .collection('users')
  .doc(uid)
  .update({
    emailVerified : true
  })
}

async function getUserDocuments(uid)
{ 
  let data =[];
  const querySnapshot = await firestore()
  .collection('UserDocuments')
  // Filter results
  .where('uid', '==',uid)
  .get();
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, ' => ', doc.data());
  data.push({...doc.data(),id:doc.id});
});
return data;
}
async function uploadDocument(response)
{
  const reference = storage().ref('user-documents/' + response['name']);
  await reference.putFile(response["uri"]);
  const url = await storage().ref('user-documents/'+ response['name']).getDownloadURL();
  return url;
}

async function addUserDocument(response,uid,password)
{
 
  const url = await uploadDocument(response);
  console.log(url,response,uid,password)
  await firestore()
  .collection('UserDocuments')
  .add({
   url:url,
   name:response['name'],
   uid:uid,
   createdAt: firestore.FieldValue.serverTimestamp(),
   password:password
  })
  .then(() => {
    console.log('Document added');
  });
  return url;

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


export{
    registerUser,loginUser,getUser,updateStatus,registerMechanic,getMechanic,delRecFuelTracking,userExpenseList, addRecFuelTracking, userFuelList, editRecFuelTracking
    ,uploadDocument,addUserDocument,getUserDocuments
}


