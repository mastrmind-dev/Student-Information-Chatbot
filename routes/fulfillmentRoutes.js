const { WebhookClient } = require("dialogflow-fulfillment");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const mongoose = require("mongoose");
const Demand = mongoose.model("demand");
const Coupon = mongoose.model("coupon");
const Result = mongoose.model("result");

const saveIndexNo = require("./saveIndexNo");

module.exports = (app) => {
	var indexNo;

	app.post("/api/indexNo", async (req, res) => {
		indexNo = req.body.indexNo;
	});

	app.post("/", async (req, res) => {
		const agent = new WebhookClient({ request: req, response: res });

		function fallback(agent) {
			agent.add("I didn't understand");
			agent.add("I'm sorry, can you try again?");
		}
		function snoopy(agent) {
			agent.add("Welcome to my snoopy fulfillment!");
		}
		async function learn(agent) {
			Demand.findOne(
				{ course: agent.parameters.course },
				function (err, course) {
					console.log(course);
					if (course !== null) {
						course.counter++;
						course.save();
					} else {
						const demand = new Demand({ course: agent.parameters.course });
						demand.save();
					}
				}
			);
			await Coupon.findOne(
				{ course: agent.parameters.course },
				function (err, course) {
					console.log(indexNo + " line 53");
					if (course !== null) {
						console.log(course.link);
						var responseText = course.link;
						agent.add(responseText);
					} else {
						agent.add("Please Try Again!");
					}
				}
			);
		}

		async function examResult(agent) {
			console.log("This is what i want now " + indexNo);
			await Result.findOne(
				{
					semester: agent.parameters.sem,
					year: agent.parameters.year,
					indexNo: indexNo,
				},
				function (err, semester) {
					if (semester) {
						if (semester.year === 1 && semester.semester === 1) {
							let output = `Here your ${semester.year}st year ${semester.semester}st semester results. ${semester.results}`;
							agent.add(output);
						} else if (semester.year === 1 && semester.semester === 2) {
							let output = `Here your ${semester.year}st year ${semester.semester}nd semester results. ${semester.results}`;
							agent.add(output);
						} else if (semester.year === 2 && semester.semester === 1) {
							let output = `Here your ${semester.year}nd year ${semester.semester}st semester results. ${semester.results}`;
							agent.add(output);
						} else if (semester.year === 2 && semester.semester === 2) {
							let output = `Here your ${semester.year}nd year ${semester.semester}nd semester results. ${semester.results}`;
							agent.add(output);
						} else if (semester.year === 3 && semester.semester === 1) {
							let output = `Here your ${semester.year}rd year ${semester.semester}st semester results. ${semester.results}`;
							agent.add(output);
						} else if (semester.year === 3 && semester.semester === 2) {
							let output = `Here your ${semester.year}rd year ${semester.semester}nd semester results. ${semester.results}`;
							agent.add(output);
						} else if (semester.year === 4 && semester.semester === 1) {
							let output = `Here your ${semester.year}th year ${semester.semester}st semester results. ${semester.results}`;
							agent.add(output);
						} else if (semester.year === 4 && semester.semester === 2) {
							let output = `Here your ${semester.year}th year ${semester.semester}nd semester results. ${semester.results}`;
							agent.add(output);
						} else{
							agent.add("I dont know whats goin on")
						}
					} else {
						agent.add(
							"Results for that exam is not released yet or you haven't completed it yet."
						);
					}
				}
			);
		}

		let intentMap = new Map();

		intentMap.set("Default Fallback Intent", fallback);
		intentMap.set("snoopy", snoopy);
		intentMap.set("learn courses", learn);
		intentMap.set("ExamResultsNoDetails", examResult);

		agent.handleRequest(intentMap);
	});
};
