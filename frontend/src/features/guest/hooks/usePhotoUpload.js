import { useState, useCallback, useRef } from "react";
import { photoService } from "../services/guest.service";
import { uploadToCloudinary } from "@/lib/cloudinary/upload";

/**
 * Manages photo selection, preview generation, and upload state.
 */
export function usePhotoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Revoke previous object URL to avoid memory leaks
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setUploadError(null);

    // Reset input so the same file can be re-selected
    e.target.value = "";
  }, [previewUrl]);

  const clearPhoto = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadError(null);
  }, [previewUrl]);

  /**
   * Submits the photo to the server.
   * @param {{ name: string, message: string, link_token: string }} meta
   */
  const uploadPhoto = useCallback(
    async ({ name, message, link_token }) => {
      if (!selectedFile) return;

      setIsUploading(true);
      setUploadError(null);

      try {
        const url = await uploadToCloudinary(selectedFile)

        await photoService.create({
          link_token,
          url,
          autor_name: name.trim() || null,
          message: message.trim() || null,
        })

        return true;
      } catch (err) {
        setUploadError(err.message);
        return false;
      } finally {
        setIsUploading(false);
      }
    },
    [selectedFile]
  );



  return {
    selectedFile,
    previewUrl,
    isUploading,
    uploadError,
    fileInputRef,
    openFilePicker,
    handleFileChange,
    clearPhoto,
    uploadPhoto,
  };
}