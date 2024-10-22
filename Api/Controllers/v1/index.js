const version = require("../../config/config.json").version;

const db = require(`../../Database/${version}/models`);

const utility = require(`../../Controllers/v1/Utilities/utility`)


// const utility = require(`../${version}/Utilities/utility`);

module.exports = {
    db:db,
    utility:utility
}
