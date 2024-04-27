"use server";

import { redirect } from 'next/navigation'
import Stripe from "stripe";
import { handleError } from '../utils';
import { connectToDatabase } from '../database/mongoose';
import Transaction from '../database/models/transaction.model';
import { updateCredits } from './user.actions';
const Mpesa = require('mpesa-node')


export async function checkoutCredits() {
console.log("Hello world")

// const mpesaApi = new Mpesa({ consumerKey: process.env.MPESA_CONSUMER_KEY,  consumerSecret: process.env.MPESA_CONSUMER_SECRET, environment: 'sandbox' })

// const {
//   accountBalance,
//   lipaNaMpesaOnline,
//   lipaNaMpesaQuery,
//   reversal,
//   transactionStatus
// } = mpesaApi

// const testMSISDN = 254708374149
//  const amount = 100
//  const accountRef = Math.random().toString(35).substr(2, 7)
//  const session = await lipaNaMpesaOnline(testMSISDN, amount, URL + '/lipanampesa/success', accountRef)

//  console.log("Session: ", session)
//  redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/profile`)
}



  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const amount = Number(transaction.amount) * 100;
  // const session = await stripe.checkout.sessions.create({
  //   line_items: [
  //     {
  //       price_data: {
  //         currency: 'usd',
  //         unit_amount: amount,
  //         product_data: {
  //           name: transaction.plan,
  //         }
  //       },
  //       quantity: 1
  //     }
  //   ],
  //   metadata: {
  //     plan: transaction.plan,
  //     credits: transaction.credits,
  //     buyerId: transaction.buyerId,
  //   },
  //   mode: 'payment',
  //   success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
  //   cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
  // })



// export async function createTransaction(transaction: CreateTransactionParams) {
//   try {
//     await connectToDatabase();

//     // Create a new transaction with a buyerId
//     const newTransaction = await Transaction.create({
//       ...transaction, buyer: transaction.buyerId
//     })

//     await updateCredits(transaction.buyerId, transaction.credits);

//     return JSON.parse(JSON.stringify(newTransaction));
//   } catch (error) {
//     handleError(error)
//   }
// }