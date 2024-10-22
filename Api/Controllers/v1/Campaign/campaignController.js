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

    get:function (request, response) {
    CRUD.get(db,response);   
    },

    getById:function(request,response){

        var id = request.params.id;
        CRUD.getById(db,response,id);
    },

    update: function (request, response) {

        var id = request.params.id; 
        var update_data = request.body;

        var condition = { where: { id: id } };

        CRUD.update(db,response, condition,update_data);

    },

    delete: function (request, response) {

        var id = request.params.id;

        CRUD.delete(db,response,id);

    },
}
