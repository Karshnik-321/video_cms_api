const imp_import = require("../index"); 

const db = imp_import.db.Treatment;
const CRUD = imp_import.utility;

module.exports = {
    create: async function (request, response) {
        const treatmentData = request.body;
        // Manual validation
        if (!treatmentData.treatment_name || typeof treatmentData.treatment_name !== 'string') {
            return response.status(400).json({
                message: "Invalid data: 'treatment_name' is required and must be a string"
            });
        }
      if (!treatmentData.product_id || typeof treatmentData.product_id !== 'number') {
        return response.status(400).json({
            message: "Invalid data: 'product_id' is required and must be an integer"
        });
    }
        try {
            // Create a new treatment using Sequelize's create method
            const newTreatment =  await db.create(treatmentData);
            // Only return id, treatment_name, and status
            return response.status(201).json({
                message: "Treatment created successfully",
                data: {
                    
                    id: newTreatment.id,
                    product_id:newTreatment.product_id,
                    treatment_name: newTreatment.treatment_name,
                    status: newTreatment.status
                }
            });
        } catch (error) {
            return response.status(500).json({
                message: "Error treatment source ",
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
        const allowedUpdates = ['treatment_name','product_id','status'];
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
                    message: "treatment not found or no changes detected"
                });
            }
    
            return response.status(200).json({
                message: "treatment updated successfully"
            });
        } catch (error) {
            return response.status(500).json({
                message: "Error updating treatment",
                error: error.message
            });
        }
    },
    
    delete: function (request, response) {
        var id = request.params.id;
        CRUD.delete(db,response,id);

    },
}
