import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(false);
  const [isPaying, setIsPaying] = useState(false);


  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModal, setSuccessModal] = useState({
  open: false,
  type: "success", // "success" | "error"
  message: "",
});

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const closeModal = () => {
  setSuccessModal({ open: false, message: "" });
};
const handleKeyDown = (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
};




 // ----------------- Form Validation -----------------
const validateForm = () => {
  if (!formData.fullName.trim()) {
    return "Full name is required";
  }

  if (!formData.email.trim()) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return "Please enter a valid email";
  }

  if (!formData.mobile.trim()) {
    return "Mobile number is required";
  }

  if (!/^\d{10,15}$/.test(formData.mobile)) {
    return "Mobile number must be 10–15 digits";
  }

  return null; // ✅ valid
};



  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

const handlePayment = async () => {
  console.log("🚀 handlePayment started");

  // 🔒 Prevent double click
  if (isPaying) return;

  // ✅ Frontend validation
  const validationError = validateForm();
  if (validationError) {
    setFormError(validationError);
    return;
  }

  setFormError(null);
  setIsPaying(true); // 🚀 start loader immediately

  try {
    // 1️⃣ Create order
    console.log("📤 Step 1: Creating order on backend");
    const response = await fetch(
      `${API_BASE_URL}/api/payment/create-order`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.mobile,
        }),
      }
    );

    console.log("📥 Step 1 Response status:", response.status);
    const data = await response.json();
    console.log("📥 Step 1 Response data:", data);

    if (!data.success) {
      setIsPaying(false);
      setSuccessModal({
        open: true,
        type: "error",
        message: data.message || "Unable to create order",
      });
      return;
    }

    const userId = data.user._id;
    console.log("✅ UserId obtained:", userId);

    // 2️⃣ Razorpay options
    const options = {
      key: data.key_id,
      amount: data.amount,
      currency: data.currency,
      name: "Creative Caricature Club",
      description: "Online Caricature Workshop",
      order_id: data.order_id,
      prefill: {
        name: data.user.name,
        email: data.user.email,
        contact: data.user.phone,
      },
      theme: { color: "#8A733E" },

      // 3️⃣ Payment success handler
 handler: async function (response) {
  console.log("🟢 Razorpay handler triggered");

  try {
    setIsProcessing(true);

    const verifyRes = await fetch(`${API_BASE_URL}/api/payment/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        userId,
        workshopId: "6975fb4c0ae1a8e3014f4e87",
      }),
    });

    const verifyData = await verifyRes.json();

    // 🔑 RESET STATES ONCE
    setIsProcessing(false);
    setIsPaying(false);

    if (verifyData.success) {
      setSuccessModal({
        open: true,
        type: "success",
        message: `Payment Successful! You are registered for ${verifyData.workshop.title}`,
      });
    } else {
      setSuccessModal({
        open: true,
        type: "error",
        message: verifyData.message,
      });
    }
  } catch (err) {
    console.error("🔥 Verification error", err);
    setIsProcessing(false);
    setIsPaying(false);
    setSuccessModal({
      open: true,
      type: "error",
      message: "Server error during payment verification.",
    });
  }
},


      // 4️⃣ User closes Razorpay
      modal: {
        ondismiss: function () {
          console.log("⚠️ Razorpay closed by user");
          setIsPaying(false);
        },
      },
    };

    console.log("🧾 Opening Razorpay checkout");
    new window.Razorpay(options).open();
  } catch (error) {
    console.error("🔥 Order creation error", error);
    setIsPaying(false);
    setSuccessModal({
      open: true,
      type: "error",
      message: "Something went wrong. Please try again.",
    });
  }
};






  return (
    <div className="min-h-screen w-full bg-[#FFF5DF]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
         
        {/* Left Side - Workshop Information */}
        <div className="flex items-center justify-center px-6 sm:px-10 md:px-12 lg:px-16 py-12 sm:py-16 lg:py-20">
          <div className="max-w-xl space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-5">
              <div className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#8A733E]/60">
                Live Workshop
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#8A733E] leading-tight">
                Master Live Caricature Art
              </h1>
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-[#8A733E]/80 leading-relaxed">
              Join India's leading caricature artists for an intensive 6-hour workshop designed to transform your artistic skills. Learn professional techniques, speed sketching, and commercial workflow practices that will prepare you for real-world opportunities.
            </p>

            <div className="space-y-4 sm:space-y-5 pt-4">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#8A733E]/10 flex items-center justify-center mt-1">
                  <span className="text-[#8A733E] text-sm sm:text-base font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#8A733E]">
                    Live Interactive Session
                  </h3>
                  <p className="text-sm sm:text-base text-[#8A733E]/70">
                    2 hours of hands-on learning with real-time feedback
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#8A733E]/10 flex items-center justify-center mt-1">
                  <span className="text-[#8A733E] text-sm sm:text-base font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#8A733E]">
                    Professional Techniques
                  </h3>
                  <p className="text-sm sm:text-base text-[#8A733E]/70">
                    Learn industry secrets from 15+ years of experience
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#8A733E]/10 flex items-center justify-center mt-1">
                  <span className="text-[#8A733E] text-sm sm:text-base font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#8A733E]">
                    Certificate of Completion
                  </h3>
                  <p className="text-sm sm:text-base text-[#8A733E]/70">
                    Official recognition from Creative Caricature Club
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#8A733E]/10 flex items-center justify-center mt-1">
                  <span className="text-[#8A733E] text-sm sm:text-base font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#8A733E]">
                    Workshop Recording Access
                  </h3>
                  <p className="text-sm sm:text-base text-[#8A733E]/70">
                    Review and practice with full session recording
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 sm:pt-8 border-t border-[#8A733E]/20">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#8A733E]">2 Hours</div>
                  <div className="text-sm sm:text-base text-[#8A733E]/60 mt-1">Duration</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#8A733E]">₹1,999</div>
                  <div className="text-sm sm:text-base text-[#8A733E]/60 mt-1">Investment</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="flex items-center justify-center px-6 sm:px-10 md:px-12 lg:px-16 py-12 sm:py-16 lg:py-20 bg-[#8A733E]/5">
          <div className="w-full max-w-md">
            
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8A733E] mb-2 sm:mb-3">
                Secure Your Spot
              </h2>
              <p className="text-sm sm:text-base text-[#8A733E]/70">
                Limited seats available
              </p>
            </div>

            <div className="bg-[#FFF5DF] rounded-2xl shadow-lg p-6 sm:p-8 border border-[#8A733E]/10">
              <div className="space-y-5 sm:space-y-6">
                
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm sm:text-base font-semibold text-[#8A733E]">
                    Full Name
                  </label>
                  <input
  id="name"
  type="text"
 value={formData.fullName}
  onChange={(e) => handleChange('fullName', e.target.value)}
  className={`w-full px-4 py-3 sm:py-3.5 rounded-lg border-2 bg-[#FFF5DF] text-[#8A733E] placeholder-[#8A733E]/40 transition-all duration-300 ${
    errors.name
      ? 'border-[#8A733E]/60 focus:border-[#8A733E]'
      : 'border-[#8A733E]/20 focus:border-[#8A733E]/60'
  } focus:outline-none focus:ring-2 focus:ring-[#8A733E]/20`}
  placeholder="Enter your full name"
  required
/>

                  {errors.fullName && (
                    <p className="text-sm text-[#8A733E]/70 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm sm:text-base font-semibold text-[#8A733E]">
                    Email Address
                  </label>
                  <input
  id="email"
  type="email"
 value={formData.email}
  onChange={(e) => handleChange('email', e.target.value)}
  className={`w-full px-4 py-3 sm:py-3.5 rounded-lg border-2 bg-[#FFF5DF] text-[#8A733E] placeholder-[#8A733E]/40 transition-all duration-300 ${
    errors.email
      ? 'border-[#8A733E]/60 focus:border-[#8A733E]'
      : 'border-[#8A733E]/20 focus:border-[#8A733E]/60'
  } focus:outline-none focus:ring-2 focus:ring-[#8A733E]/20`}
  placeholder="your@email.com"
  required
/>

                  {errors.email && (
                    <p className="text-sm text-[#8A733E]/70 mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="mobile" className="block text-sm sm:text-base font-semibold text-[#8A733E]">
                    Mobile Number
                  </label>
                <input
  id="phone"
  type="tel"
   value={formData.mobile}
  onChange={(e) => handleChange('mobile', e.target.value)}
  className={`w-full px-4 py-3 sm:py-3.5 rounded-lg border-2 bg-[#FFF5DF] text-[#8A733E] placeholder-[#8A733E]/40 transition-all duration-300 ${
    errors.phone
      ? 'border-[#8A733E]/60 focus:border-[#8A733E]'
      : 'border-[#8A733E]/20 focus:border-[#8A733E]/60'
  } focus:outline-none focus:ring-2 focus:ring-[#8A733E]/20`}
  placeholder="10 digits"
  required
/>

                  {errors.mobile && (
                    <p className="text-sm text-[#8A733E]/70 mt-1">{errors.mobile}</p>
                  )}
                </div>
                {formError && (
  <p className="text-red-600 text-sm mt-2">{formError}</p>
)}


              <button
  onClick={handlePayment}
  disabled={isPaying}
  className="w-full py-4 px-6 font-bold text-[#FFF5DF] bg-[#8A733E] rounded-lg flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
>
  {isPaying ? (
    <>
      <span className="w-5 h-5 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
      <span>Processing...</span>
    </>
  ) : (
    "Pay ₹1999"
  )}
</button>



                <p className="text-xs sm:text-sm text-center text-[#8A733E]/60 pt-2">
                  Secure payment • Instant confirmation
                </p>
              </div>
            </div>

            <p className="text-center text-xs sm:text-sm text-[#8A733E]/50 mt-6">
              By registering, you agree to our terms and conditions
            </p>
          </div>
        </div>
      </div>

      {/* {successModal && (
        <div
          className="fixed inset-0 bg-[#8A733E]/60 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div
            className="relative w-full max-w-md bg-[#FFF5DF] rounded-2xl shadow-2xl p-8 sm:p-10 transform animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[#8A733E] hover:bg-[#8A733E]/10 focus:outline-none focus:ring-2 focus:ring-[#8A733E]/30 transition-all duration-200"
              aria-label="Close modal"
            >
              <span className="text-2xl leading-none">×</span>
            </button>

            <div className="text-center space-y-4 sm:space-y-5">
              <div className="text-5xl sm:text-6xl">🎉</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#8A733E]">
                Payment Successful!
              </h2>
              <p className="text-base sm:text-lg text-[#8A733E]/80 leading-relaxed">
                You're registered for <span className="font-semibold">Master Live Caricature Art</span>. Check your email for confirmation.
              </p>
              <button
                onClick={closeModal}
                className="mt-6 px-8 py-3 text-base font-semibold text-[#FFF5DF] bg-[#8A733E] rounded-lg hover:bg-[#8A733E]/90 focus:outline-none focus:ring-4 focus:ring-[#8A733E]/30 transform hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}

     {successModal.open && (
  <div
    className="fixed inset-0 bg-[#8A733E]/60 flex items-center justify-center z-50 p-4"
    onClick={closeModal}       // click outside closes
    onKeyDown={handleKeyDown}  // Esc key closes
    tabIndex={0}               // needed to make div focusable for onKeyDown
  >
    <div
      className="relative w-full max-w-md bg-[#FFF5DF] rounded-2xl shadow-2xl p-8 sm:p-10 transform animate-fadeIn"
      onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
    >
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[#8A733E] hover:bg-[#8A733E]/10 focus:outline-none focus:ring-2 focus:ring-[#8A733E]/30 transition-all duration-200"
        aria-label="Close modal"
      >
        <span className="text-2xl leading-none">×</span>
      </button>

      <div className="text-center space-y-4 sm:space-y-5">
        <div className="text-center space-y-4 sm:space-y-5">

  {successModal.type === "success" ? (
    <>
      <div className="text-5xl sm:text-6xl">🎉</div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[#8A733E]">
        Payment Successful!
      </h2>
    </>
  ) : (
    <>
      <div className="text-5xl sm:text-6xl">⚠️</div>
      <h2 className="text-2xl sm:text-3xl font-bold text-red-600">
        Registration Failed
      </h2>
    </>
  )}

  <p className="text-base sm:text-lg text-[#8A733E]/80 leading-relaxed">
    {successModal.message}
  </p>

  <button
    onClick={closeModal}
    className="mt-6 px-8 py-3 text-base font-semibold text-[#FFF5DF] bg-[#8A733E] rounded-lg"
  >
    Close
  </button>
</div>

         
      </div>
    </div>
  </div>
)}


      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}