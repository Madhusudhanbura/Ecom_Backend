import mongoose from "mongoose";
const { Schema } = mongoose

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
        unique: true
    },
})

module.exports = mongoose.model("Category",categorySchema)