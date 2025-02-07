import { useEffect, useState } from "react";

function useProductsURL(url, fetchCategories = false) {
    const BASE_URL = "https://dummyjson.com/products";
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let fetchUrl;
        if (fetchCategories) {
            fetchUrl = `${BASE_URL}/categories`; // Fetch categories
        } else {
            fetchUrl = url ? `${BASE_URL}/category/${url}` : `${BASE_URL}?limit=0`; // Fetch products
        }

        fetch(fetchUrl, { mode: "cors" })
            .then((response) => response.json())
            .then((response) => setData(fetchCategories ? response : response.products))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, [url, fetchCategories]);

    return { data, error, loading };
}

export default useProductsURL;
