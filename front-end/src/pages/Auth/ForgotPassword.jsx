import * as Yup from "yup";
import BaseForm from "../../components/ui/Form/BaseForm";
import InputField from "../../components/ui/Form/InputField";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../api/User"; // expects { email }
import { toast } from "react-toastify";
import { useUI } from "../../context/UIContext";
import { Link, useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function ForgotPassword() {
  const { setLoading } = useUI();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ email }) => forgotPassword({ email }),
    onSuccess: (data) => {
      // Backend returns { message: 'email has been sent successfully' }
      toast.success(
        data?.message || "If an account exists, a reset link was sent."
      );
      setLoading(false);
      // Optional: navigate to login (or keep the user here)
      // navigate("/login");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Failed to send reset email.";
      toast.error(message);
      setLoading(false);
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    mutation.mutate({ email: values.email.trim().toLowerCase() });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Forgot Password
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Enter your email and we'll send you a password reset link <br />
          (valid for 10 minutes).
        </p>

        <BaseForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <InputField
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-2 rounded-md transition cursor-pointer text-white bg-[#009c85] hover:bg-[#007e6d] disabled:opacity-70"
          >
            {mutation.isPending ? "Sending..." : "Send Reset Link"}
          </button>

          {/* Back to Home */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full mt-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
          >
            Back to Home
          </button>

          {/* Back to Login */}
          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-sm text-[#009c85] hover:underline"
            >
              Back to login
            </Link>
          </div>
        </BaseForm>
      </div>
    </div>
  );
}
