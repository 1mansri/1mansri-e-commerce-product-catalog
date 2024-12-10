import { useState, useEffect } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/ui/pagination";

const App = () => {
  // State to hold the product data
  const [products, setProducts] = useState([]);
  // State to manage the search input
  const [search, setSearch] = useState("");
  // State to track the current page for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Number of posts displayed per page
  const [postsPerPage] = useState(8);
  const [sortOption, setSortOption] = useState(""); // State to track the selected sort option


  // Fetching product data using useEffect
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data)); // Set the product data in state
  }, []);

  console.log(products);

  const sortProducts = (option) => {
    let sortedProducts = [...products];
    switch (option) {
      case "price-asc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating-asc":
        sortedProducts.sort((a, b) => a.rating.rate - b.rating.rate);
        break;
      case "rating-desc":
        sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "stock-asc":
        sortedProducts.sort((a, b) => a.rating.count - b.rating.count);
        break;
      case "stock-desc":
        sortedProducts.sort((a, b) => b.rating.count - a.rating.count);
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
  };

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    sortProducts(option);
  };

  // Filtering products based on the search input
  const searchProduct = products.filter((product) => {
    return Object.keys(product).some((key) =>
      product[key]
        .toString()
        .toLowerCase()
        .includes(search.toString().toLowerCase())
    );
  });

  // Utility function to truncate strings to a specific length
  const Truncate = (string, number) => {
    if (!string) {
      return null;
    }
    if (string.length <= number) {
      return string;
    }
    return string.slice(0, number) + "...";
  };

  // Calculating the index for slicing the product data for the current page
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = searchProduct.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      {/* Product catalog section */}
      {/* use accerenity ai for background grid (classname='bg-grid-black/[0.2]') */}
      <section className="product py-[30px] px-0 bg-grid-black/[0.2] "> 
        <h1 className="md:text-6xl text-2xl sm:text-4xl text-black font-bold font-sans pb-10 flex justify-center" >Product Catalog</h1>
        <div className="container w-[100%] mr-auto ml-auto pl-[15px] pr-[15px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]">
          {/* Search Bar and Sorting Controls */}
          <div className="flex justify-between items-center mb-10">
            <form className="form relative w-[45%] pl-[5px] block transition-all duration-500 ease-linear hover:w-[50%] max-lg:w-[50%] max-lg:hover:w-[55%] max-md:w-[42%] max-md:hover:w-[45%]">
              <button className="absolute left-3 -translate-y-1/2 top-[55%] p-1">
                <svg
                  width={17}
                  height={16}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-labelledby="search"
                  className="w-5 h-5 text-gray-700"
                >
                  <path
                    d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                    stroke="currentColor"
                    strokeWidth="1.333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <input
                className="input w-full rounded-full mb-0 flex justify-center items-center px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-lg shadow-black border-solid border-black"
                placeholder="Product Filter"
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                value={search}
              />
              <button
                type="reset"
                className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </form>

            {/* Sorting Dropdown */} 
            <div className="w-[35%] text-right">
              <select
                className="sorting-dropdown w-full px-2 py-2 border rounded-lg shadow-lg shadow-black"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-asc">Rating: Low to High</option>
                <option value="rating-desc">Rating: High to Low</option>
                <option value="stock-asc">Stocks: Low to High</option>
                <option value="stock-desc">Stocks: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product cards displayed in a grid */}
          <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {currentPosts.map((product) => (
              <div
                className="card bg-white w-[100%] max-md:max-w-[100%] max-w-[300px] flex flex-col justify-around items-center p-3 shadow-md shadow-black transition-transform duration-500 ease-linear hover:scale-95 hover:shadow-lg hover:shadow-black"
                key={product.id} // Unique key for each product
              >
                {/* Product image */}
                <img
                  className="card-image w-[100%] max-w-[50%]"
                  src={product.image}
                  alt={product.title}
                />
                <div className="card-body">
                  {/* Product title */}
                  <h5
                    className="card-title m-[10px] flex justify-center items-start font-bold "
                    title={product.title.length >= 50 ? product.title : null}
                  >
                    {Truncate(product.title, 55)}
                  </h5>
                  {/* Product description */}
                  <p className="card-description mb-[10px] text-[12px] ">
                    {Truncate(product.description, 55)}
                  </p>
                  {/* Product price */}
                  <p className="card-price font-bold text-[13px] ">
                    ${product.price}
                  </p>
                  {/* Product rating and stock */}
                  <div className="card-detail flex justify-between items-center font-bold text-[13px] max-md:flex-col max-md:items-start">
                    <div className="flex justify-center flex-row gap-2 pt-2">
                      <h2 className="pt-[3px]">{product.rating.rate}</h2>
                      <StarRatings
                        rating={product.rating.rate}
                        starDimension="16px"
                        starSpacing="1px"
                        starRatedColor="black"
                      />
                    </div>
                    <span>Stock: {product.rating.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination controls */}
          <div className="flex justify-center items-center py-5">
            <PaginationFunction
              totalPosts={searchProduct.length}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default App;

// Pagination function component
function PaginationFunction({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}) {
  const pageNumbers = [];
  // Calculating the total number of pages
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Maximum number of pages to display in pagination
  const maxPageNum = 5;
  const pageNumLimit = Math.floor(maxPageNum / 2);

  // Determine the active page range to display
  let activePages = pageNumbers.slice(
    Math.max(0, currentPage - 1 - pageNumLimit),
    Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
  );

  // Handle moving to the next page
  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle moving to the previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Render the page numbers with ellipsis if needed
  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem
        key={idx}
        className={currentPage === page ? "bg-slate-400 rounded-md" : ""}
      >
        <PaginationLink onClick={() => setCurrentPage(page)}>{page}</PaginationLink>
      </PaginationItem>
    ));

    // Add ellipsis at the start if necessary
    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          onClick={() => setCurrentPage(activePages[0] - 1)}
        />
      );
    }

    // Add ellipsis at the end if necessary
    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          onClick={() =>
            setCurrentPage(activePages[activePages.length - 1] + 1)
          }
        />
      );
    }

    return renderedPages;
  };

  return (
    <div >
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious className="hover:bg-slate-400" onClick={handlePrevPage} />
          </PaginationItem>

          {renderPages()}

          <PaginationItem >
            <PaginationNext className="hover:bg-slate-400" onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
