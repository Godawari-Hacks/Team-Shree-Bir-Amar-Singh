import { Check, X } from "lucide-react";
import { useNavigate } from "react-router";

export default function BuyPremium() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4">
          Choose the Right Care for You
        </h1>
        <p className="text-gray-400">
          Trusted sexual health support — private, anonymous, and secure.
        </p>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* FREE PLAN */}
        <div className="border border-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-2">Free Plan</h2>
          <p className="text-gray-400 mb-6">
            Learn safely with AI-powered guidance.
          </p>

          <ul className="space-y-4 mb-8">
            <Feature text="Unlimited AI Chat" />
            <Feature text="Preventive Guidance" />
            <Feature text="Main Causes Explained" />
            <Feature text="Evidence-based Information" />
            <Feature text="100% Anonymous" />
            <Feature text="Doctor Chat" disabled />
            <Feature text="Chat History Storage" disabled />
          </ul>

          <button className="w-full py-3 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-900 transition">
            Continue Free
          </button>
        </div>

        {/* PREMIUM PLAN */}
        <div className="border border-green-600 bg-gradient-to-b from-green-600/15 to-transparent rounded-2xl p-8 relative">
          <span className="absolute top-4 right-4 text-xs bg-green-600 px-3 py-1 rounded-full text-black font-semibold">
            BEST VALUE
          </span>

          <h2 className="text-2xl font-semibold mb-2">Premium Plan</h2>
          <p className="text-gray-300 mb-6">
            Talk to real doctors and keep your chats — anonymously.
          </p>

          <ul className="space-y-4 mb-8">
            <Feature text="Access to All Verified Doctors" />
            <Feature text="Unlimited Doctor Chat" />
            <Feature text="Anonymous Chat History Saved" />
            <Feature text="Priority Responses" />
            <Feature text="Everything in Free Plan" />
          </ul>

          <button
            className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 transition font-semibold text-black"
          >
            Buy Premium
          </button>

          <p className="text-xs text-gray-400 mt-4 text-center">
            No real name required • Private & secure
          </p>
        </div>
      </div>
    </div>
  );
}

function Feature({ text, disabled }) {
  return (
    <li className="flex items-center gap-3">
      {disabled ? (
        <X className="w-5 h-5 text-red-500" />
      ) : (
        <Check className="w-5 h-5 text-green-500" />
      )}
      <span className={disabled ? "text-gray-500" : ""}>{text}</span>
    </li>
  );
}
