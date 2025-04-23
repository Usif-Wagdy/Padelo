import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";
import getCroppedImg from "../utils/cropImage";

export default function ImageCropperModal({
  file,
  show,
  onClose,
  onCropComplete,
  aspect = 1, // Default to 1:1 for profile
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);

  const onCropDone = async () => {
    setLoading(true);
    const croppedImage = await getCroppedImg(
      URL.createObjectURL(file),
      croppedAreaPixels
    );
    onCropComplete(croppedImage);
    setLoading(false);
    onClose();
  };

  const onCropCompleteInternal = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Crop Image</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="relative h-[400px] bg-gray-100">
          <Cropper
            image={file ? URL.createObjectURL(file) : null}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteInternal}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onCropDone}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center"
          >
            {loading && (
              <svg
                className="w-4 h-4 mr-2 animate-spin"
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
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            )}
            Crop & Upload
          </button>
        </div>
      </div>
    </div>
  );
}
