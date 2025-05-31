import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAdminProducts,
  deleteProductAPI,
} from "../../../../redux/reducers/adminSlice";
import style from "./Product.module.scss";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.admin.products);
  const loading = useSelector((state) => state.admin.loading);

  const [text, setText] = useState("");
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Məhsulu silmək istədiyinizə əminsiniz?");
    if (confirmDelete) {
      dispatch(deleteProductAPI(id)).then(() => {
        // Lokal state-dən silinməyə ehtiyac yoxdur, redux update edir
        alert("Məhsul silindi");
      });
    }
  };

  const filteredData = products
    .filter((product) =>
      product.title.toLowerCase().includes(text.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "asc") return a.price - b.price;
      return b.price - a.price;
    });

  return (
    <div className={style.product}>
      <div className={style.searchSort}>
        <input
          type="text"
          placeholder="Ada görə axtar..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="asc">Ucuzdan bahaya</option>
          <option value="desc">Bahadan ucuza</option>
        </select>
      </div>

      <div className={style.cards}>
        {loading ? (
          <p>Loading...</p>
        ) : filteredData.length === 0 ? (
          <p>Heç bir məhsul tapılmadı.</p>
        ) : (
          filteredData.map((product) => (
            <div key={product._id} className={style.card}>
              <img
                src={product.image}
                alt={product.title}
                className={style.image}
              />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <span>Price: ${product.price}</span>
              <span>Rating: {product.rating} ⭐</span>
              <button
                className={style.removeButton}
                onClick={() => handleDelete(product._id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Product;

