const stripe = require('stripe')('sk_test_51NaaV7GRYWUoiN5eR5w2hTG7IlXnT2bwHFy0hTfkYr8jqc1rBQSLbAe1bQWBU0wDO7AVjnKVuk075hDvLtNyMuN00070krK16R');
const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => { 
    res.send("Hello Folks..!!! Please subscribe to my channel");
});

app.post('/payment-sheet1', async (req, res) => {
    // Use an existing Customer ID if this is a returning customer.

    const { amount, currency } = req.body;

    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: '2022-08-01' }
    );
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        customer: customer.id,
        payment_method_types: ['card'],
    });

    res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
    });
});

const port = 4002;
const host ='192.168.0.101';

app.listen(port, host, () => console.log(`Running on http://${host}:${port}`));
