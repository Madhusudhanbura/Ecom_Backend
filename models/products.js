import mongoose from 'mongoose'
const { Schema } = mongoose
const { ObjectId } = Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        maxlength: 10
    },
    description: {
        type: String,
        required: true,
        maxlength: 600
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model("Product",productSchema)