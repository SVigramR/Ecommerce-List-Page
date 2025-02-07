import { useEffect, useState } from "react"

function useProductsURL(url) {
    const BASE_URL = "https://dummyjson.com/products";
    const [data, setData] = useState()
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUrl = url ? `${BASE_URL}/category/${url}` : "https://dummyjson.com/products?limit=0";

        fetch(fetchUrl, { mode: "cors" })
        .then((response) => response.json())
        .then((response) => setData(response.products))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    },[url])

    return { data, error, loading }
}

export default useProductsURL;