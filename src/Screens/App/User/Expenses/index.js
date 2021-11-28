import React, { useState } from 'react'
import { View,Text } from 'react-native';
import ServiceExpense from '../../../../Components/ServiceExpense';
import { connect } from 'react-redux';
import { CustomHeader } from '../../../../Navigation/CustomHeader';
const index = (props) => {
    const expenses = [
        {
          service_name: "Service Name",
          date: 'Date',
          mechanic_name: "Mechanic name",
          cost: 12400,
          odometer:12,
          
        },
        {
          service_name: "Beachside Bar",
          date: '23/98/1999',
          mechanic_name: "$$",
          cost: 1245,
          odometer:12,
        
        },
        {
          service_name: "Beachside Bar",
          date: '23/98/1999',
          mechanic_name: "$$",
          cost: 1254,
          odometer:12,
        },
        {
              service_name: "Beachside Bar",
            date: '23/98/1999',
            mechanic_name: "$$",
            cost: 1224,
            odometer:12,
          
          },
          {
              service_name: "Beachside Bar",
            date: '23/98/1999',
            mechanic_name: "$$",
            cost: 12444,
            odometer:12,
          
          },
          {
              service_name: "Beachside Bar",
            date: '23/98/1999',
            mechanic_name: "$$",
            cost: 1246,
            odometer:12,
          },
           
      ];
      const [modalVisible,setModalVisible]= useState(false);
      const [slipData,setSlipData]= useState('');
      //yayy userid mil gai ab isko bhej kar expense data uthalo firebase par
console.log('props count',props.userData.userReducer.user.id);
    return (
<View>    
  
<CustomHeader isHome={true} title='Expenses' />
  
   <ServiceExpense 
   modalVisible={modalVisible} 
   setModalVisible={setModalVisible} 
   data={expenses}
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
