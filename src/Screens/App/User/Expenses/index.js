import React, { useEffect, useState } from 'react'
import { View, } from 'react-native';
import ServiceExpense from '../../../../Components/ServiceExpense';
import { connect } from 'react-redux';
import { CustomHeader } from '../../../../Navigation/CustomHeader';
import {userExpenseList} from '../../../../config/firebase';

const index = (props) => {

      const [modalVisible,setModalVisible]= useState(false);
      const [slipData,setSlipData]= useState('');
      const [expenseList, setExpenseList]= useState();
      
  const getExpenseData=async ()=>{
    
  const data= await userExpenseList(props.userData.userReducer.user.id);
  console.log('data',data);
  setExpenseList(data);
}


React.useEffect(()=>{
  console.log('calledd')
    getExpenseData();
   
 },[]);

 React.useEffect(()=>{
},[expenseList]);

 
    return (
<View>    
  
<CustomHeader isHome={true} title='Expenses' />
  
   <ServiceExpense 
   modalVisible={modalVisible} 
   setModalVisible={setModalVisible} 
   data={expenseList}
   slipData={slipData}
   setSlipData={setSlipData}
   
   />
     </View>
    )

    
}
function mapStateToProps(user) {
  return {
    userData:user
    
  }
}


export default connect(mapStateToProps)(index);
