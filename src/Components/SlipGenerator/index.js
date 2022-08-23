import React, { useState } from 'react'
import { View, Text, KeyboardAvoidingView, TouchableOpacity, Button, TextInput } from 'react-native'
import Input from '../Input';
import CustomButton from '../CustomButton'
import Colors from '../../Utils/Colors';
import Icon from '../../Utils/Icon';
import DateTimePicker from '@react-native-community/datetimepicker';

const SlipGenerator = ({ onChangeText, onSubmit, form, loading }) => {


    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const showDatepicker = () => {
        setShow(true);
    };

    return (
        <KeyboardAvoidingView>
              <Input
              style={{color:'black'}}
            editable={false}
                label='Mechanic Name' value={form.mechanic_name} />

            <Input style={{ color: 'black' }} placeholder='Select Date' editable={false} label='Date*' value={form.date || ''} iconPosition='left'
                icon={
                    <TouchableOpacity onPress={showDatepicker}><Text><Icon color={Colors.primaryDark} type='materialCommunity' name='calendar-clock' size={26} /></Text></TouchableOpacity>
                } />

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={false}
                    display="calendar"
                    onChange={(value) => {
                        setShow(false)
                        onChangeText({ name: 'date', value: (value.nativeEvent.timestamp + 1).slice(0, 21) })
                    }}
                />
            )}

            <Input
                onChangeText={(value) => {
                    onChangeText({ name: 'service_name', value: value })
                }}
                label='Service Provided*' placeholder="Enter Service" />
          


            <Input
                onChangeText={(value) => {
                    onChangeText({ name: 'cost', value: value })
                }}
                keyboardType='numeric'
                value={form.cost || ""}
                label='Total Bill*' placeholder="Enter Amount" />

            <Input
                onChangeText={(value) => {
                    onChangeText({ name: 'odometer', value: value })
                }}
                keyboardType='numeric'
                label='Odometer' placeholder="Enter Odometer" />


            <CustomButton
                //disabled={loading}
                loading={loading}
                onPress={onSubmit}
                title='Submit'
                primary />
            <View style={{ height: 100 }} />

        </KeyboardAvoidingView>
    )
}

export default SlipGenerator;
