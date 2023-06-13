const productModel = require("../DAO/models/product.model");


class ProductManagerMongoose {
    async getAll(limit) {
        try {
            const productos = await productModel.find();
            if (!limit) {
                return productos;
            }
            if (limit > productos.length) {
                throw new Error(`theres only ${productos}`)
            }
            let productosLimitados = productos.slice(0, limit)
            return productosLimitados;


        } catch (e) {
            throw new Error('error en getall');
        };
    };

    async getById(id) {
        try {
            const product = await productModel.findById(id);
            if (product) {
                return product;
            }
            throw new Error('no product with said id')
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

    async updateProduct(id, newProperties) {
        try {
            const producto = await productModel.findByIdAndUpdate(id, {
                title: newProperties.title,
                description: newProperties.description,
                price: newProperties.price
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