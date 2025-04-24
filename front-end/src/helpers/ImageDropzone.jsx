import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Image as ImageIcon, UploadCloud } from "lucide-react";

export default function ImageDropzone({ onImageSelected, multiple = false }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        multiple
          ? onImageSelected(acceptedFiles)
          : onImageSelected(acceptedFiles[0]);
      }
    },
    [onImageSelected, multiple]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        cursor-pointer rounded-xl border-2 border-dashed p-6 transition-colors duration-200 
        ${
          isDragActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
        }
        text-center hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2 text-gray-700 dark:text-gray-200">
        <UploadCloud className="w-8 h-8 text-blue-500 dark:text-blue-400" />
        {isDragActive ? (
          <p className="font-medium">
            Drop the image{multiple ? "s" : ""} here...
          </p>
        ) : (
          <p className="font-medium">
            Drag and drop or{" "}
            <span className="text-blue-600 dark:text-blue-400 underline">
              click
            </span>{" "}
            to upload image{multiple ? "s" : ""}
          </p>
        )}
      </div>
    </div>
  );
}
