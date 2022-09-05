const mongoose = require("mongoose");

const Admin = mongoose.Schema({
	Identifiant:String,
	Password:String,
});

mongoose.model("Admin", Admin);