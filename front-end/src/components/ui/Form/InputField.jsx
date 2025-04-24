import { useState } from "react";
import { useField } from "formik";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function InputField({ label, type = "text", ...props }) {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="block mb-1 font-medium text-sm text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          {...field}
          {...props}
          disabled={props.disabled}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={`w-full px-4 py-2 rounded border pr-10 ${
            meta.touched && meta.error
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500
          ${
            props.disabled
              ? "opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-700"
              : ""
          }
          `}
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 focus:outline-none cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>

      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs mt-1">{meta.error}</p>
      )}
    </div>
  );
}
