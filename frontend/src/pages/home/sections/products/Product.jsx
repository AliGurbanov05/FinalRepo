import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../../../components/card/Card";
import style from "./Product.module.scss";
import { fetchProducts } from "../../../../redux/reducers/productSlice";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={style.product}>
      <div className={style.txt}>
        <p>Popular Products</p>
        <h1>Our Products</h1>
        <span>
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia
        </span>
      </div>
      <div className={style.cards}>
        {products.length === 0 ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => <Card key={product._id} product={product} />)
        )}
      </div>
    </div>
  );
};

export default Product;
