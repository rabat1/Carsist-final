import React, { useRef, useState } from 'react'
import { View, Text, KeyboardAvoidingView, TextInput, Animated } from 'react-native'
import Input from '../Input'
import DropDownPicker from 'react-native-dropdown-picker';
import CustomButton from '../CustomButton';
import { connect } from 'react-redux';
import Colors from '../../Utils/Colors';
import style from './style'


const index = (props) => {
    
    const [nameTemp, setName] = useState(props.userData.userReducer.user.name)
    const [phoneNoTemp, setPhomeNoTemp] = useState(props.userData.userReducer.user.contact)


    const fadeAnim = useRef(new Animated.Value(0)).current
    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                useNativeDriver: true,
                duration: 1800,

            }
        ).start();
    }, [fadeAnim])

    React.useEffect(()=>{
        {phoneNoTemp.length>0&&nameTemp.length>0?props.setForm({ ...props.form, 'phoneNo': phoneNoTemp,'name': nameTemp }):null}
      
    },[])


    return (
        <KeyboardAvoidingView>

            <View style={style.animatedview}>
                <Animated.View               // Special animatable View
                    style={{
                        opacity: fadeAnim,
                    }}
                >
                    <Text style={style.animatedText}>
                        Don't Worry Carsist is Here to help you : )</Text>
                </Animated.View>
            </View>
            <View style={style.divider}></View>
            <View style={style.divider}></View>
            <View style={style.divider}></View>
            <Text style={style.formTitle}>
                Please Fill out the Form</Text>

            <View style={{paddingHorizontal:15}}>
            <Input
                onChangeText={(value) => {
                    setName('')
                    props.onChangeText({ name: 'name', value: value })
                }}

                value={props.form.name || ""}
                label='Name*' placeholder="Enter Your Name" />

            <Text style={style.textLabel}>Your Problem*</Text>
            <DropDownPicker
                listMode="SCROLLVIEW"  
                open={props.open}
                value={props.value}
                items={props.items}
                setOpen={props.setOpen}
                setValue={props.setValue}
                setItems={props.setItems}
                onChangeValue={(value) => {
                    console.log(value)
                    props.onChangeText({ name: 'issue', value: value })
                }}
                style={style.dropdown}
            />


            <Input
                onChangeText={(value) => {
                    setPhomeNoTemp('')
                    props.onChangeText({ name: 'phoneNo', value: value })
                }}
                keyboardType='numeric'
                value={props.form.phoneNo || ""}
                label='Your Phone No.*' placeholder="Enter Phone Number" />

            <Input
                onChangeText={(value) => {
                    props.onChangeText({ name: 'description', value: value })
                }}
                multiline={true}
                value={props.form.description || ""}
                label='Description' placeholder="Enter Description" />
            <CustomButton
                //  loading={loading}
                onPress={props.onSubmit}
                title='Submit'
                primary />
                </View>

        </KeyboardAvoidingView  >
    )
}
function mapStateToProps(user) {
    return {
        userData: user

    }
}
export default connect(mapStateToProps)(index);

