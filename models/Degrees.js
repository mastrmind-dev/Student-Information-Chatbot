const mongoose = require("mongoose");
const { Schema } = mongoose;

const degreesSchema = new Schema({
	faculty: String,
	degrees: Array,
});

mongoose.model("degree", degreesSchema);
