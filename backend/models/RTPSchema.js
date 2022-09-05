const mongoose = require("mongoose");

const RTPSchema = mongoose.Schema({
	RTP:String
});

mongoose.model("RTPSchema", RTPSchema);