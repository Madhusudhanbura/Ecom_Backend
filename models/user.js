import mongoose from 'mongoose'
const { Schema } = mongoose
const crypto = require("crypto")
const { v4 : uuidv4 } = require("uuid")

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    encrypted_password: {
        type: String,
        required: true
    },
    role: {
      type: Number,
      default: 0  
    },
    purchase: {
        type: Array,
        default: []
    }
});

userSchema.virtual("password").set(function(password){
    this.salt = uuidv4();
    this.encrypted_password = this.encrypt_password(password);
})


userSchema.method = {
    
    encrypt_password: function(plainPass){
        if(!plainPass) return "";
        try {
            return crypto.createHmac('sha256',this.salt)
            .update(plainPass)
            .digest('hex');
        }
        catch (error){
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);