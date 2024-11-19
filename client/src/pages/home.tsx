import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphQL/Query";
import ProductCard from "../components/productCard";

const Home = ({ category }: { category: string }) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filter products based on category
  const filteredProducts =
    category === "all"
      ? data.products
      : data.products.filter((product: any) => product.category === category);

  return (
    <>
      <div className="my-16">
        <h1 className="text-3xl font-light capitalize">
          {category === "all" ? "All Products" : category}
        </h1>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-10">
        {/* display the products based on the category */}
        {filteredProducts.map((product: any) => (
          <ProductCard key={product.id} data={product} />
        )
        )}
      </div>
    </>
  );
};
export default Home;
