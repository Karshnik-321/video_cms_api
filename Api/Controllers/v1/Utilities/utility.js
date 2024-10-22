const { Op } = require("sequelize");
const sequelize = require("sequelize");

module.exports = {
  create: async function (obj, response, data) {
    await obj
      .create(data)
      .then((created) => {
        response.json(created);
      })
      .catch((rejected) => {
        const errors_Arr = {};
        if (rejected.errors) {
          rejected.errors.map((data) => {
            errors_Arr[data.path] = data.message;
          });
        }
        response.status(400).json({ message: errors_Arr });
      });
  },

  update: async function (obj, response, condition, data) {
    await obj
      .update(data, condition)
      .then((created) => {
        if (created[0]) {
          response.json({ message: "Updated Success", error: false });
        } else {
          response.status(400).json({
            message: "Something Went Wrong. Hint:- Please check column name.",
            error: true,
          });
        }
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  },
  get: async function (obj, request, response, includeArr = []) {
    // Get query parameters for pagination
    const page = parseInt(request.query.page) || 1; // Default to page 1
    const limit = parseInt(request.query.limit) || 10; // Default limit to 10
    const offset = (page - 1) * limit; // Calculate offset

    try {
        const data = await obj.findAll({
            include: includeArr,
            limit: limit,
            offset: offset
        });
        
        // Count total records for pagination info
        const totalRecords = await obj.count();
        const totalPages = Math.ceil(totalRecords / limit); // Calculate total pages

        return response.status(200).json({
            message: "Data retrieved successfully",
            data: data,
            pagination: {
                totalRecords: totalRecords,
                totalPages: totalPages,
                currentPage: page,
                limit: limit
            }
        });
    } catch (error) {
        return response.status(500).json({
            message: "Error retrieving data",
            error: error.message
        });
    }
},
  getById: async function (obj, response, id) {
    try {
        const data = await obj.findByPk(id);
        
        if (!data) {
            return response.status(404).json({
                message: "No data found"
            });
        }
        
        return response.status(200).json({
            message: "Data retrieved successfully",
            data: data
        });
    } catch (error) {
        return response.status(500).json({
            message: "Error retrieving data",
            error: error.message
        });
    }
},

  delete: async function (obj, response, id) {
    await obj
      .destroy({
        where: {
          id: id,
        },
      })
      .then((created) => {
        if (created) {
          response.json({ message: "Deleted Success", error: false });
        } else {
          response.json({ message: "Something Went Wrong.", error: true });
        }
      })
      .catch((err) => {
        response.status(500).json(err);
      });
  },

};
