const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentsSchema = new Schema(
	{
		index_number: String,
		payment_details: Array,
	},
	{ typeKey: "$type" }
);

mongoose.model("payment", paymentsSchema);
