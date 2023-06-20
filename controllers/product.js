const formidable = require('formidable')
const Product = require('../models/products')
const fs = require('fs')
const _ = require('lodash');

function getProd(req,res){
    return res.json(req.prod)
}

function createProd(req,res){
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;

    form.parse(req,(err,fields,file) => {
        if(err){
            return res.json({"err": "cannot create product plz check"})
        }

        let product = new Product(fields);

        if(file.photo){
            if(file.photo.size > 3000000){
                return res.json({"sizerr": "file size exceeds"})
            }
        }

        product.photo.data = fs.readFileSync(file.photo.filepath)
        product.photo.contentType = file.photo.type

        product.save((err,prod) => {
            if(err){
                return res.json({"err": "product saving error"})
            }
        })
        return res.json(product)
    })
}

function updateProd(req,res){
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;

    form.parse(req,(err,fields,file) => {
        if(err){
            return res.json({"err": "cannot create product plz check"})
        }

        let updatedProduct = req.prod;
        updatedProduct = _.extend(fields)
        console.log(updatedProduct)
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.json({"sizerr": "file size exceeds"})
            }
            updatedProduct.photo.data = fs.readFileSync(file.photo.filepath)
            updatedProduct.photo.contentType = file.photo.type
        }

        updatedProduct.save((err,prod) => {
            if(err){
                return res.json({"err": "product saving error"})
            }
        })
        return res.json(updatedProduct)
    })
}

function deleteProd(req,res){
    req.prod.remove((err,prod) => {
        if(err){
            return res.json({"err": "error in prod delete"})
        }
        return res.json(req.prod)
    })
}
// middlewares
function getProdById(req,res,next,prodId){
    Product.findById(prodId,(err,prod) => {
        if(err || !prod){
            return res.json({"err": "cannot get product"})
        }
        req.prod = prod
        next()
    })
}
module.exports = {getProd, getProdById, createProd, updateProd, deleteProd}