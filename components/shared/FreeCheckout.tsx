"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

import { useToast } from "@/components/ui/use-toast";
import { createTransaction } from "@/lib/actions/transaction.action";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "../ui/button";

const FreeCheckout = ({
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
    const transaction = {
      plan,
      amount,
      credits,
      buyerId,
    };
  
    await createTransaction(transaction);

  };


  function DialogDemo() {
    return (
      <Dialog>
        <DialogTrigger asChild>
<form action={onCheckout} method="POST">
      <section>
      <Button variant="outline" 
          type="submit"
          role="link"
          className="w-full rounded-full bg-gradient-to-r from-cyan-700 to-[#007822] 
          text-white bg-cover">Free Consumable</Button>
      </section>
    </form>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
          <DialogTitle>Bought {credits} credits worth KSH {amount}</DialogTitle>
            <DialogDescription>Success!!</DialogDescription>
          </DialogHeader>
          
        </DialogContent>
      </Dialog>
    )
  }

  return (
        <DialogDemo/>
  );
};


export default FreeCheckout;