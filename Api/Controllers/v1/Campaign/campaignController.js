const imp_import = require("../index"); 

const db = imp_import.db.Campaign;
const CRUD = imp_import.utility;

module.exports = {

    create: async function (request, response) {
        const campaignData = request.body;

        // Manual validation
        if (!campaignData.campaign_name || typeof campaignData.campaign_name !== 'string') {
            return response.status(400).json({
                message: "Invalid data: 'campaign_name' is required and must be a string"
            });
        }


        try {
            // Create a new campaign using Sequelize's create method
            const newCampaign = await db.create(campaignData);

            // Only return id, campaign_name, and status
            return response.status(201).json({
                message: "Campaign created successfully",
                data: {
                    id: newCampaign.id,
                    campaign_name: newCampaign.campaign_name,
                    status: newCampaign.status
                }
            });
        } catch (error) {
            return response.status(500).json({
                message: "Error creating campaign",
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
        const allowedUpdates = ['campaign_name', 'status'];
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
                    message: "Campaign not found or no changes detected"
                });
            }
    
            return response.status(200).json({
                message: "Campaign updated successfully"
            });
        } catch (error) {
            return response.status(500).json({
                message: "Error updating campaign",
                error: error.message
            });
        }
    },
    
    delete: function (request, response) {
        var id = request.params.id;
        CRUD.delete(db,response,id);

    },
}
