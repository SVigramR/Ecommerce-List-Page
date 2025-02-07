import { useState, useCallback } from "react";
import useProductsURL from "../services/API";
import product from "/src/styles/products.module.css";
import Card from "./Card";
import { useOutletContext } from "react-router-dom";
import FilterSection from "./Filter";
import ReactPaginate from "react-paginate";
import { ToastContainer } from "react-toastify";

function Products() {
    const { data, error, loading } = useProductsURL();
    const { cart, setCart, filters, setFilters, categories  } = useOutletContext();

    // 🔥 Use useCallback to prevent re-renders of FilterSection

    const updateFilters = useCallback((newFilters) => {
        setFilters(newFilters);
    }, []);

    // Ensure data is available before extracting categories
    // const categories = data ? [...new Set(data.map((item) => item.category))] : [];

    // Pagination State
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 12;
    const [fadeOut, setFadeOut] = useState(false);

    if (loading) return <p className={product.expand}>Loading...</p>;
    if (error) return <p className={product.expand}>A network error was encountered</p>;

    // Apply Filters
    let filteredData = data?.filter((item) => {
        if (filters.category && item.category !== filters.category) return false;
        if (filters.minPrice && item.price < Number(filters.minPrice)) return false;
        if (filters.maxPrice && item.price > Number(filters.maxPrice)) return false;
        return true;
    }) || [];

    // Apply Sorting
    if (filters.sortOption === "low-to-high") {
        filteredData.sort((a, b) => a.price - b.price);
    } else if (filters.sortOption === "high-to-low") {
        filteredData.sort((a, b) => b.price - a.price);
    }

    // Pagination
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentItems = filteredData.slice(offset, offset + itemsPerPage);

    // Handle page click with animation
    const handlePageClick = ({ selected }) => {
        setFadeOut(true); // Start fade-out
        setTimeout(() => {
            setCurrentPage(selected);
            setFadeOut(false); // Start fade-in
        }, 300); // Match CSS animation timing
    };

    return (
        <div className={product.holder}>
            {/* Filter Section */}
            <div className={product.filterSection}>
                <FilterSection filters={filters} setFilters={setFilters} categories={categories} />
            </div>

            {/* <div className={product.productPageHolder}> */}
            {/* Product Grid */}
            <div className={product.productPageHolder}>
                <div className={product.productGrid}>
                {currentItems.map((item, index) => (
                    <Card key={index} item={item} direction={true} cart={cart} setCart={setCart} fadeOut={fadeOut} />
                ))}

                </div>
                <ReactPaginate
                    previousLabel="<"
                    nextLabel=">"
                    breakLabel="..."
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={product.pagination}
                    activeClassName={product.activePage}
                    disabledClassName={product.disabledPage}
                />
            </div>
            {/* Pagination */}
            {/* </div> */}

            <ToastContainer />
        </div>
    );
}

export default Products;
