import { PRODUCT } from "../graphQL/Query";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import ProductGallery from "../components/productGallery";
import ProductDetails from "../components/productDetails";

const Detail = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(PRODUCT, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex gap-10 items-start">
      <ProductGallery gallery={data.product.gallery} />

      <ProductDetails product={data.product} />
    </div>
  );
};

export default Detail;
