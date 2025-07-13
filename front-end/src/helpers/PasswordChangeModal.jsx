import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import BaseForm from "../components/ui/Form/BaseForm";
import InputField from "../components/ui/Form/InputField";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updatePassword } from "../api/User";
import { useMutation } from "@tanstack/react-query";

export default function PasswordChangeModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changePasswordMutation = useMutation({
    mutationFn: ({ userData }) => updatePassword(userData),
    onSuccess: () => {
      toast.success("Changed password successfully!");
      setIsModalOpen(false);
    },
    onError: (error) => {
      const message = error?.response?.data.error || "Change password failed.";
      toast.error(message);
    },
  });

  const changePassword = (values) => {
    const userData = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };
    changePasswordMutation.mutate({ userData });
  };

  const passwordSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/\d/, "Must contain at least one number")
      .matches(/[\W_]/, "Must contain at least one special character")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-blue-600 dark:text-blue-400 font-semibold text-sm mt-2 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-blue-100 dark:hover:bg-blue-900"
      >
        Change Password
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/70 z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-sm shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="cursor-pointer absolute top-2 right-2 text-gray-500 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              <AiOutlineClose className="h-6 w-6" />
            </button>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Change Password
            </h3>

            <BaseForm
              initialValues={{
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={passwordSchema}
              onSubmit={changePassword}
            >
              <InputField
                label="Current Password"
                name="currentPassword"
                type="password"
              />
              <InputField
                label="New Password"
                name="newPassword"
                type="password"
              />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />

              <div className="flex justify-between items-center mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white py-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-400 dark:hover:bg-gray-500 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-1/2 bg-[#009c85] text-white py-2 rounded-md ml-2 transition duration-300 ease-in-out hover:bg-[#007c6b] cursor-pointer"
                  disabled={changePasswordMutation.isPending}
                >
                  {changePasswordMutation.isPending ? "Changing..." : "Change"}
                </button>
              </div>
            </BaseForm>
          </div>
        </div>
      )}
    </div>
  );
}
