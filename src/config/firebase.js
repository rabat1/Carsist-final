import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';

async function registerUser(authparams) {
  const { name, email, contact, password } = authparams;
  const { user } = await auth().createUserWithEmailAndPassword(email, password);

  user.sendEmailVerification();

  let uid = user.uid.toString();
  let mechanic = false;

  await firestore().collection('users').doc(uid).set({
    name, email, contact, mechanic
  });
}

async function saveTokenToDatabase(token,userid,user) {


  if(user == true)
  {
    await firestore().collection('users').doc(userid).set({
      token: token
    }, { merge: true })
  }
  else if(user == false)
  {
    await firestore().collection('mechanic').doc(userid).set({
      token: token
    }, { merge: true })
  }
  
    
  

  
}
 function generateUserToken(userid,user)
{
  messaging()
  .getToken()
  .then(token => {
    //console.log(token)
    saveTokenToDatabase(token,userid,user);
  });

}
async function loginUser(email, password) {

  const { user } = await auth().signInWithEmailAndPassword(email, password);
  // Get the device token
  // console.log("i am from frebase func",user);
  

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


async function getUser(uid) {
  const { _data } = await firestore().collection('users').doc(uid).get();
  // console.log('getuserdata', _data);
  // console.log('getuserdata', _data.email);
  _data.id = uid;

  return _data;
}

async function getMechanic(uid) {
  const { _data } = await firestore().collection('mechanic').doc(uid).get();
   //console.log('getuserdata',_data);
  // console.log('getuserdata',_data.email);
  _data.id = uid;
  return _data;}

async function getMechanicList() {
  const mechanicList=[];
  const data = await firestore().collection('mechanic')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        mechanicList.push({...doc.data(),id:doc.id});
        // const id = doc.id;
        // console.log('mechId',id);
      })
    })
    .catch()
    

   
  return mechanicList;
}




async function getMechanicRatings(mechid) {
  
  var mechanicRatingData = [];
    const data1 = await firestore().collection('ratings').where('mechanicid', '==', mechid)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
      
        mechanicRatingData.push(doc.data());
      })
    })
    .catch()
  
  return mechanicRatingData;


}

async function setMechanicRatings(mechanicid, rating) {

  const userId = auth().currentUser.uid;
  await firestore().collection('ratings').doc().set({
    mechanicid: mechanicid,
    givenby: userId,
    value: rating,
  })

}


//expense list by rabat
async function userExpenseList() {
  const userId = auth().currentUser.uid;
  var expenseData = [];

  await firestore().collection('expenses').where('userid', '==', userId)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        expenseData.push(doc.data());
      })
    })
    .catch()
  return expenseData;
}

async function addRecFuelTracking(form, uid) {

  const userId = auth().currentUser.uid;
  let makeId = Math.floor((Math.random() * 634));
  form.id = makeId;
  form.userid = userId;
  console.log('neww', form);
  await firestore().collection('FuelList').doc().set({
    form
  })

  const latestdata = await userFuelList();
  return latestdata;
}

async function editRecFuelTracking(updatedData, uid) {

  const userId = auth().currentUser.uid;

  let form = updatedData;
  await firestore().collection('FuelList').where('form.userid', '==', userId).where('form.id', '==', updatedData.id)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.set({ form })
      });
    })
  const latestdata = await userFuelList(uid);
  return latestdata;

}

async function delRecFuelTracking(id, uid) {

  await firestore().collection('FuelList').where('form.userid', '==', uid).where('form.id', '==', id)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    })
  const latestdata = await userFuelList(uid);
  return latestdata;
}

async function userFuelList(uid) {


  const userId = auth().currentUser.uid;
  var fuelRecord = [];

  await firestore().collection('FuelList').where('form.userid', '==', userId).get().then(snapshot => {
    snapshot.forEach(doc => {
      fuelRecord.push(doc.data().form);
    })
  })
    .catch()
  return fuelRecord;
}

async function updateStatus(uid) {
  await firestore()
    .collection('users')
    .doc(uid)
    .update({
      emailVerified: true
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




async function uploadImage(folder, response) {
  const reference = storage().ref(folder + response['fileName']);
  await reference.putFile(response["uri"]);
  const url = await storage().ref(folder + response['fileName']).getDownloadURL();
  return url;
}


//'shop images/'
async function registerMechanic(params) {
  const { name, email, contact, password, shopName, address, services, cnic, slipImage, shopImage,latitude,longitude } = params;
  const { user } = await auth().createUserWithEmailAndPassword(email, password);

  user.sendEmailVerification();
  const shopUrl = await uploadImage('shop images/', shopImage);
  const slipUrl = await uploadImage('registration-slip/', slipImage);

  let uid = user.uid.toString();
  let mechanic=true;

  await firestore().collection('mechanic').doc(uid).set({
    name, email, contact, status: 'pending', shopName, address, services, cnic, shopUrl, slipUrl,mechanic,latitude,longitude
  });
  return uid;
}

async function updateUserProfile(params)
{
  const {name,contactno,user} = params;
 

  firestore()
  .collection('users')
  .doc(user.id)
  .update({
    name,contactno
  })
 
}
async function updateMechanicProfile(params)
{
  const {name,contactno,user,services} = params;
 
  firestore()
  .collection('mechanic')
  .doc(user.id)
  .update({
    name,contactno,services
  })
 
}

async function addride(params)
{
  
  const {mechanicId,id,pickup,name,phoneNo,issue} = params;
  const docRef = await firestore()
  .collection('rides')
  .add({
    mechanicId,userId:id,pickup,username:name,userphone:phoneNo,issue,status:'pending'
  });
// console.log(' i am docref',docRef);

  return docRef["_documentPath"]['_parts'][1];
}
export {
  registerUser, loginUser, getUser, updateStatus, registerMechanic, getMechanic, delRecFuelTracking, userExpenseList,
  addRecFuelTracking, userFuelList, editRecFuelTracking, setMechanicRatings, getMechanicRatings
,generateUserToken,updateUserProfile,updateMechanicProfile
,uploadDocument,addUserDocument,getUserDocuments,getMechanicList,addride
}


