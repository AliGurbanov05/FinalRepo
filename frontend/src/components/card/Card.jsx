import React from "react";
import { useDispatch } from "react-redux";
import { addToBasketAPI } from "../../redux/reducers/basketSlice";
import style from "./Card.module.scss";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToBasketAPI(product));
  };

  return (
    <div className={style.card}>
      <div className={style.image}>
        <img src={product.image} alt={product.title} />
      </div>
      <div className={style.txt}>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <span>Price: ${product.price}</span>
        <span>Rating: {product.rating} ⭐</span>
        <button onClick={handleAddToCart}>Add to basket</button>
        <button className={style.details}> <Link to={`/details/${product._id}`}>
          <h3>View Details</h3>
        </Link></button>
      </div>
    </div>
  );
};

export default Card;
