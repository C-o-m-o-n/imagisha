"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState, FormEvent } from "react";

import { useToast } from "@/components/ui/use-toast";
import { checkoutCredits } from "@/lib/actions/transaction.action";
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Button } from "../ui/button";
import axios from "axios";


const formSchema = z.object({
  phone: z.coerce.number().min(1, {
    message: "phone must be at least 2 characters.",
  }),

})

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

  const [phone, setPhone] = useState('')

  const onCheckout = async () => {
   
    // const transaction = {
    //   plan,
    //   amount,
    //   credits,
    //   buyerId,
    // };
    // await checkoutCredits();
    // console.log(JSON.stringify({phone}))

    try {
      const response = await axios.post('/api/mpesa', {
        amount: 1,
        phone: phone,
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

  function DialogDemo() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full rounded-full bg-gradient-to-r from-cyan-700 to-[#007822] text-white bg-cover">Lipa na M-pesa</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Buy {credits} credits worth KSH {amount}</DialogTitle>
            <DialogDescription>Enter your phone number to continue</DialogDescription>
          </DialogHeader>
            <form action={onCheckout} method="POST">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                onChange = {(event)=> setPhone(event.target.value)}
                placeholder="Enter phone number"
                className="col-span-3"
              />
            </div>
            
          </div>
            <Button type="submit"
            role="link" className="w-full rounded-full bg-gradient-to-r from-cyan-700 to-[#007822] text-white bg-cover">
              Confirm</Button>
              </form>
        </DialogContent>
      </Dialog>
    )
  }
  


  return (
      <section>
 <DialogDemo />
      </section>
    
  );
};

export default Checkout;