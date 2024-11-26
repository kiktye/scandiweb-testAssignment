import { useState } from "react";

const ProductGallery = ({ gallery }: { gallery: string[] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // on click on prev/next button to change the main image to next or previous :D
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

  // on click on image from the gallery(left) to change to the main image
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="flex-row md:flex items-center" data-testid="product-gallery">
      <div className="flex md:flex-col mr-4 max-h-[625px] overflow-y-scroll">
        {/* gallery images */}
        {gallery.map((image: string, index: number) => (
          <img
            key={index}
            src={image}
            onClick={() => handleImageClick(index)}
            className={`cursor-pointer w-[110px] h-[110px] mb-4 ${
              index === currentImageIndex ? "border-2 border-gray-400" : ""
            }`}
            alt="gallery"
          />
        ))}
      </div>

      {/* main image with control buttons prev and next */}
      <div className="relative md:w-[600px] md:h-[625px]">
        <img
          src={gallery[currentImageIndex]}
          className="w-full h-full object-cover"
          alt="main>"
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
