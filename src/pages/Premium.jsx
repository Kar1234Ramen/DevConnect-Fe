import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Premium = () => {
  const [isUserPremium, setUserPremium] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });

      if (res.data.isPremium) {
        setUserPremium(true);
      }
    } catch (err) {
      console.error("Verify error:", err);
    }
  };

  const buyMembershipHandler = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        {
          membershipType: type,
        },
        {
          withCredentials: true,
        },
      );

      //open the razorpay dialouge box
      const { keyId, amount, currency, notes, orderId } = order.data;

      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits.
        currency: currency,
        name: "DevConnect",
        description: "Connect with developers",
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      //set a error box\
      const message =
        err?.response?.data?.msg || "Something went wrong. Please try again.";

      setError(message);

      setTimeout(() => setError(""), 3000);
    }
  };

  return isUserPremium ? (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-10">
      <div className="card bg-base-300 shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-5xl mb-4">🎉</div>

        <h2 className="text-2xl font-bold mb-2 text-primary">
          You’re a Premium Member
        </h2>

        <p className="text-sm opacity-80 mb-6">
          Enjoy all premium features and connect without limits.
        </p>

        <div className="badge badge-primary mb-4">Active Membership</div>

        <button
          className="btn btn-outline btn-primary w-full"
          onClick={() => navigate("/")}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-10">
      {error && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-10 md:flex-row  w-full max-w-5xl">
        {/* Silver Card */}
        <div className="card bg-base-300 shadow-xl p-6 flex-1 hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-bold text-center mb-4">
            Silver Membership
          </h2>

          <ul className="space-y-2 text-sm opacity-80 mb-6">
            <li>✔ Chat with others</li>
            <li>✔ 50 connection requests/day</li>
            <li>✔ Get verified</li>
            <li>✔ 90 days access</li>
          </ul>

          <button
            onClick={() => buyMembershipHandler("silver")}
            className="btn btn-secondary w-full"
          >
            Buy Now
          </button>
        </div>

        {/* OR Divider */}
        <div className="flex items-center justify-center text-lg font-semibold opacity-50">
          OR
        </div>

        {/* Gold Card */}
        <div className="card bg-base-300 shadow-xl p-6 flex-1 border-2 border-primary hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-bold text-center mb-4 text-primary">
            Gold Membership
          </h2>

          <ul className="space-y-2 text-sm opacity-80 mb-6">
            <li>✔ Chat with others</li>
            <li>✔ 100 connection requests/day</li>
            <li>✔ Get verified</li>
            <li>✔ 180 days access</li>
          </ul>

          <button
            onClick={() => buyMembershipHandler("gold")}
            className="btn btn-primary w-full"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
