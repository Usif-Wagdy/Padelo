import { useState } from "react";
import { useField } from "formik";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function TextInput({ label, type = "text", ...props }) {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

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
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={`w-full px-4 py-2 pr-10 rounded border ${
            meta.touched && meta.error
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500`}
        />
        {isPassword && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300 cursor-pointer"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        )}
      </div>

      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs mt-1">{meta.error}</p>
      )}
    </div>
  );
}
