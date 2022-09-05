const mongoose = require("mongoose");

const Solde = mongoose.Schema({
    Identifiant:String,
    SoldeNet:Number,
	RevenuNet:Number,
	RésultatPayé:Number,
    Annule:Number,
	Soldes:Number,
	StartTime:String,
    EndTime:String
});

mongoose.model("Solde", Solde);