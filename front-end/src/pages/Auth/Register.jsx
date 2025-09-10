import * as Yup from "yup";
import BaseForm from "../../components/ui/Form/BaseForm";
import InputField from "../../components/ui/Form/InputField";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/User";
import { useUI } from "../../context/UIContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/\d/, "Must contain at least one number")
    .matches(/[\W_]/, "Must contain at least one special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function Register() {
  const navigate = useNavigate();
  const { setLoading } = useUI();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      setTimeout(() => {
        navigate("/login");
        setLoading(false);
        toast.success("User registered successfully!");
        toast.info("Please check your mail to verify.");
      }, 1500);
    },
    onError: (error) => {
      const message = error?.response?.data?.error || "Registration failed.";
      setTimeout(() => {
        toast.error(message);
        setLoading(false);
      }, 1500);
    },
  });

  const handleSubmit = (values) => {
    const { name, email, password } = values;
    setLoading(true);
    mutation.mutate({ name, email, password });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Create your account
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Join us in a minute — just fill in your details below.
        </p>
        <BaseForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <InputField name="name" label="Name" placeholder="John Doe" />
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
          <InputField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
          />
          <button
            type="submit"
            className="w-full py-2 bg-[#009c85] text-white rounded-md hover:bg-[#007e6d] transition cursor-pointer"
          >
            {mutation.isPending ? "Registering..." : "Register"}
          </button>
        </BaseForm>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-sm text-[#009c85] hover:underline"
            >
              Log in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
