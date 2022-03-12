import React, { useEffect, useState } from 'react'
import { ScrollView, View, } from 'react-native';
import ServiceExpense from '../../../../Components/ServiceExpense';
import { connect } from 'react-redux';
import { CustomHeader } from '../../../../Navigation/CustomHeader';
import { userExpenseList } from '../../../../config/firebase';
import CustomButton from '../../../../Components/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/core';


const index = (props) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [slipData, setSlipData] = useState('');
  const [expenseList, setExpenseList] = useState();
  const { navigate } = useNavigation();
    
  const getExpenseData = async () => {

    const data = await userExpenseList();
    console.log('data', data);
    setExpenseList(data);
  }

  React.useEffect(() => {
    getExpenseData();
  }, []);

  return (
    <View style={{ backgroundColor: 'white', minHeight: '100%' }}>

      <CustomHeader isHome={true} title='Expenses' />
      <ScrollView>
        <ServiceExpense
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          data={expenseList}
          slipData={slipData}
          setSlipData={setSlipData}

        />
        {expenseList ?
          expenseList.length > 0 ? (
            <CustomButton style={{ width: '90%', alignSelf: 'center', marginBottom: '80%', marginTop: 40 }}
              onPress={() => navigate('graph', { expenseList })} primary title='Show Results in Graph' />
          ) : null : null
        }

      </ScrollView>
    </View>
  )
}
function mapStateToProps(user) {
  return {
    userData: user

  }
}
export default connect(mapStateToProps)(index);
