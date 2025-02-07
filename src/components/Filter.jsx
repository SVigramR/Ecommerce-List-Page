import { useState, useEffect } from "react";
import filterStyle from "../styles/filter.module.css";

function FilterSection({ setFilters, categories = [] }) {
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortOption, setSortOption] = useState("");

    // ✅ Ensure `setFilters` exists before calling it
    useEffect(() => {
        if (typeof setFilters === "function") {
            setFilters({
                category,
                minPrice: minPrice ? Number(minPrice) : "",
                maxPrice: maxPrice ? Number(maxPrice) : "",
                sortOption,
            });
        }
    }, [category, minPrice, maxPrice, sortOption]);

    return (
        <div className={filterStyle.filterContainer}>
            <h3>Filter</h3>

            {/* Category Filter */}
            <label>Category:</label>
            <select
                className={filterStyle.filterSelect}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            {/* Price Range Filter */}
            <label>Price Range:</label>
            <div className={filterStyle.priceFilter}>
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>

            {/* Sorting Options */}
            <label>Sort By:</label>
            <select
                className={filterStyle.filterSelect}
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
            >
                <option value="">Default</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
            </select>
        </div>
    );
}

export default FilterSection;
