import React, { useState } from "react";

// Marketplace Component
const Marketplace = () => {
  // State for handling the form inputs and the list of outfits posted for sale
  const [outfits, setOutfits] = useState([]);
  const [newOutfit, setNewOutfit] = useState({
    title: "",
    caption: "",
    price: "",
    imageUrl: "",
    rating: 0,
    size: "", // Added size
  });

  // State for storing image file and preview URL
  const [imagePreview, setImagePreview] = useState("");

  // Handle input change for outfit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOutfit({ ...newOutfit, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Set the image file URL for preview
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setImagePreview(fileReader.result);
      };
      fileReader.readAsDataURL(file);

      // Set the file path for backend submission (optional for real-world usage)
      setNewOutfit({ ...newOutfit, imageUrl: file });
    }
  };

  // Handle outfit submission
  const handleOutfitSubmit = (e) => {
    e.preventDefault();
    if (newOutfit.title && newOutfit.price) {
      setOutfits([...outfits, { ...newOutfit, id: outfits.length + 1 }]);
      setNewOutfit({ title: "", caption: "", price: "", imageUrl: "", rating: 0, size: "" }); // Reset form
      setImagePreview(""); // Reset image preview
    }
  };

  // Handle rating change for a specific outfit
  const handleRatingChange = (newRating, outfitId) => {
    const updatedOutfits = outfits.map((outfit) =>
      outfit.id === outfitId ? { ...outfit, rating: newRating } : outfit
    );
    setOutfits(updatedOutfits);
  };

  return (
    <div className="marketplace-container bg-gray-900 text-white p-6">
      <h2 className="text-2xl mb-6">Marketplace</h2>

      {/* Outfit Posting Form */}
      <div className="outfit-form bg-gray-800 p-4 rounded mb-6">
        <h3 className="text-xl mb-4">Post Your Outfit</h3>
        <form onSubmit={handleOutfitSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              value={newOutfit.title}
              onChange={handleInputChange}
              placeholder="Outfit Title"
              className="w-full p-2 bg-gray-700 text-white rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="price"
              value={newOutfit.price}
              onChange={handleInputChange}
              placeholder="Price in KSH"
              className="w-full p-2 bg-gray-700 text-white rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="caption"
              value={newOutfit.caption}
              onChange={handleInputChange}
              placeholder="Caption"
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded" // Square image (8rem size)
                />
              </div>
            )}
          </div>

          {/* Size Input */}
          <div className="mb-4">
            <select
              name="size"
              value={newOutfit.size}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 text-white rounded"
              required
            >
              <option value="">Select Size</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
            </select>
          </div>

          <button type="submit" className="bg-electricBlue text-white px-4 py-2 rounded">
            Post Outfit
          </button>
        </form>
      </div>

      {/* Outfits Listing */}
      <div className="outfit-list">
        <h3 className="text-xl mb-4">All Outfits for Sale</h3>
        {outfits.length === 0 ? (
          <p className="text-gray-400">No outfits posted yet.</p>
        ) : (
          outfits.map((outfit) => (
            <div key={outfit.id} className="outfit-item flex mb-6 p-4 border border-gray-700 rounded bg-gray-800">
              {/* Outfit Image */}
              <img
                src={outfit.imageUrl ? URL.createObjectURL(outfit.imageUrl) : "https://via.placeholder.com/150"}
                alt={outfit.title}
                className="w-32 h-32 object-cover rounded-lg" // Square image
              />

              {/* Outfit Info */}
              <div className="ml-4">
                <h4 className="text-xl">{outfit.title}</h4>
                <p className="text-lg">{outfit.caption}</p>
                <p className="text-sm">Price: KSH {outfit.price}</p>
                <p className="text-sm">Size: {outfit.size}</p> {/* Display size */}
                <div className="rating flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star cursor-pointer ${outfit.rating >= star ? "text-yellow-500" : "text-gray-400"}`}
                      onClick={() => handleRatingChange(star, outfit.id)}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
                <p>Your rating: {outfit.rating} Stars</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Marketplace;
