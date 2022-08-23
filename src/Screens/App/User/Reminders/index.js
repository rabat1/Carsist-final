import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react';
import PushNotification from "react-native-push-notification";
import DateTimePicker from '@react-native-community/datetimepicker';
import { addReminder, userReminderList } from '../../../../config/firebase';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const index = () => {

  const [reminderList,SetReminderList]= useState();
  const isFocused = useIsFocused();
  const {navigate} = useNavigation();
  
  useEffect(() => {
    createChannels();
    getReminderList();
  }, []);
  useEffect(() => {
    getReminderList();
  }, [isFocused]);
  useEffect(()=>{

  },[reminderList]);
  

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  }
  const getReminderList = async () => {
    const data = await userReminderList();
    console.log('dddd',data);
    SetReminderList(data);
  }
  

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ date: new Date() });
  const showDatepicker = () => {
    setShow(true);
  };
  const onChangeText = ({ name, value }) => {
    setForm({ ...form, [name]: value });

  };


  const addToReminderList = async () => {

    let makeId = Math.floor(Math.random() * 634);
    form.id = makeId;
    PushNotification.localNotificationSchedule({
      id: makeId,
      channelId: 'test-channel',
      title: form.reminderTitle,
      message: form.reminder,
      date: new Date(form.date),
      allowWhileIdle: true,

    });
    await addReminder(form);
    //navigate('addReminder');
//list will update you seperate addreminder and reminder screen try it
    navigate('Reminders');

  }
  const cancelNotification = () => {
    //  PushNotification.cancelAllLocalNotifications(); 
    PushNotification.cancelLocalNotification();
  }
  return (
    <>
      <TouchableOpacity onPress={() => addToReminderList()}>
        <Text>Submit</Text>
      </TouchableOpacity>
      <TextInput style={{ color: 'black' }} placeholder='Select Date' editable={false} label='Date*' value={(form.date).toString() || ''} iconPosition='left'
      />
      <TouchableOpacity onPress={showDatepicker}><Text>Enter Date</Text></TouchableOpacity>


      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='date'
          is24Hour={true}
          display="calendar"
          onChange={(valuew) => {
            setShow(false)
            onChangeText({ name: 'date', value: (valuew.nativeEvent.timestamp) })
          }}
        />
      )}

      <TextInput style={{ color: 'black' }} placeholder='Enter Reminder'
        onChangeText={(value) => onChangeText({ name: 'reminder', value: value })}
      />

      <TextInput style={{ color: 'black' }} placeholder='Enter Reminder Title'
        onChangeText={(value) => onChangeText({ name: 'reminderTitle', value: value })}
      />



      
{
                reminderList ? (
                    reminderList.map((item, index) => {
                    //  let date=item.date.toDateString();
                    
                        return (
                            <>
                                <TouchableOpacity 
                                    onPress={() => { console.log('hello')  }}>
                                    <Text >{`Title: ${item.reminderTitle}`}</Text>
                                    <Text >{`Title: ${item.reminder}`}</Text>
                                    <Text >{`Title: ${item.date}`}</Text>

                             
                                </TouchableOpacity>
                                
                              
                            </>
                        );



                    })
                ) : <Text>No data</Text>
            }

           

    </>

  )
}

export default index;