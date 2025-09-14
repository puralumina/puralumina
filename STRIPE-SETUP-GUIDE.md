# 🛍️ Stripe Apparel Shop Setup Guide

## 📋 Overview
This guide will help you set up a fully functional apparel shop with Stripe checkout and Firebase backend. No programming skills required!

---

## 🔥 PART 1: Firebase Setup (15 minutes)

### Step 1: Install Firebase CLI
1. Open your computer's terminal/command prompt
2. Type: `npm install -g firebase-tools`
3. Press Enter and wait for installation

### Step 2: Login to Firebase
1. Type: `firebase login`
2. Press Enter
3. Your browser will open - sign in with your Google account
4. Return to terminal when done

### Step 3: Initialize Firebase Functions
1. Navigate to your project folder in terminal
2. Type: `firebase init functions`
3. Select these options:
   - **Use existing project** → Select your Firebase project
   - **Language** → JavaScript
   - **ESLint** → No
   - **Install dependencies** → Yes

### Step 4: Replace Functions Code
1. Open the file `functions/index.js` in your project
2. Replace ALL content with the code I provided above
3. Save the file

### Step 5: Set Stripe Configuration
1. In terminal, type these commands (replace with your actual Stripe keys):
```bash
firebase functions:config:set stripe.secret_key="sk_test_YOUR_STRIPE_SECRET_KEY"
firebase functions:config:set stripe.webhook_secret="whsec_YOUR_WEBHOOK_SECRET"
```

### Step 6: Deploy Functions
1. Type: `firebase deploy --only functions`
2. Wait for deployment to complete
3. Copy the function URLs shown (you'll need them later)

---

## 💳 PART 2: Stripe Setup (20 minutes)

### Step 1: Create Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Sign up for a free account
3. Complete account verification

### Step 2: Get Your API Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)
4. Save these keys safely - you'll need them

### Step 3: Create Products in Stripe
For EACH product and size/color combination, you need to create:

#### Example: T-Shirt in Black, Size M
1. Go to [Stripe Products](https://dashboard.stripe.com/products)
2. Click **"+ Add Product"**
3. Fill in:
   - **Name**: "Original T-Shirt - Black - M"
   - **Description**: "Premium 100% cotton t-shirt - Black color, Medium size"
   - **Image**: Upload product image
4. Under **Pricing**:
   - **Price**: $24.99
   - **Currency**: USD
   - **Billing**: One time
5. Click **"Save Product"**
6. **IMPORTANT**: Copy the **Price ID** (starts with `price_`) - you'll need this!

#### Repeat for ALL Combinations
You need to create separate products for:
- T-Shirt: Black-S, Black-M, Black-L, Black-XL, Black-XXL, White-S, White-M, etc.
- Hoodie: Black-S, Black-M, Black-L, etc.
- Hat: Black-One Size, White-One Size
- Each combination gets its own Stripe product and price ID

### Step 4: Set Up Webhooks
1. Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **"+ Add endpoint"**
3. **Endpoint URL**: `https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/stripeWebhook`
4. **Events to send**:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
5. Click **"Add endpoint"**
6. Copy the **Webhook Secret** (starts with `whsec_`)

---

## 🔧 PART 3: Update Your Code (10 minutes)

### Step 1: Update Firebase Function URL
1. Open `src/services/stripeService.ts`
2. Replace `YOUR-PROJECT-ID` with your actual Firebase project ID
3. Save the file

### Step 2: Update Product Data
1. Open `src/data/apparelProducts.ts`
2. For each product, replace the placeholder Stripe IDs:
   - Replace `prod_REPLACE_WITH_STRIPE_PRODUCT_ID_1` with actual Stripe Product ID
   - Replace `price_REPLACE_WITH_STRIPE_PRICE_ID_1` with actual Stripe Price ID
3. Update inventory numbers as needed
4. Save the file

### Step 3: Add Environment Variables
1. Create a `.env` file in your project root
2. Add your Stripe publishable key:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY
```

---

## ✅ PART 4: Testing (5 minutes)

### Test the Complete Flow:
1. Visit your apparel shop: `/apparel`
2. Add items to cart
3. Go to checkout
4. Enter email address
5. Click "Proceed to Secure Payment"
6. Complete test payment with Stripe test card: `4242 4242 4242 4242`
7. Verify order appears in Stripe Dashboard

---

## 🚨 IMPORTANT NOTES

### Security ✅
- Your Stripe secret key is NEVER exposed to users
- All payments processed securely by Stripe
- Customer data protected with industry standards
- PCI compliance handled automatically

### What You DON'T Need:
- ❌ Printify account
- ❌ Complex fulfillment setup
- ❌ Manual order processing initially

### What You DO Need:
- ✅ Stripe account (free)
- ✅ Firebase project (free tier available)
- ✅ Product images
- ✅ Inventory management

---

## 📞 Troubleshooting

### Common Issues:
1. **Function deployment fails**: Check that you're in the right directory
2. **Stripe keys not working**: Ensure you're using the correct test/live keys
3. **Webhook not receiving events**: Verify the webhook URL is correct
4. **Products not loading**: Check that Stripe Product/Price IDs are correct

### Testing Stripe:
- Use test card: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC
- Any billing ZIP code

---

## 🎯 Next Steps After Setup

1. **Add Real Product Images**: Replace placeholder images with your actual product photos
2. **Set Inventory Levels**: Update stock quantities in the product data
3. **Configure Shipping**: Set up real shipping rates in Stripe
4. **Go Live**: Switch to live Stripe keys when ready for real customers
5. **Add More Products**: Create additional products following the same pattern

---

## 💡 Pro Tips

- Start with test mode and a few products
- Test the entire flow before going live
- Keep your Stripe secret keys secure
- Monitor your Stripe dashboard for orders
- Set up email notifications for new orders

This setup gives you a professional, secure e-commerce solution that scales with your business!