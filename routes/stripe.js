const express = require('express');
const Stripe = require('stripe');
require("dotenv").config();
const stripe = Stripe("sk_test_51P0rpP08pCACZYsMrlmoA1GDVoOn9ATRUi7dvas4qRoSlN7XT2tVogwGBtw0kXgERncRUdp3fQ0ykxOoXsE5chH000zghoby4s");
const router = express.Router();

router.post('/checkoutPayment', async (req, res) => {
    try {
        // Extract authorization header
        const authorizationHeader = req.headers.authorization; 
        
        // Check if authorization header is missing or invalid
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: Missing or invalid Authorization header' });
        }

        // Extract API key from authorization header
        const apiKey = authorizationHeader.split('Bearer ')[1];
            console.log(apiKey);
        const { name, phoneNumber, cardNumber, city, expiry, cvv } = req.body;
        
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                  price: "prctbl_1P0s6408pCACZYsMTNkKMIYW",
                  quantity: 1,
                },
            ],
            payment_method_types: ["card"],
            success_url: `https://sb3aat-frontend.vercel.app/?success=true`,
            cancel_url: `https://sb3aat-frontend.vercel.app/?cart`,
            // client_email: "test@example.com", // Set the client's email address
            data: {
                client_name: name,
                client_phone: phoneNumber,
                client_cardNumber: cardNumber,
                client_city: city,
            },
            billing_address_collection: "auto", // Collect billing address automatically
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'], // Limit shipping address to specific countries
            },
            // Set the API key from the environment variables in the request headers
            // headers: {
            //     Authorization: `Bearer ${apiKey}`
            // }
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
  
module.exports = router;
