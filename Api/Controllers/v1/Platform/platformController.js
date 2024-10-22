const imp_import = require("../index"); 

const db = imp_import.db.Platform;

const CRUD = imp_import.utility;

module.exports = {

    create: async function (request, response) {
        const PlatformData = request.body;

        // Manual validation
        if (!PlatformData.platform_name || typeof PlatformData.platform_name !== 'string') {
            return response.status(400).json({
                message: "Invalid data: 'platform_name' is required and must be a string"
            });
        }


        try {
            // Create a new campaign using Sequelize's create method
            const newPlatform = await db.create(PlatformData);

            // Only return id, campaign_name, and status
            return response.status(201).json({
                message: "Platform created successfully",
                data: {
                    id: newPlatform.id,
                    platform_name: newPlatform.platform_name,
                    status: newPlatform.status
                }
            });
        } catch (error) {
            return response.status(500).json({
                message: "Error creating platform",
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
        const allowedUpdates = ['platform_name', 'status'];
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
                    message: "Platform not found or no changes detected"
                });
            }
    
            return response.status(200).json({
                message: "Platform updated successfully"
            });
        } catch (error) {
            return response.status(500).json({
                message: "Error updating platform",
                error: error.message
            });
        }
    },
    
    delete: function (request, response) {
        var id = request.params.id;
        CRUD.delete(db,response,id);

    },
}
