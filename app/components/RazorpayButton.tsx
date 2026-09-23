'use client';

import React, { useEffect, useRef } from 'react';

interface RazorpayButtonProps {
  buttonId?: string;
}

export default function RazorpayButton({ buttonId = 'pl_TfNHgCIyksi0PZ' }: RazorpayButtonProps) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current && !formRef.current.querySelector('script')) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
      script.setAttribute('data-payment_button_id', buttonId);
      script.async = true;
      formRef.current.appendChild(script);
    }
  }, [buttonId]);

  return (
    <div className="w-full flex flex-col items-center justify-center py-2">
      <form
        ref={formRef}
        action="/api/verify-and-download"
        method="POST"
        className="flex items-center justify-center min-h-[50px] w-full"
      >
        {/* Razorpay script dynamically injects button here */}
      </form>
    </div>
  );
}
