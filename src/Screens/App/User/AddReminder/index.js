import React, { useState } from 'react'
import { View, Text, Modal } from 'react-native'
// import { NativeBaseProvider, Box, Alert, Text, Modal, Button } from 'native-base'
import { CustomHeader } from '../../../../Navigation/CustomHeader'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Card from '../../../../Components/Card'
import DateTimePicker from '@react-native-community/datetimepicker'
import styles from './styles'

const index = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [text, onChangeText] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    setShow(false);
    setDate(currentDate);
    console.log(date);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.base}>
      <CustomHeader title='Add Reminder'>Add Reminder</CustomHeader>
      <Card>
        <TouchableOpacity onPress={showDatepicker}>
          <Text style={styles.text}>9.00AM</Text>
          <Text>{date.toString().substring(0, 15)}</Text>
        </TouchableOpacity>
      </Card>
      <Card>
        <TouchableOpacity>
          <Text style={styles.text}>Ring tone</Text>
          <Text>chosen ringtone</Text>
        </TouchableOpacity>
      </Card>
      <Card>
        <TextInput
          style={styles.text}
          onChangeText={onChangeText}
          value={text}
          placeholder='Label'
        />
      </Card>
      <View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="spinner"
            onChange={onChange}
          />
        )}
      </View>

    </View >

  )
};
export default index