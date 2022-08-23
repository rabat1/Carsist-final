import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Text,ScrollView, Alert } from 'react-native'
import IssueRec from '../../../../Components/IssueRec'
import { CustomHeader } from '../../../../Navigation/CustomHeader';

const index = () => {
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const {navigate} = useNavigation();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [items, setItems] = useState([
        { label: 'Warning Light Shows', value: 'warningLight' },
        { label: 'Engine is Sputtering', value: 'engineIssue' },
        { label: 'Steering Wheel is Shaking', value: 'shakingWheel' },
        { label: 'Brake Pads are Worn', value: 'brakepads' },
        { label: 'Brakes are Squeaking', value: 'squeakingBrakes' },
        { label: 'Tyres are Flat', value: 'flatTyres' },
        { label: 'Car is Consuming Too Much Oil', value: 'oilConsume' },
        { label: 'Alternator is Failing', value: 'alternator' },
        { label: 'Radiator is Leaking', value: 'radiator' },
        { label: 'Starter Motor is Failing', value: 'starterMotor' },
        { label: 'Cracks in the Windscreen', value: 'cracks' },
        { label: 'Car Gives Out Excessive Emissions', value: 'excessiveEmission' },
        { label: 'Sensors Are Malfunctioning', value: 'sensor' },
        { label: 'Gear Box Problems', value: 'geraBox' },
        { label: 'Transmission Fluid is Leaking', value: 'transmissionFluid' },
        { label: 'Electrical Problems:', value: 'electrical' },
        { label: 'Car Keeps Overheating', value: 'overheating' },
        { label: 'Other', value: 'other' },

    ]);

    const onChangeText = ({ name, value }) => {
        setForm({ ...form, [name]: value });
    };

    const onSubmit = async () => {
        // navigate('mechanicSelection')
        if(!form.phoneNo || !form.name || !form.issue){
            Alert.alert("Please Fill the compulsory details")
        }
        else{
        navigate("pickuplocation",{form});
        }
    }

    return (
        <>
            <CustomHeader title='Tell Your Issue' />
            
            <ScrollView >
            <View style={{paddingVertical: 10, backgroundColor: 'white' }}>
                
                <IssueRec
                    form={form}  setForm={setForm}
                    onChangeText={onChangeText}
                    onSubmit={onSubmit}
                    open={open} setOpen={setOpen}
                    value={value} setValue={setValue}
                    items={items} setItems={setItems}
                />
            </View>
            </ScrollView>
        </>
    )
}

export default index
