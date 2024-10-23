const imp_import = require("../index"); 

const db = imp_import.db.Product;

const CRUD = imp_import.utility;

module.exports = {

    create: async function (request, response) {
        const ProductData = request.body;

        // Manual validation
        if (!ProductData.product_name || typeof ProductData.product_name !== 'string') {
            return response.status(400).json({
                message: "Invalid data: 'product_name' is required and must be a string"
            });
        }


        try {
            // Create a new product using Sequelize's create method
            const newProduct = await db.create(ProductData);

            // Only return id, product_name, and status
            return response.status(201).json({
                message: "Product created successfully",
                data: {
                    id: newProduct.id,
                    product_name: newProduct.product_name,
                    status: newProduct.status
                }
            });
        } catch (error) {
            return response.status(500).json({
                message: "Error creating product",
                error: error.message
            });
        }
    },

    get: function (request, response) {
        CRUD.get(db, request, response);   
    },

    getById:function(request,response){
        var id = request.params.id;
        CRUD.getById(db,response,id);
    },

    update: async function (request, response) {
        const id = request.params.id; 
        const updateData = request.body;
        const allowedUpdates = ['product_name', 'status'];
        const filteredData = {};
        for (const key of allowedUpdates) {
            if (updateData[key] !== undefined) {
                filteredData[key] = updateData[key];
            }
        }
        if (Object.keys(filteredData).length === 0) {
            return response.status(400).json({
                message: "No valid fields to update"
            });
        }
    
        try { 
            const condition = { where: { id: id } };
            const [updatedRows] = await db.update(filteredData, condition);
            if (updatedRows === 0) {
                return response.status(404).json({
                    message: "Product not found or no changes detected"
                });
            }
    
            return response.status(200).json({
                message: "Product updated successfully"
            });
        } catch (error) {
            return response.status(500).json({
                message: "Error updating product",
                error: error.message
            });
        }
    },
    
    delete: function (request, response) {
        var id = request.params.id;
        CRUD.delete(db,response,id);

    },
}
