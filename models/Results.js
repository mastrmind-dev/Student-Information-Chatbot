const mongoose = require("mongoose");
const { Schema } = mongoose;

const resultsSchema = new Schema({
	year: Number,
	semester: Number,
	results: Array,
});

mongoose.model("result", resultsSchema);
