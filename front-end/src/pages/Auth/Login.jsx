import * as Yup from "yup";
import BaseForm from "../../components/ui/Form/BaseForm";
import InputField from "../../components/ui/Form/InputField";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/User";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";
import { Link } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function Login() {
  const { login: loginToContext } = useAuth();
  const { setLoading } = useUI();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      loginToContext(data.token, data.user);
    },
    onError: (error) => {
      const message = error?.response?.data || "Login failed.";
      setTimeout(() => {
        toast.error(message);
        setLoading(false);
      }, 1500);
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    mutation.mutate(values);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Login
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Enter your credentials to sign in.
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
          <InputField
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
          />

          <button
            type="submit"
            className="w-full py-2 bg-[#009c85] text-white rounded-md hover:bg-[#007e6d] transition cursor-pointer"
          >
            {mutation.isPending ? "Logging in..." : "Login"}
          </button>
        </BaseForm>

        {/* Forgot password link */}
        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-[#009c85] hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}
