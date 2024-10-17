const { sequelize }  = require("./Database/v1/models/index.js");

sequelize.sync({
    force:true
});
