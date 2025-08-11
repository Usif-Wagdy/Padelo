import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ImageDropZone from "../../../helpers/ImageDropzone";
import ImageCropperModal from "../../../helpers/ImageCropperModal";

// Spinner icon
const SpinnerIcon = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// Form input field
const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  ...rest
}) => (
  <div className="flex flex-col gap-1.5">
    <label
      className="font-medium text-sm text-gray-700 dark:text-gray-300"
      htmlFor={name}
    >
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        rows={4}
        {...rest}
      />
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        {...rest}
      />
    )}
  </div>
);

export default function CourtForm({
  onSubmit,
  onDelete,
  loading,
  initialData = {},
  isEdit = false,
}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    description: initialData.description || "",
    contactNumber: initialData.contactNumber || "",
    price: initialData.price || "",
    location: initialData.location || "",
    place: initialData.place || "",
    image: initialData.image || "https://placehold.co/200x200?text=Court",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImageFile, setCroppedImageFile] = useState(null);
  const [croppedImagePreview, setCroppedImagePreview] = useState(
    initialData.image || formData.image
  );

  const [showCropper, setShowCropper] = useState(false);

  useEffect(() => {
    return () => {
      if (croppedImagePreview && croppedImagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(croppedImagePreview);
      }
    };
  }, [croppedImagePreview]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelected = (file) => {
    setSelectedImage(file);
    setShowCropper(true);
  };

  const handleCrop = (croppedFile) => {
    setCroppedImageFile(croppedFile);
    const previewUrl = URL.createObjectURL(croppedFile);
    setCroppedImagePreview(previewUrl);
    setShowCropper(false);
    toast.info("Image cropped successfully.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit && !croppedImageFile && !croppedImagePreview) {
      toast.error("Please add a court image.");
      return;
    }

    if (isEdit) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("contactNumber", formData.contactNumber);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("place", formData.place);

      if (croppedImageFile) {
        formDataToSend.append("photo", croppedImageFile);
      }

      onSubmit(formDataToSend);
    } else {
      onSubmit(formData);
    }
  };

  const handleCancel = () => navigate("/dashboard/courts");

  return (
    <div className="pt-3">
      <form
        onSubmit={handleSubmit}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 "
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-10">
          {/* Header */}
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isEdit ? "Edit Court" : "Add New Court"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Please fill in the court information below.
            </p>
          </div>

          {/* Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Form Fields (left 2/3) */}
            <div className="md:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormInput
                  name="name"
                  label="Court Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Grand Arena"
                  required
                />
                <FormInput
                  name="place"
                  label="Place"
                  value={formData.place}
                  onChange={handleInputChange}
                  placeholder="e.g. Downtown Sports"
                  required
                />
              </div>
              <FormInput
                name="description"
                label="Description"
                type="textarea"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Write a brief description of the court."
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormInput
                  name="contactNumber"
                  label="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="01xxxxxxxxx"
                  required
                />
                <FormInput
                  name="email"
                  label="Contact Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="contact@example.com"
                  required
                />
                <FormInput
                  name="price"
                  label="Price (EGP/hour)"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="150"
                  required
                />
                <FormInput
                  name="location"
                  label="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Zamalek, Cairo"
                  required
                />
              </div>
            </div>

            {/* Image Upload (right 1/3) */}
            <div className="flex flex-col gap-4">
              <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
                Court Image
              </label>
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                {croppedImagePreview ? (
                  <img
                    src={croppedImagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-400 dark:text-gray-500 px-4">
                    <p className="font-medium">No Image</p>
                    <p className="text-xs">Upload and crop an image</p>
                  </div>
                )}
              </div>
              {isEdit && (
                <ImageDropZone onImageSelected={handleImageSelected} />
              )}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
            {isEdit ? (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-md transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => onDelete?.()}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ) : (
              <div />
            )}

            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-md transition text-white cursor-pointer flex items-center justify-center ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading && <SpinnerIcon />}
              {loading
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                ? "Update Court"
                : "Create Court"}
            </button>
          </div>
        </div>

        {/* Cropper Modal */}
        <ImageCropperModal
          file={selectedImage}
          show={showCropper}
          onClose={() => setShowCropper(false)}
          onCropComplete={handleCrop}
          aspect={16 / 9}
        />
      </form>
    </div>
  );
}
