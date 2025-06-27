import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchBasketData,
    removeFromBasketAPI,
} from "../../../../redux/reducers/basketSlice";
import style from "./BasketCard.module.scss";
import { Link } from "react-router-dom";
const BasketCard = () => {
    const dispatch = useDispatch();
    const basketItems = useSelector((state) => state.basket.items);
    const status = useSelector((state) => state.basket.status);
    const [sort, setSort] = useState("asc");

    useEffect(() => {
        dispatch(fetchBasketData());
    }, [dispatch]);

    const handleRemove = (id) => {
        const isConfirmed = window.confirm("Məhsulu silmək istədiyinizə əminsiniz?");
        if (isConfirmed) {
            dispatch(removeFromBasketAPI(id)).then(() => {
                dispatch(fetchBasketData());
                alert("Məhsul silindi");
            });
        }
    };

    const sortedItems = [...basketItems].sort((a, b) => {
        return sort === "asc" ? a.price - b.price : b.price - a.price;
    });

    return (
        <div className={style.basketContainer}>
            <h1 className={style.title}>Your Basket</h1>

            <div className={style.sortBox}>
                <label htmlFor="sort">Sırala: </label>
                <select
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="asc">Ucuzdan bahaya</option>
                    <option value="desc">Bahadan ucuza</option>
                </select>
            </div>

            {status === "loading" ? (
                <p>Loading...</p>
            ) : sortedItems.length === 0 ? (
                <p className={style.empty}>Your basket is empty</p>
            ) : (
                <div className={style.items}>
                    {sortedItems.map((product) => (
                        <div key={product._id} className={style.item}>
                            <img
                                src={product.image}
                                alt={product.title}
                                className={style.image}
                            />
                            <div className={style.info}>
                                <h2>{product.title}</h2>
                                <p>{product.description}</p>
                                <span>Price: ${product.price}</span>
                                <span>Rating: {product.rating} ⭐</span>
                                <button
                                    className={style.removeButton}
                                    onClick={() => handleRemove(product._id)}
                                >
                                    Remove
                                </button>
                                <button className={style.details}> <Link to={`/details/${product._id}`}>
                                    <h3>View Details</h3>
                                </Link></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BasketCard;
