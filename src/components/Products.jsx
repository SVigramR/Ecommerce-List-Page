import { useState } from "react";
import useProductsURL from "../services/API";
import product from "/src/styles/products.module.css";
import Card from "./Card";
import { useOutletContext } from "react-router-dom";
import FilterSection from "./Filter";
import ReactPaginate from "react-paginate";

function Products({ categoryURL }) {
    const { data, error, loading } = useProductsURL(categoryURL);
    const { cart, setCart } = useOutletContext();
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 12;
    const [fadeOut, setFadeOut] = useState(false);

    if (loading) return <p className={product.expand}>Loading...</p>;
    if (error) return <p className={product.expand}>A network error was encountered</p>;

    // Calculate page count
    const pageCount = Math.ceil(data.length / itemsPerPage);

    // Get current items
    const offset = currentPage * itemsPerPage;
    const currentItems = data.slice(offset, offset + itemsPerPage);

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
            {/* Filter Section (Left) */}
            <div className={product.filterSection}>
                <FilterSection />
            </div>

            {/* Product Grid (Right) */}
            <div className={product.productGrid}>
                {currentItems.map((item, index) => (
                    <Card key={index} item={item} direction={true} cart={cart} setCart={setCart} fadeOut={fadeOut} />
                ))}

                {/* Pagination */}
                <ReactPaginate
                    previousLabel="< Previous"
                    nextLabel="Next >"
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
        </div>
    );
}

export default Products;
