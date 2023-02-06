const Product = require('../models/product');

//create a product
module.exports.create = async function(req, res){
    try{
        const length = (await Product.find({})).length;
        await Product.create({id: length+1, name: req.body.name, quantity: parseInt(req.body.quantity)});
        return res.status(201).json({
            data: {
                product: req.body
            }
        })
    }catch(err){
        console.log(`Error in creating a product: ${err}`);
        return res.status(501).json();
    }
}

//get all products
module.exports.getProducts = async function(req, res){
    try{
        const products = await Product.find({}, {_id: 0, id: 1, name: 1, quantity: 1});
        return res.status(200).json({
            data: {
                products: products
            }
        })
    }catch(err){
        console.log(`Error in getting all products: ${err}`);
        return res.status(501).json();
    }
}

//delete a product
module.exports.deleteProduct = async function(req, res){
    try{
        const isDeleted = await Product.findOneAndRemove({id: parseInt(req.params.id)});
        if(isDeleted){
            return res.status(200).json({
                data: {
                    message: "product deleted"
                }
            })
        }
        return res.status(204).json();
    }catch(err){
        console.log(`Error in deleting a product: ${err}`);
        return res.status(501).json();
    }
}

//update a product
module.exports.updateProduct = async function(req, res){
    try{
        console.log(req.query.number);
        const product = await Product.find({id: req.params.id});
        if(product){
            await Product.findOneAndUpdate({id: req.params.id},{
                quantity: product[0].quantity + parseInt(req.query.number)
            });
            const updatedRes = await Product.find({id: req.params.id}, {_id: 0, id: 1, name: 1, quantity: 1});
            return res.status(200).json({
                data: {
                    product: updatedRes
                }
            })
        }
        return res.status(204).json();
    }catch(err){
        console.log(`Error in updating a product: ${err}`);
        return res.status(501).json();
    }
}