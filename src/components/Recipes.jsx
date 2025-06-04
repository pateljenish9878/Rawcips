import React, { useState, useEffect } from "react";
import CommonSection from "./CommonSection";
import { Container, Row } from "reactstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import ProductsList from "./RecipesList";

const Shop = () => {
  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [isLoading, setIsLoading] = useState(false); 
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [selectedType, setSelectedType] = useState(""); 
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductsData(products);
      setFilteredProducts(products);

      const uniqueCategories = [
        ...new Set(
          products.flatMap((product) => product.categories || [])
        ),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    setIsLoading(true);
    setTimeout(() => {
      applyFilters(selectedCategory, selectedType, term);
      setIsLoading(false);
    }, 500);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    applyFilters(selectedCategory, type, searchTerm);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    applyFilters(category, selectedType, searchTerm);
  };

  const applyFilters = (category, type, term) => {
    let filtered = productsData;

    if (category) {
      filtered = filtered.filter((product) =>
        product.categories?.includes(category)
      );
    }

    if (type === "veg") {
      filtered = filtered.filter((product) => product.vegetarian === true);
    } else if (type === "nonveg") {
      filtered = filtered.filter((product) => product.vegetarian === false);
    }

    if (term) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(term)
      );
    }

    setFilteredProducts(filtered);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <CommonSection title="Recipes" hideOnMobile={true} />

      <section className="stick-section">
        <Container>
          <Row className="justify-content-center">
            <div className="filters__container">
              {/* Search Box */}
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search Product ..."
                  onChange={handleSearch}
                  value={searchTerm}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>

              {/* Category Filter */}
              <div className="category__filter">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="type__filter">
                <button
                  className={`filter__btn veg-btn ${selectedType === "veg" ? "active" : ""}`}
                  onClick={() => handleTypeChange("veg")}
                >
                  Veg
                </button>
                <button
                  className={`filter__btn non-veg-btn ${selectedType === "nonveg" ? "active" : ""}`}
                  onClick={() => handleTypeChange("nonveg")}
                >
                  Non-Veg
                </button>
                <button
                  className={`filter__btn ${selectedType === "" ? "active" : ""}`}
                  onClick={() => handleTypeChange("")}
                >
                  All
                </button>
              </div>
            </div>
          </Row>
        </Container>

        <Container>
          <Row className="dffdd">
            {isLoading ? (
              <div className="fullload">
                <div className="loader"></div> 
              </div>
            ) : currentProducts.length === 0 ? (
              <div className="text-center">
                <h5 className="no-products">No products found</h5>
              </div>
            ) : (
              <>
                <ProductsList data={currentProducts} />
                <Pagination
                  productsPerPage={productsPerPage}
                  totalProducts={filteredProducts.length}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              </>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

const Pagination = ({ productsPerPage, totalProducts, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={`page-item ${currentPage === number ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => paginate(number)}>
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Shop;