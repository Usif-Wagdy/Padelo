import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { verifyEmail, resendVerificationCode } from "../api/User"; // Your API functions
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function VerificationModal({ isOpen, onClose, email }) {
  const [verificationCode, setVerificationCode] = useState("");
  const { setAuthState } = useAuth();

  const verifyMutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      toast.success("Email Verified!");
      setAuthState({ user: { isVerified: true } });
      onClose();
    },
    onError: (error) => {
      const message = error?.response?.data.error || "Verification Failed.";
      toast.error(message);
    },
  });

  const resendMutation = useMutation({
    mutationFn: resendVerificationCode,
    onSuccess: () => {
      toast.success("Code resent successfully!");
    },
    onError: (error) => {
      const message = error?.response?.data.error || "Code Resent Failed.";
      toast.error(message);
    },
  });

  const handleVerify = () => {
    const userData = { email, code: verificationCode };
    verifyMutation.mutate(userData);
  };

  const handleResend = () => {
    const userData = { email };
    resendMutation.mutate(userData);
  };

  return isOpen ? (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/70 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-sm shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-2 right-2 text-gray-500 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
        >
          <AiOutlineClose className="h-6 w-6" />
        </button>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Verify Your Email
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
          Enter the 6-digit verification code sent to {email}.
        </p>

        <input
          type="text"
          maxLength="6"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 text-gray-900 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#009c85] dark:focus:ring-[#00bfae]"
          placeholder="Enter 6-digit code"
        />

        <div className="flex justify-between items-center">
          <button
            onClick={handleVerify}
            disabled={verifyMutation.isPending || verificationCode.length !== 6}
            className={`w-1/2 bg-[#009c85] text-white py-2 rounded-md transition duration-300 ease-in-out hover:bg-[#007c6b] ${
              verifyMutation.isPending || verificationCode.length !== 6
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {verifyMutation.isPending ? "Verifying..." : "Verify"}
          </button>

          <button
            onClick={handleResend}
            disabled={resendMutation.isPending}
            className="w-1/2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white py-2 rounded-md ml-2 transition duration-300 ease-in-out hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            {resendMutation.isPending ? "Resending..." : "Resend Code"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
