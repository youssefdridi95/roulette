const mongoose = require("mongoose");

const Serial = mongoose.Schema({
	serial:String
});

mongoose.model("Serial", Serial);