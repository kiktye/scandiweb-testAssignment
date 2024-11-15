import { useState } from "react";

const ProductGallery = ({ gallery: gallery }: { gallery: string[] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? gallery.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === gallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="flex items-center">
      <div className="flex flex-col mr-4 max-h-[625px] overflow-y-scroll">
        {gallery.map((image: string, index: number) => (
          <img
            key={index}
            src={image}
            onClick={() => handleImageClick(index)}
            className={`cursor-pointer w-[110px] h-[110px] mb-4 ${
              index === currentImageIndex ? "border-2 border-gray-400" : ""
            }`}
          />
        ))}
      </div>

      <div className="relative w-[600px] h-[625px]">
        <img
          src={gallery[currentImageIndex]}
          className="w-full h-full object-cover"
        />
        <button
          onClick={handlePrevClick}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800/50 text-white p-2 hover:bg-gray-700 focus:outline-none"
        >
          ‹
        </button>

        <button
          onClick={handleNextClick}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800/50 text-white p-2 hover:bg-gray-700 focus:outline-none"
        >
          ›
        </button>
      </div>
    </div>
  );
};
export default ProductGallery;
