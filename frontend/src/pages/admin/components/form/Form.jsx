import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductAPI } from "../../../../redux/reducers/productSlice";
import style from "./Form.module.scss";

const Form = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !price || !image) {
      alert("Bütün sahələr doldurulmalıdır!");
      return;
    }

    const newProduct = {
      title,
      price,
      image,
    };

    dispatch(addProductAPI(newProduct)).then(() => {
      alert("Məhsul uğurla əlavə olundu!");
      setTitle("");
      setPrice("");
      setImage("");
    });
  };

  return (
    <div className={style.form}>
      <h2>Yeni Məhsul Əlavə Et</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Məhsulun adı"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Qiymət"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Şəkil linki"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Əlavə et</button>
      </form>
    </div>
  );
};

export default Form;
