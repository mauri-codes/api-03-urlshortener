var mongoose = require("mongoose");
var urlSchema = mongoose.Schema({
    id: {type: String, required: true, unique: true}
});

urlSchema.methods.red = function () {
    return this.redirect;
};

var URL = mongoose.model("URL", urlSchema);
module.exports = URL;
