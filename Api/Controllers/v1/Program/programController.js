const imp_import = require("../index"); 

const db = imp_import.db.Program;
const CRUD = imp_import.utility;

module.exports = {

    create: async function (request, response) {
        const programData = request.body;
        // Manual validation
        if (!programData.program_name || typeof programData.program_name !== 'string') {
            return response.status(400).json({
                message: "Invalid data: 'program_name' is required and must be a string"
            });
        }
      if (!programData.product_id || typeof programData.product_id !== 'number') {
        return response.status(400).json({
            message: "Invalid data: 'product_id' is required and must be an integer"
        });
    }
        try {
            // Create a new program using Sequelize's create method
            const newProgram = await db.create(programData);
            // Only return id, program_name, and status
            return response.status(201).json({
                message: "Program created successfully",
                data: {
                    
                    id: newProgram.id,
                    product_id:newProgram.product_id,
                    program_name: newProgram.program_name,
                    status: newProgram.status
                }
            });
        } catch (error) {
            return response.status(500).json({
                message: "Error creating program ",
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
        const allowedUpdates = ['program_name','product_id','status'];
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
                    message: "Program not found or no changes detected"
                });
            }
    
            return response.status(200).json({
                message: "Program updated successfully"
            });
        } catch (error) {
            return response.status(500).json({
                message: "Error updating program",
                error: error.message
            });
        }
    },
    
    delete: function (request, response) {
        var id = request.params.id;
        CRUD.delete(db,response,id);

    },
}
