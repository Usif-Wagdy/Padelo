import * as Yup from "yup";
import BaseForm from "../../components/ui/Form/BaseForm";
import InputField from "../../components/ui/Form/InputField";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../api/User";
import { toast } from "react-toastify";
import { useUI } from "../../context/UIContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const initialValues = { password: "", confirmPassword: "" };

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

export default function ResetPassword() {
  const { setLoading } = useUI();
  const navigate = useNavigate();

  // ✅ Extract the string token from route params
  const { token: tokenParam } = useParams(); // route must be /reset-password/:token
  const token = typeof tokenParam === "string" ? tokenParam : "";

  useEffect(() => {
    if (!token) toast.error("Invalid or missing reset token.");
  }, [token]);

  const mutation = useMutation({
    // your API: resetPassword(userData, token)
    mutationFn: ({ password }) => resetPassword({ password }, token),
    onSuccess: () => {
      toast.success("Password has been reset successfully.");
      setLoading(false);
      navigate("/login");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Reset failed.";
      setTimeout(() => {
        toast.error(message);
        setLoading(false);
      }, 500);
    },
  });

  const handleSubmit = (values) => {
    if (!token) {
      toast.error("Missing reset token.");
      return;
    }
    setLoading(true);
    mutation.mutate({ password: values.password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Reset Password
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Enter a new password and confirm it.
        </p>

        <BaseForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <InputField
            name="password"
            label="New Password"
            type="password"
            placeholder="••••••••"
          />
          <InputField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
          />

          <button
            type="submit"
            disabled={!token || mutation.isPending}
            className={`w-full py-2 rounded-md transition cursor-pointer text-white ${
              !token ? "bg-gray-400" : "bg-[#009c85] hover:bg-[#007e6d]"
            }`}
          >
            {mutation.isPending ? "Resetting..." : "Reset Password"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full mt-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
          >
            Back to Home
          </button>
        </BaseForm>
      </div>
    </div>
  );
}
