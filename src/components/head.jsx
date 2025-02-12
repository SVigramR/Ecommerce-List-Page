import headStyle from "../styles/header.module.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterSection from "./Filter"; 

function HeadSection({ cart, filters, setFilters, categories }) {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    const toggleActive = () => {
        setActive(!active);
    };

    const removeActive = () => {
        setActive(false);
    };

    return (
        <>
            <header className={headStyle.headContent}>
                <div className={`${headStyle.menu} ${active ? headStyle.active : ''}`} onClick={toggleActive}>
                    <span className={headStyle.bar}></span>
                    <span className={headStyle.bar}></span>
                    <span className={headStyle.bar}></span>
                </div>

                <div className={`${headStyle.nav} ${active ? headStyle.active : ''}`}>
                    <div className={headStyle.ul}>
                        <div className={headStyle.headLi} onClick={removeActive}>
                            <Link className={headStyle.links} to="/">Products</Link>
                        </div>
                    </div>
                    <div className={headStyle.filterSection}>
                        <FilterSection filters={filters} setFilters={setFilters} categories={categories} />
                    </div>
                </div>

                <h1 className={headStyle.headerTitle}>Shopping List</h1>

                <div className={headStyle.cartNav} onClick={removeActive}>
                    <button className={headStyle.cartButton} onClick={() => navigate('cart')} >
                        <FontAwesomeIcon className={headStyle.cartIcon} icon={faCartShopping} />
                        <span className={headStyle.cardCounter}>{cart.length}</span>
                    </button>
                </div>
            </header>
        </>
    );
}

export default HeadSection;
