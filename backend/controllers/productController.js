import ProductModel from "../model/productModel.js";

const getProducts = async (req, res) => {
    const products = await ProductModel.find();
    res.json(products)
};

const postProducts = async (req, res) => {
    const { image, title, price } = req.body;
    let newProduct = { image, title, price };
    await ProductModel.create(newProduct);
    res.json(newProduct);
};
const deleteProducts = async (req, res) => {
    const { id } = req.params;
    await ProductModel.findByIdAndDelete(id);
    res.json("product was deleted");
};

export { getProducts, postProducts, deleteProducts };
