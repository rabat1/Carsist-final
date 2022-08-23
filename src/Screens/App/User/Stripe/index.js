import { CardField, StripeProvider, useStripe } from "@stripe/stripe-react-native";
import { Spinner } from "native-base";
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Button, Text, Alert, ActivityIndicator } from 'react-native';
import CustomButton from "../../../../Components/CustomButton";
import { CustomHeader } from "../../../../Navigation/CustomHeader";


const index = ({navigation}) => {
    return (

        <StripeProvider publishableKey="pk_test_51Kcpi6H2WhhBPXdA0rj2PAE8uXo323Zmcud4uJ9F6z2rK2jkWECTQ4j6900FX8jfypDZ654nf6N61iqo3bfq339s00VAEJRhW7" merchantIdentifier="merchant.identifier" >
            <SafeAreaView>
                <StripeTest />
            </SafeAreaView>
        </StripeProvider>

    );


};


const StripeTest = ({navigation}) => {
    const { confirmPayment } = useStripe();
    const [key, setKey] = useState('');
    const [loading,setLoading]=useState(false);
    useEffect(() => {
        try {
            //10.0.2.2
            fetch('http://efc2-119-152-101-97.ngrok.io/create-payment-intent', {
                method: "POST",
            }
            )
                .then(res => res.json())
                .then(res => {
                    //   const clientSecret = (res.client_secret).toString;

                    //  const intent = res as {clientSecret:string};
                    setKey(res.clientSecret);
                })
        }
        catch (error) {
            console.log(error);
        }
    }, []);
    const handlePayment = async () => {
        setLoading(true);
        const { error } = await confirmPayment(key, {
            type: 'Card',
            billingDetails: {
                email: 'joe@doe.com'
            },
        });
        if (error) {
            Alert.alert("There is some issue, You can't pay Now :(", error.message)
            setLoading(false);
        }
        else {
            Alert.alert("You have Successfully paid your Bill, Thanks :)");
            navigation.navigate("home");
            setLoading(false);
           
            
        }
    }

    return (
        <View style={{backgroundColor:'white',minHeight:'100%'}}>
            <CustomHeader title="Pay With Strip" />
        <View style={{marginTop:'50%',marginHorizontal:20}}>
            <Text style={{color:'black',textAlign:'center',fontSize:16}}>Please Enter Your Card Details</Text>
            <CardField
                postalCodeEnabled={false}
                style={{
                    height: 50,
                    width: '100%',
                    marginVertical:20
                }}

            />
            {loading?<ActivityIndicator />:
            <CustomButton title="Pay Now" primary onPress={handlePayment} />
}
        </View>
        </View>
    );
};

export default index;