const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentDetailsSchema = new Schema({
	IndexNo: String,
    Name: String,
    Faculty: String,
    Degree: String,
});

mongoose.model("studentDetails", studentDetailsSchema);
