"use client";
import React, { useEffect, useState } from "react";
import { usePaymentInfo } from "@/src/hooks/auth.hook";
import { useRouter, useSearchParams } from "next/navigation";

const PaymentSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve payment information from the URL
  const transactionId = searchParams.get("transactionId");
  const status = searchParams.get("status");
  const userId = searchParams.get("userId");

  const { mutate: handlePaymentInfo, isSuccess } = usePaymentInfo();
  const [hasCalledMutation, setHasCalledMutation] = useState(false);

  useEffect(() => {
    if (transactionId && status && userId && !hasCalledMutation) {
      setHasCalledMutation(true);
      handlePaymentInfo({ transactionId, status, userId });
    }
  }, [transactionId, status, userId, handlePaymentInfo, hasCalledMutation]);
  if (isSuccess) {
    return <p>success</p>;
  } else
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your payment. Your transaction has been processed
            successfully.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
};

export default PaymentSuccess;
