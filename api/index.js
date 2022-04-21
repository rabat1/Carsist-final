const express = require('express');
const Stripe= require('stripe');
const stripe = new Stripe("sk_test_51Kcpi6H2WhhBPXdAkHU8dawhKYblQItyj5iySn2V5HrZUtepFKW97wDom3On9lsZnIpFp8LxaJIzXhDKkBQg7Ljs00GdVBwQO7",{
    apiVersion:'2020-08-27',
    typescript:true,
});
const app=express();
app.use(express.json());

app.post('/create-payment-intent',async(req,res)=>{
    console.log("calllllllled");
    const paymentIntent= await stripe.paymentIntents.create({
        amount:5000,
        currency:'usd',
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});
// //});
app.listen(3000, ()  =>console.log('running'));