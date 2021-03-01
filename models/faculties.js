const mongoose = require("mongoose");
const { Schema } = mongoose;

const facultiesSchema = new Schema({
	faculty: String,
	details: String,
});

mongoose.model("faculty", facultiesSchema);