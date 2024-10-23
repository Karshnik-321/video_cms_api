const imp_import = require("../index"); 

const db = imp_import.db.Source;
const CRUD = imp_import.utility;

module.exports = {

    create: async function (request, response) {
        const sourceData = request.body;
        console.log("hello");
        // Manual validation
        if (!sourceData.source_name || typeof sourceData.source_name !== 'string') {
            return response.status(400).json({
                message: "Invalid data: 'source_name' is required and must be a string"
            });
        }
      if (!sourceData.product_id || typeof sourceData.product_id !== 'number') {
        return response.status(400).json({
            message: "Invalid data: 'product_id' is required and must be an integer"
        });
    }
        try {
            // Create a new source using Sequelize's create method
            const newSource =  await db.create(sourceData);
            // Only return id, source_name, and status
            return response.status(201).json({
                message: "Source created successfully",
                data: {
                    
                    id: newSource.id,
                    product_id:newSource.product_id,
                    source_name: newSource.source_name,
                    status: newSource.status
                }
            });
        } catch (error) {
            return response.status(500).json({
                message: "Error creating source ",
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
        const allowedUpdates = ['source_name','product_id','status'];
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
                    message: "Source not found or no changes detected"
                });
            }
    
            return response.status(200).json({
                message: "Source updated successfully"
            });
        } catch (error) {
            return response.status(500).json({
                message: "Error updating Source",
                error: error.message
            });
        }
    },
    
    delete: function (request, response) {
        var id = request.params.id;
        CRUD.delete(db,response,id);

    },
}
