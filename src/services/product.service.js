const productModel = require("../DAO/models/product.model");


class ProductManagerMongoose {
    async getAll(limit) {
        try {
            const productos = await productModel.find();
            return productos;
            //FALTA AGREGAR TODA LA LOGICA DE LIMIT

        } catch (e) {
            throw new Error('error en getall');
        };
    };

    async getById(id) {
        try {
            const product = await productModel.findById(id);
            if (product) {
                return product;
            };
        } catch (e) {
            throw new Error('error en getbyid')
        };

    };

    async createProduct(newProd) {
        try {
            const createdProduct = new productModel({
                title: newProd.title,
                description: newProd.description,
                price: newProd.price
            });
            return await createdProduct.save();
        } catch (e) {
            throw new Error('error en el metodo createProduct');
        };
    };

    async updateProduct(id, properties) {
        try {
            const producto = await productModel.findByIdAndUpdate(id, {
                title: properties.title,
                description: properties.description,
                price: properties.price
            }, { new: true });
            return producto;
        } catch (e) {
            throw new Error('something went wrong in UPDATEPRODUCT');
        };
    };

    async deleteProduct(id) {
        try {
            return await productModel.deleteOne({ _id: id });
        } catch (e) {
            throw new Error('error en delete product');
        }
    }

};


module.exports = ProductManagerMongoose;