import mongoose from "mongoose";
const { Schema } = mongoose
const { ObjectId } = Schema

const cartSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    product: {
        type: ObjectId,
        ref: "Product"
    }
})

const productCart = mongoose.model("Cart",cartSchema)

const orderSchema = new Schema({
    products: {
        type: Array,
        default: [cartSchema]
    },
    transaction_id: {
        
    },
    amount: {
        type: Number
    },
    address: {
        type: String
    },
    user: {
        type: ObjectId,
        ref: User
    }
})

const order = mongoose.model("Order",orderSchema)

module.exports = {productCart,order}