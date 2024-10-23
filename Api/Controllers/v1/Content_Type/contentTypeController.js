const imp_import = require("../index"); 

const db = imp_import.db.ContentType;
const CRUD = imp_import.utility;

module.exports = {

    create: async function (request, response) {
        const contentTypeData = request.body;
        // Manual validation
        if (!contentTypeData.content_type_name || typeof contentTypeData.content_type_name !== 'string') {
            return response.status(400).json({
                message: "Invalid data: 'content_type_name' is required and must be a string"
            });
        }
      if (!contentTypeData.product_id || typeof contentTypeData.product_id !== 'number') {
        return response.status(400).json({
            message: "Invalid data: 'product_id' is required and must be an integer"
        });
    }
        try {
            // Create a new contentType using Sequelize's create method
            const newContentType = await db.create(contentTypeData);
            // Only return id, content_name, and status
            return response.status(201).json({
                message: "ContentType created successfully",
                data: {
                    id: newContentType.id,
                    product_id:newContentType.product_id,
                    content_type_name: newContentType.content_type_name,
                    status: newContentType.status
                }
            });
        } catch (error) {
            return response.status(500).json({
                message: "Error creating content type",
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
        const allowedUpdates = ['content_type_name','product_id','status'];
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
                    message: "ContentType not found or no changes detected"
                });
            }
    
            return response.status(200).json({
                message: "ContentType updated successfully"
            });
        } catch (error) {
            return response.status(500).json({
                message: "Error updating contenttype",
                error: error.message
            });
        }
    },
    
    delete: function (request, response) {
        var id = request.params.id;
        CRUD.delete(db,response,id);

    },
}
