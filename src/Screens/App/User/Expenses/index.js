import React, { useState } from 'react'
import { View } from 'react-native';
import ServiceExpense from '../../../../Components/ServiceExpense'
import { CustomHeader } from '../../../../Navigation/CustomHeader';
const index = () => {
    const expenses = [
        {
          image_url:
          "https://static.onecms.io/wp-content/uploads/sites/9/2020/04/24/ppp-why-wont-anyone-rescue-restaurants-FT-BLOG0420.jpg",
          service_name: "Service Name",
          date: 'Date',
          mechanic_name: "Mechanic name",
          cost: 12400,
          odometer:12,
          
        },
        {
          image_url:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
          service_name: "Beachside Bar",
          date: '23/98/1999',
          mechanic_name: "$$",
          cost: 1245,
          odometer:12,
        
        },
        {
          image_url:
            "https://media.architecturaldigest.com/photos/590cc6c3b3064307ffee59a4/master/w_3000,h_2000,c_limit/Tallest%20Restaurants%20in%20the%20World%207.jpg",
          service_name: "Beachside Bar",
          date: '23/98/1999',
          mechanic_name: "$$",
          cost: 1254,
          odometer:12,
        },
        {
            image_url:
              "https://media.architecturaldigest.com/photos/590cc6c3b3064307ffee59a4/master/w_3000,h_2000,c_limit/Tallest%20Restaurants%20in%20the%20World%207.jpg",
              service_name: "Beachside Bar",
            date: '23/98/1999',
            mechanic_name: "$$",
            cost: 1224,
            odometer:12,
          
          },
          {
            image_url:
              "https://media.architecturaldigest.com/photos/590cc6c3b3064307ffee59a4/master/w_3000,h_2000,c_limit/Tallest%20Restaurants%20in%20the%20World%207.jpg",
              service_name: "Beachside Bar",
            date: '23/98/1999',
            mechanic_name: "$$",
            cost: 12444,
            odometer:12,
          
          },
          {
            image_url:
              "https://media.architecturaldigest.com/photos/590cc6c3b3064307ffee59a4/master/w_3000,h_2000,c_limit/Tallest%20Restaurants%20in%20the%20World%207.jpg",
              service_name: "Beachside Bar",
            date: '23/98/1999',
            mechanic_name: "$$",
            cost: 1246,
            odometer:12,
          },
           
      ];
      const [modalVisible,setModalVisible]= useState(false);
      const [slipData,setSlipData]= useState('');

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

export default index
