import BasketModel from "../model/basketModel.js";

const getBasket = async (req, res) => {
    const basket = await BasketModel.find();
    res.json(basket)
};

const postBasket = async (req, res) => {
    const { image, title, price } = req.body;
    let newBasket = { image, title, price };
    await BasketModel.create(newBasket);
    res.json(newBasket);
};
const deleteBasket = async (req, res) => {
    const { id } = req.params;
    await BasketModel.findByIdAndDelete(id);
    res.json("product was deleted");
};

export { getBasket, postBasket, deleteBasket };
