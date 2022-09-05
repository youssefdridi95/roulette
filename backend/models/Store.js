const mongoose = require("mongoose");

const Store = mongoose.Schema({
	Identifiant:String,
	Password:String,
	Balance:String,
	Status:String,
	RevenuNet:Number,
	Annule:Number,
	RésultatPayé:Number,
	Soldes:Number,
	SoldeStartTime:String
});

mongoose.model("Store", Store);