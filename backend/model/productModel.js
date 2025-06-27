import mongoose from "mongoose";
export const productSchema = mongoose.Schema(
    {
        image: { type: String },
        title: { type: String },
        price: { type: String },
    },
    { timestamps: true }
);

const ProductModel = mongoose.model("product", productSchema);
export default ProductModel;
