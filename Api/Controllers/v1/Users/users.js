const imp_import = require("../index"); 
const helperUtility = require("../../../Utils/helper");

const db = imp_import.db.User;
const UserDetail = imp_import.db.UserDetails;

const db_obj = imp_import.db;

const CRUD = imp_import.utility;

module.exports = {

    create:function (request, response) {

        
       CRUD.create(db,response,request.body);
        
     
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

    getAuthorById:async function(req,res, next){
        try {
            var id = req.params.id;
            const user = await db.findByPk(parseInt(id));
            if(!user || user === null){
                return helperUtility.apiResponse(res, false, 404,"Author not found", null, 200);
            }
            const authorData = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                user_image: null,
                author_url: user.name_slug
            }
            const userDetail = await UserDetail.findOne({
                where: {
                    user_id: user.id
                }
            })
            if(userDetail && userDetail !== null){
                authorData.user_image = userDetail.user_image
            }
            return helperUtility.apiResponse(res, true, 200, "Author Data", {authorData: authorData}, 200);
        } catch (error) {
            next(helperUtility.internalServerErrorResponse);
        }
    },

    getAuthorBySlug:async function(req,res, next){
        try {
            var slug = req.params.slug;
            const user = await db.findOne({
                where: {
                    name_slug: slug
                }
            });
            if(!user || user === null){
                return helperUtility.apiResponse(res, false, 404,"Author not found", null, 200);
            }
            const authorData = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                user_image: null,
                author_url: user.name_slug,
                designation: null,
                social_handle: null,
                bio: null,
                languages: null,
                expertise: null,
                location: null,
                award_and_certification: null
            }
            const userDetail = await UserDetail.findOne({
                where: {
                    user_id: user.id
                }
            })
            if(userDetail && userDetail !== null){
                authorData.user_image = userDetail.user_image
                authorData.designation = userDetail.designation
                authorData.social_handle = userDetail.social_handle
                authorData.bio = userDetail.bio
                authorData.languages = userDetail.languages
                authorData.expertise = userDetail.expertise
                authorData.location = userDetail.location
                authorData.award_and_certification = userDetail.award_and_certification
            }
            return helperUtility.apiResponse(res, true, 200, "Author Data", {authorData: authorData}, 200);
        } catch (error) {
            next(helperUtility.internalServerErrorResponse);
        }
    },


}
