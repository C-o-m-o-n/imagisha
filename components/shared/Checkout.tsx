"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { checkoutCredits } from "@/lib/actions/transaction.action";

import { Button } from "../ui/button";
import useSWR from 'swr'
import axios from "axios";
 
// const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json())

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
}: {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}) => {
  const { toast } = useToast();  

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast({
        title: "Order placed!",
        description: "You will receive an email confirmation",
        duration: 5000,
        className: "success-toast",
      });
    }

    if (query.get("canceled")) {
      toast({
        title: "Order canceled!",
        description: "Continue to shop around and checkout when you're ready",
        duration: 5000,
        className: "error-toast",
      });
    }
  }, []);

  const onCheckout = async () => {
    // const transaction = {
    //   plan,
    //   amount,
    //   credits,
    //   buyerId,
    // };
    // await checkoutCredits();

    try {
      const response = await axios.post('/api/mpesa', {
        amount: 1,
        phone: 254703991583,
        businessName:"Comon tech",
        transactionDesc: "Payment of X" ,
      });
  
      // Handle successful response (e.g., show success message, redirect to confirmation page)
      console.log('Lipa na Mpesa request successful:', response.data);
    } catch (error) {
      console.error('Error sending Lipa na Mpesa request:', error);
      // Handle errors (e.g., display error message)
    }
    
  };

  return (
    <form action={onCheckout} method="POST">
      <section>
        <Button
          type="submit"
          role="link"
          className="w-full rounded-full bg-gradient-to-r from-cyan-700 to-[#007822] text-white bg-cover">
          Buy Credit
        </Button>
      </section>
    </form>
  );
};

export default Checkout;