"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";

import { usePayment } from "@/src/hooks/auth.hook";
import { useUser } from "@/src/context/UserProvider";

const SubscriptionPage = () => {
  // Define subscription plans
  const subscriptionPlans = [
    {
      id: 1,
      name: "Monthly Plan",
      price: 20,
      benefits: [
        "Access to all features",
        "24/7 customer support",
        "Monthly updates",
      ],
    },
    {
      id: 2,
      name: "Yearly Plan",
      price: 200,
      benefits: [
        "Access to all features",
        "Priority support",
        "Yearly updates",
      ],
    },
    {
      id: 3,
      name: "Lifetime Plan",
      price: 1000,
      benefits: ["Lifetime access", "Exclusive content", "One-time payment"],
    },
  ];
  const { user } = useUser();
  const userId = user?._id;
  const { mutate: handlePayment } = usePayment();
  const onSubmit = async (plan: { price: number }) => {
    try {
      const currentPageLink = "http://localhost:3000";
      const paymentData = {
        subscriptionPrice: plan.price,
        currentPageLink: currentPageLink,
      };
      userId && handlePayment({ data: paymentData, userId });
    } catch (error) {
      toast.error("Failed to make Payment: ");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-default-100 p-6">
      <h1 className="text-3xl text-center font-bold mb-8">
        Choose Your Subscription Plan
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-default-50 shadow-md rounded-lg p-6 transition-transform transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-center mb-2">
              {plan.name}
            </h2>
            <p className="text-2xl text-center font-bold text-blue-600 mb-4">
              ${plan.price}
            </p>
            <h3 className="font-semibold mb-2">Benefits:</h3>
            <ul className="list-disc list-inside mb-4">
              {plan.benefits.map((benefit, index) => (
                <li key={index} className="text-default-600">
                  {benefit}
                </li>
              ))}
            </ul>
            <Button
              className="w-full mt-4"
              color="primary"
              onClick={() => onSubmit({ price: plan.price })}
            >
              Subscribe Now
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
