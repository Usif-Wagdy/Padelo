import { useState } from "react";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import BaseForm from "../../components/ui/Form/BaseForm";
import InputField from "../../components/ui/Form/InputField";
import { updateUser, updateUserImage } from "../../api/User";
import ImageDropZone from "../../helpers/ImageDropzone";
import ImageCropperModal from "../../helpers/ImageCropperModal";
import PasswordChangeModal from "../../helpers/PasswordChangeModal";

export default function ProfileForm() {
  const { auth, setAuth, setAuthState } = useAuth();
  const user = auth?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const { mutate: updateUserMutation, isPending: isUpdatingUser } = useMutation(
    {
      mutationFn: (values) => updateUser(values),
      onSuccess: (updatedUser) => {
        toast.success("User info updated");
        setAuth((prev) => ({ ...prev, user: updatedUser.user }));
        Cookies.set("userData", JSON.stringify(updatedUser.user), {
          expires: 7,
        });
        setIsEditing(false);
      },
      onError: () => toast.error("Failed to update user"),
    }
  );

  const { mutate: updateImageMutation } = useMutation({
    mutationFn: (file) => updateUserImage(user._id, file),
    onSuccess: (updatedUser) => {
      setAuthState({ user: { image: updatedUser.user.image } });
      Cookies.set("userData", JSON.stringify(updatedUser.user), {
        expires: 7,
      });
      toast.success("Profile image updated");
      setShowCropper(false);
    },
    onError: () => toast.error("Failed to upload image"),
  });

  const handleImageSelected = (file) => {
    setSelectedImage(file);
    setShowCropper(true);
  };

  const handleCrop = (croppedFile) => {
    toast.info("Uploading image..");
    updateImageMutation(croppedFile);
  };

  const userDetailsSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  return (
    <div className="mx-auto max-w-5xl w-full space-y-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white border-b dark:border-gray-700 pb-4">
        Edit Profile
      </h2>

      <div className="flex flex-col items-center gap-4">
        <div className="w-28 h-28">
          <img
            src={user?.image || "https://www.viverefermo.it/images/user.png"}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border"
          />
        </div>

        <ImageDropZone onImageSelected={handleImageSelected} />
      </div>

      <ImageCropperModal
        file={selectedImage}
        show={showCropper}
        onClose={() => setShowCropper(false)}
        onCropComplete={handleCrop}
      />
      <BaseForm
        initialValues={{
          name: user?.name || "",
          email: user?.email || "",
          // phone: user?.phone || "",
        }}
        validationSchema={userDetailsSchema}
        onSubmit={(values) => updateUserMutation(values)}
      >
        <div className="flex flex-col gap-4">
          <InputField
            label="Name"
            name="name"
            type="text"
            disabled={!isEditing}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            disabled={!isEditing}
          />
          {/* <InputField
            label="Phone Number"
            name="phone"
            type="text"
            disabled={!isEditing}
          /> */}
        </div>

        {isEditing ? (
          <div className="flex justify-end flex-col-reverse md:flex-row gap-4 mt-6">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(false);
              }}
              className="text-red-500 font-semibold cursor-pointer px-4 py-2 rounded-md bg-neutral-200 dark:bg-gray-700 hover:bg-neutral-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#009c85] hover:bg-[#007a6a] text-white px-4 py-2 rounded-md cursor-pointer font-semibold"
              disabled={isUpdatingUser}
            >
              {isUpdatingUser ? "Updating..." : "Save Changes"}
            </button>
          </div>
        ) : (
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer px-4 py-2 rounded-md bg-neutral-200 dark:bg-gray-700 hover:bg-neutral-300 dark:hover:bg-gray-600"
            >
              Edit
            </button>
          </div>
        )}
      </BaseForm>
      <PasswordChangeModal />
    </div>
  );
}
