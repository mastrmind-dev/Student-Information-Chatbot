const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const config = require("./config/keys");
const mongoose = require("mongoose");
mongoose.connect(config.mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

require("./models/Registration");
require("./models/Demand");
require("./models/Coupons");
require("./models/Results");
require("./models/Degrees");
require("./models/Sports");
require("./models/Faculties");
require("./models/Payments");
require("./models/StudentDetails");

app.use(bodyParser.json());

require("./routes/dialogFlowRoutes")(app);
require("./routes/fulfillmentRoutes")(app);

if (true) {
	app.use(express.static("client/build"));

	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
