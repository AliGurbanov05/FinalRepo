import mongoose from "mongoose";
export const basketSchema = mongoose.Schema(
    {
        image: { type: String },
        title: { type: String },
        price: { type: String },
    },
    { timestamps: true }
);

const BasketModel = mongoose.model("basket", basketSchema);
export default BasketModel;
