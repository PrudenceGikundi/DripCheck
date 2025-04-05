import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

const CloudinaryImage = ({ publicId, width = 500, height = 500 }) => {
  const cld = new Cloudinary({ cloud: { cloudName: "dd8cmtiet" } });

  const img = cld
    .image(publicId) // The public ID of the image in Cloudinary
    .format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(width).height(height)); // Transform the image

  return <AdvancedImage cldImg={img} />;
};

export default CloudinaryImage;