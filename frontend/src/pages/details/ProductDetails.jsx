import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/reducers/productSlice";
import style from "./ProductDetails.module.scss";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const loading = useSelector((state) => state.products.loading);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    const product = products.find((item) => item._id === id);

    if (loading || !product) {
        return <p className={style.loading}>Loading...</p>;
    }

    return (
        <div className={style.details}>
            <img src={product.image} alt={product.title} className={style.image} />
            <div className={style.info}>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Rating:</strong> {product.rating} ⭐</p>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Category:</strong> {product.category}</p>
            </div>
        </div>
    );
};

export default ProductDetails;
