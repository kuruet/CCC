import { useState, useEffect } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    // ✅ NEW FIELDS
    instagramHandle: '',
    age: '',
    occupation: '',
    artistBackground: '',
    whyWorkshop: '',
    selectedSlot: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  // ✅ NEW: Seat availability state
  const [seatData, setSeatData] = useState({
    slot1: { total: 30, booked: 0, remaining: 30 },
    slot2: { total: 30, booked: 0, remaining: 30 }
  });
  const [isWorkshopFull, setIsWorkshopFull] = useState(false);

  // ✅ NEW: Notify Me modal state
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notifyData, setNotifyData] = useState({
    name: '',
    email: '',
    mobile: ''
  });
  const [isNotifying, setIsNotifying] = useState(false);

  const [successModal, setSuccessModal] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // ✅ NEW: Fetch seat availability on mount
  useEffect(() => {
    fetchSeatAvailability();
  }, []);

  // ✅ NEW: Fetch seat data from backend
  const fetchSeatAvailability = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/public/seat-stats`);

      const data = await response.json();

      console.log("Seat API data:", data);

      
     if (data.success) {
  const normalizedSeats = {
    slot1: {
      total: 30,
      booked: data.slots.SLOT_1.filled,
      remaining: data.slots.SLOT_1.remaining,
    },
    slot2: {
      total: 30,
      booked: data.slots.SLOT_2.filled,
      remaining: data.slots.SLOT_2.remaining,
    },
  };

  setSeatData(normalizedSeats);

  const allFull =
    normalizedSeats.slot1.remaining === 0 &&
    normalizedSeats.slot2.remaining === 0;

  setIsWorkshopFull(allFull);
}

    } catch (error) {
      console.error('Error fetching seat data:', error);
    }
  };

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

    // ✅ NEW: Validate new required fields
    if (!formData.age.trim()) {
      return "Age is required";
    }

    if (!/^\d+$/.test(formData.age) || parseInt(formData.age) < 1 || parseInt(formData.age) > 120) {
      return "Please enter a valid age";
    }

    if (!formData.occupation) {
      return "Occupation is required";
    }

    if (!formData.artistBackground) {
      return "Please select your artist background";
    }

    if (!formData.whyWorkshop.trim()) {
      return "Please tell us why this workshop is suitable for you";
    }

    if (!formData.selectedSlot) {
      return "Please select a workshop slot";
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
            slot: formData.selectedSlot,
            // ✅ NEW: Send additional fields
            // instagramHandle: formData.instagramHandle,
            // age: formData.age,
            // occupation: formData.occupation,
            // artistBackground: formData.artistBackground,
            // whyWorkshop: formData.whyWorkshop,
            // selectedSlot: formData.selectedSlot
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
                // workshopId: "6975fb4c0ae1a8e3014f4e87",
              }),
            });

            const verifyData = await verifyRes.json();

            // 🔑 RESET STATES ONCE
            setIsProcessing(false);
            setIsPaying(false);

            if (verifyData.success) {
                await fetchSeatAvailability();
              setSuccessModal({
                open: true,
                type: "success",
                message: "Payment received successfully. Your registration will be confirmed shortly. Please check your email.",
              });
            } else {
              setSuccessModal({
                open: true,
                type: "error",
                message: verifyData.message || "Payment verification failed.",
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

  // ✅ NEW: Handle Notify Me submission
  const handleNotifyMe = async () => {
    if (!notifyData.name.trim() || !notifyData.email.trim() || !notifyData.mobile.trim()) {
      alert('Please fill all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(notifyData.email)) {
      alert('Please enter a valid email');
      return;
    }

    if (!/^\d{10,15}$/.test(notifyData.mobile)) {
      alert('Mobile number must be 10–15 digits');
      return;
    }

    setIsNotifying(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notifyData)
      });

      const data = await response.json();

      setIsNotifying(false);

      if (data.success) {
        setShowNotifyModal(false);
        setSuccessModal({
          open: true,
          type: "success",
          message: "You will be notified whenever the next workshop is announced.",
        });
        setNotifyData({ name: '', email: '', mobile: '' });
      } else {
        alert(data.message || 'Failed to save notification request');
      }
    } catch (error) {
      console.error('Notify error:', error);
      setIsNotifying(false);
      alert('Something went wrong. Please try again.');
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
                    8 hours of hands-on learning with real-time feedback
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
                    Learn industry secrets from 10+ years of experience
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
                  <div className="text-2xl sm:text-3xl font-bold text-[#8A733E]">8 Hours</div>
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
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm sm:text-base font-semibold text-[#8A733E]">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className={`w-full px-4 py-3 sm:py-3.5 rounded-lg border-2 bg-[#FFF5DF] text-[#8A733E] placeholder-[#8A733E]/40 transition-all duration-300 ${
                      errors.fullName
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

                {/* Email */}
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

                {/* Mobile */}
                <div className="space-y-2">
                  <label htmlFor="mobile" className="block text-sm sm:text-base font-semibold text-[#8A733E]">
                    Mobile Number
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleChange('mobile', e.target.value)}
                    className={`w-full px-4 py-3 sm:py-3.5 rounded-lg border-2 bg-[#FFF5DF] text-[#8A733E] placeholder-[#8A733E]/40 transition-all duration-300 ${
                      errors.mobile
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

                {/* ✅ NEW: Instagram Handle (Optional) */}
                <div className="space-y-2">
                  <label htmlFor="instagramHandle" className="block text-sm sm:text-base font-semibold text-[#8A733E]">
                    Instagram Handle <span className="text-[#8A733E]/50 font-normal">(optional)</span>
                  </label>
                  <input
                    id="instagramHandle"
                    type="text"
                    value={formData.instagramHandle}
                    onChange={(e) => handleChange('instagramHandle', e.target.value)}
                    className="w-full px-4 py-3 sm:py-3.5 rounded-lg border-2 bg-[#FFF5DF] text-[#8A733E] placeholder-[#8A733E]/40 transition-all duration-300 border-[#8A733E]/20 focus:border-[#8A733E]/60 focus:outline-none focus:ring-2 focus:ring-[#8A733E]/20"
                    placeholder="@yourhandle"
                  />
                </div>

                {/* ✅ NEW: Age */}
                <div className="space-y-2">
                  <label htmlFor="age" className="block text-sm sm:text-base font-semibold text-[#8A733E]">
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    className={`w-full px-4 py-3 sm:py-3.5 rounded-lg border-2 bg-[#FFF5DF] text-[#8A733E] placeholder-[#8A733E]/40 transition-all duration-300 ${
                      errors.age
                        ? 'border-[#8A733E]/60 focus:border-[#8A733E]'
                        : 'border-[#8A733E]/20 focus:border-[#8A733E]/60'
                    } focus:outline-none focus:ring-2 focus:ring-[#8A733E]/20`}
                    placeholder="Enter your age"
                    required
                  />
                  {errors.age && (
                    <p className="text-sm text-[#8A733E]/70 mt-1">{errors.age}</p>
                  )}
                </div>

                {/* ✅ NEW: Occupation */}
                <div className="space-y-2">
                  <label htmlFor="occupation" className="block text-sm sm:text-base font-semibold text-[#8A733E]">
                    Occupation
                  </label>
                  <select
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => handleChange('occupation', e.target.value)}
                    className={`w-full px-4 py-3 sm:py-3.5 rounded-lg border-2 bg-[#FFF5DF] text-[#8A733E] transition-all duration-300 ${
                      errors.occupation
                        ? 'border-[#8A733E]/60 focus:border-[#8A733E]'
                        : 'border-[#8A733E]/20 focus:border-[#8A733E]/60'
                    } focus:outline-none focus:ring-2 focus:ring-[#8A733E]/20`}
                    required
                  >
                    <option value="" className="text-[#8A733E]/40">Select your occupation</option>
                    <option value="Student">Student</option>
                    <option value="Working Professional">Working Professional</option>
                    <option value="Artist">Artist</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.occupation && (
                    <p className="text-sm text-[#8A733E]/70 mt-1">{errors.occupation}</p>
                  )}
                </div>

                {/* ✅ NEW: Artist Background */}
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-semibold text-[#8A733E]">
                    Artist Background
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="artistBackground"
                        value="Yes"
                        checked={formData.artistBackground === 'Yes'}
                        onChange={(e) => handleChange('artistBackground', e.target.value)}
                        className="w-4 h-4 text-[#8A733E] border-[#8A733E]/40 focus:ring-[#8A733E]/30"
                      />
                      <span className="ml-2 text-sm sm:text-base text-[#8A733E]">Yes</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="artistBackground"
                        value="No"
                        checked={formData.artistBackground === 'No'}
                        onChange={(e) => handleChange('artistBackground', e.target.value)}
                        className="w-4 h-4 text-[#8A733E] border-[#8A733E]/40 focus:ring-[#8A733E]/30"
                      />
                      <span className="ml-2 text-sm sm:text-base text-[#8A733E]">No</span>
                    </label>
                  </div>
                  {errors.artistBackground && (
                    <p className="text-sm text-[#8A733E]/70 mt-1">{errors.artistBackground}</p>
                  )}
                </div>

                {/* ✅ NEW: Why Workshop */}
                <div className="space-y-2">
                  <label htmlFor="whyWorkshop" className="block text-sm sm:text-base font-semibold text-[#8A733E]">
                    Why do you think this workshop is suitable for you?
                  </label>
                  <textarea
                    id="whyWorkshop"
                    value={formData.whyWorkshop}
                    onChange={(e) => handleChange('whyWorkshop', e.target.value)}
                    rows="4"
                    className={`w-full px-4 py-3 sm:py-3.5 rounded-lg border-2 bg-[#FFF5DF] text-[#8A733E] placeholder-[#8A733E]/40 transition-all duration-300 resize-none ${
                      errors.whyWorkshop
                        ? 'border-[#8A733E]/60 focus:border-[#8A733E]'
                        : 'border-[#8A733E]/20 focus:border-[#8A733E]/60'
                    } focus:outline-none focus:ring-2 focus:ring-[#8A733E]/20`}
                    placeholder="Tell us why this workshop would benefit you..."
                    required
                  />
                  {errors.whyWorkshop && (
                    <p className="text-sm text-[#8A733E]/70 mt-1">{errors.whyWorkshop}</p>
                  )}
                </div>

                {/* ✅ NEW: Slot Selection */}
                <div className="space-y-3">
                  <label className="block text-sm sm:text-base font-semibold text-[#8A733E]">
                    Select Workshop Slot
                  </label>

                  {/* Slot 1 */}
                  <div
                    onClick={() => seatData.slot1.remaining > 0 && handleChange('selectedSlot', 'SLOT_1')}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      seatData.slot1.remaining === 0
                        ? 'border-[#8A733E]/20 bg-[#8A733E]/5 cursor-not-allowed opacity-60'
                        : formData.selectedSlot === 'SLOT_1'
                        ? 'border-[#8A733E] bg-[#8A733E]/10'
                        : 'border-[#8A733E]/20 hover:border-[#8A733E]/40'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="text-base sm:text-lg font-semibold text-[#8A733E] mb-1">
                          Slot 1
                        </div>
                        <div className="text-sm text-[#8A733E]/70">
                          Saturday: 12 PM – 4 PM<br />
                          Sunday: 12 PM – 4 PM
                        </div>
                      </div>
                      <div className="text-right">
                        {seatData.slot1.remaining === 0 ? (
                          <span className="inline-block px-3 py-1 bg-[#8A733E]/20 text-[#8A733E] text-xs font-semibold rounded-full">
                            Batch Full
                          </span>
                        ) : (
                          <div className="text-xs text-[#8A733E]/60">
                            <div>{seatData.slot1.remaining} seats left</div>
                            <div className="text-[#8A733E]/40 mt-0.5">
                              {seatData.slot1.booked}/{seatData.slot1.total} booked
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Slot 2 */}
                  <div
                    onClick={() => seatData.slot2.remaining > 0 && handleChange('selectedSlot', 'SLOT_2')}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      seatData.slot2.remaining === 0
                        ? 'border-[#8A733E]/20 bg-[#8A733E]/5 cursor-not-allowed opacity-60'
                        : formData.selectedSlot === 'SLOT_2'
                        ? 'border-[#8A733E] bg-[#8A733E]/10'
                        : 'border-[#8A733E]/20 hover:border-[#8A733E]/40'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="text-base sm:text-lg font-semibold text-[#8A733E] mb-1">
                          Slot 2
                        </div>
                        <div className="text-sm text-[#8A733E]/70">
                          Saturday: 6 PM – 10 PM<br />
                          Sunday: 6 PM – 10 PM
                        </div>
                      </div>
                      <div className="text-right">
                        {seatData.slot2.remaining === 0 ? (
                          <span className="inline-block px-3 py-1 bg-[#8A733E]/20 text-[#8A733E] text-xs font-semibold rounded-full">
                            Batch Full
                          </span>
                        ) : (
                          <div className="text-xs text-[#8A733E]/60">
                            <div>{seatData.slot2.remaining} seats left</div>
                            <div className="text-[#8A733E]/40 mt-0.5">
                              {seatData.slot2.booked}/{seatData.slot2.total} booked
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {errors.selectedSlot && (
                    <p className="text-sm text-[#8A733E]/70 mt-1">{errors.selectedSlot}</p>
                  )}
                </div>

                {formError && (
                  <p className="text-red-600 text-sm mt-2">{formError}</p>
                )}

                {/* ✅ NEW: Conditional Button - Workshop Full or Pay */}
                {isWorkshopFull ? (
                  <div className="space-y-3">
                    <div className="text-center py-3 px-4 bg-[#8A733E]/10 rounded-lg border border-[#8A733E]/20">
                      <p className="text-sm sm:text-base font-semibold text-[#8A733E]">
                        Workshop Full
                      </p>
                    </div>
                    <button
                      onClick={() => setShowNotifyModal(true)}
                      className="w-full py-4 px-6 font-bold text-[#FFF5DF] bg-[#8A733E] rounded-lg hover:bg-[#8A733E]/90 transition-all duration-300"
                    >
                      Notify Me
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handlePayment}
                    disabled={isPaying}
                    className="w-full py-4 px-6 font-bold text-[#FFF5DF] bg-[#8A733E] rounded-lg flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#8A733E]/90 transition-all duration-300"
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
                )}

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

      {/* Success/Error Modal */}
      {successModal.open && (
        <div
          className="fixed inset-0 bg-[#8A733E]/60 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
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
              {successModal.type === "success" ? (
                <>
                  <div className="text-5xl sm:text-6xl">🎉</div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#8A733E]">
                    {successModal.message.includes('notified') ? 'Notification Registered!' : 'Payment Successful!'}
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
                className="mt-6 px-8 py-3 text-base font-semibold text-[#FFF5DF] bg-[#8A733E] rounded-lg hover:bg-[#8A733E]/90 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ NEW: Notify Me Modal */}
      {showNotifyModal && (
        <div
          className="fixed inset-0 bg-[#8A733E]/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowNotifyModal(false)}
        >
          <div
            className="relative w-full max-w-md bg-[#FFF5DF] rounded-2xl shadow-2xl p-8 sm:p-10 transform animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowNotifyModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[#8A733E] hover:bg-[#8A733E]/10 focus:outline-none focus:ring-2 focus:ring-[#8A733E]/30 transition-all duration-200"
              aria-label="Close modal"
            >
              <span className="text-2xl leading-none">×</span>
            </button>

            <div className="space-y-5">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#8A733E] mb-2">
                  Get Notified
                </h2>
                <p className="text-sm sm:text-base text-[#8A733E]/70">
                  We'll let you know when the next workshop is announced
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#8A733E]">Name</label>
                  <input
                    type="text"
                    value={notifyData.name}
                    onChange={(e) => setNotifyData({ ...notifyData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#8A733E]/20 bg-[#FFF5DF] text-[#8A733E] placeholder-[#8A733E]/40 focus:border-[#8A733E]/60 focus:outline-none focus:ring-2 focus:ring-[#8A733E]/20"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#8A733E]">Email</label>
                  <input
                    type="email"
                    value={notifyData.email}
                    onChange={(e) => setNotifyData({ ...notifyData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#8A733E]/20 bg-[#FFF5DF] text-[#8A733E] placeholder-[#8A733E]/40 focus:border-[#8A733E]/60 focus:outline-none focus:ring-2 focus:ring-[#8A733E]/20"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#8A733E]">Mobile Number</label>
                  <input
                    type="tel"
                    value={notifyData.mobile}
                    onChange={(e) => setNotifyData({ ...notifyData, mobile: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#8A733E]/20 bg-[#FFF5DF] text-[#8A733E] placeholder-[#8A733E]/40 focus:border-[#8A733E]/60 focus:outline-none focus:ring-2 focus:ring-[#8A733E]/20"
                    placeholder="10 digits"
                  />
                </div>
              </div>

              <button
                onClick={handleNotifyMe}
                disabled={isNotifying}
                className="w-full py-3 px-6 font-bold text-[#FFF5DF] bg-[#8A733E] rounded-lg flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#8A733E]/90 transition-all duration-300"
              >
                {isNotifying ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Notify Me"
                )}
              </button>
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