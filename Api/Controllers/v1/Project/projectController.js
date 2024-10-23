const imp_import = require("../index"); 

const db = imp_import.db.Project;
const CRUD = imp_import.utility;

module.exports = {

    create: async function (request, response) {
        const projectData = request.body;
        // Manual validation
        if (!projectData.project_name || typeof projectData.project_name !== 'string') {
            return response.status(400).json({
                message: "Invalid data: 'project_name' is required and must be a string"
            });
        }
      if (!projectData.product_id || typeof projectData.product_id !== 'number') {
        return response.status(400).json({
            message: "Invalid data: 'product_id' is required and must be an integer"
        });
    }
        try {
            // Create a new project using Sequelize's create method
            const newProject =  await db.create(projectData);
            // Only return id, project_name, and status
            return response.status(201).json({
                message: "Project created successfully",
                data: {
                    
                    id: newProject.id,
                    product_id:newProject.product_id,
                    project_name: newProject.project_name,
                    status: newProject.status
                }
            });
        } catch (error) {
            return response.status(500).json({
                message: "Error creating project ",
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
        const allowedUpdates = ['project_name','product_id','status'];
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
                    message: "Project not found or no changes detected"
                });
            }
    
            return response.status(200).json({
                message: "Project updated successfully"
            });
        } catch (error) {
            return response.status(500).json({
                message: "Error updating project",
                error: error.message
            });
        }
    },
    
    delete: function (request, response) {
        var id = request.params.id;
        CRUD.delete(db,response,id);

    },
}
