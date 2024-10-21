const imp_import = require("../index"); 
//const helperUtility = require("../../../Utils/helper");

const db = imp_import.db.Editor;

const CRUD = imp_import.utility;

module.exports = {

    create:function (request, response) {  
        console.log('I run')  
    //    CRUD.create(db,response,request.body); 
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
