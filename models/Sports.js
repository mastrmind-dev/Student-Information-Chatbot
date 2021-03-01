const mongoose = require("mongoose");
const { Schema } = mongoose;

const sportsSchema = new Schema({
	sports: String,
    totalSports: String,
    sportsNames: Array,
});

mongoose.model("sport", sportsSchema);
