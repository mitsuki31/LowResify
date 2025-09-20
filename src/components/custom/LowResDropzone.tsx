// A simple drag-and-drop file upload component using react-dropzone

import { useCallback, type JSX } from "react";
import { useDropzone } from "react-dropzone";

export default function LowResDropzone({ setter }: { setter: (file: File | null) => void}): JSX.Element {
  const onDrop = useCallback((acceptedFiles: File[]): void => {
    if (acceptedFiles.length > 0) {
      setter(acceptedFiles[0]);
      console.log("File dropped:", acceptedFiles[0]);
    }
  }, [setter]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-6 py-12 min-h-[100px] h-[200px] text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-blue-400 bg-blue-300 dark:bg-zinc-800' : 'border-gray-300 hover:border-gray-400 dark:border-zinc-600 dark:hover:border-zinc-500'
      }`}
    >
      <input {...getInputProps()} />
      <div className="w-full h-full py-6">
        {isDragActive ? (
          <p className="text-zinc-500 dark:text-yellow-500">Drop the image here...</p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            Drag & drop an image here, or click to select one
          </p>
        )}
      </div>
    </div>
  );
}