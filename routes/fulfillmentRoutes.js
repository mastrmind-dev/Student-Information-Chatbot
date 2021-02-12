const { WebhookClient } = require("dialogflow-fulfillment");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const mongoose = require("mongoose");
const Demand = mongoose.model("demand");
const Coupon = mongoose.model("coupon");
const Result = mongoose.model("result");
const Degree = mongoose.model("degree");

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

		async function examResults(agent) {
			console.log("This is what i want now " + indexNo);
			await Result.findOne(
				{
					year: agent.parameters.year,
					semester: agent.parameters.sem,
					indexNo: indexNo,
				},
				function (err, year) {
					try {
						if (year.year === 1 && year.semester === 1) {
							let output = `Here your ${year.year}st year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 1 && year.semester === 2) {
							let output = `Here your ${year.year}st year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 2 && year.semester === 1) {
							let output = `Here your ${year.year}nd year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 2 && year.semester === 2) {
							let output = `Here your ${year.year}nd year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 3 && year.semester === 1) {
							let output = `Here your ${year.year}rd year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 3 && year.semester === 2) {
							let output = `Here your ${year.year}rd year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 4 && year.semester === 1) {
							let output = `Here your ${year.year}th year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 4 && year.semester === 2) {
							let output = `Here your ${year.year}th year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results)
						} else {
							agent.add("Invalid year or semester in try block!");
						}
					} catch (error) {
						if(indexNo === 'a@a.lk'){
							agent.add("Please sign in as a student to know your results!");
						} else if(agent.parameters.year <= 4 && agent.parameters.semester <= 2){
							agent.add("You haven't completed that exam yet or the results are not yet released!");
						}
						else{
							agent.add('Invalid year or semester!');
						}
					}
				}
			);
		}

		async function examResultsByYear(agent) {
			await Result.findOne(
				{
					year: agent.parameters.year,
					semester: agent.parameters.semester,
					indexNo:indexNo,
				},
				function (err, year) {
					try {
						if (year.year === 1 && year.semester === 1) {
							let output = `Here your ${year.year}st year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 1 && year.semester === 2) {
							let output = `Here your ${year.year}st year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 2 && year.semester === 1) {
							let output = `Here your ${year.year}nd year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 2 && year.semester === 2) {
							let output = `Here your ${year.year}nd year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 3 && year.semester === 1) {
							let output = `Here your ${year.year}rd year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 3 && year.semester === 2) {
							let output = `Here your ${year.year}rd year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 4 && year.semester === 1) {
							let output = `Here your ${year.year}th year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 4 && year.semester === 2) {
							let output = `Here your ${year.year}th year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results)
						} else {
							agent.add("Invalid year or semester in try block!");
						}
					} catch (error) {
						if(indexNo === 'a@a.lk'){
							agent.add("Please sign in as a student to know your results!");
						} else if(agent.parameters.year <= 4 && agent.parameters.semester <= 2){
							agent.add("You haven't completed that exam yet or the results are not yet released!");
						}
						else{
							agent.add('Invalid year or semester!');
						}
					}
				}
			);
		}

		async function examResultsByYearAndSemester(agent){
			await Result.findOne(
				{
					year: agent.parameters.year,
					semester: agent.parameters.semester,
					indexNo:indexNo,
				},
				function (err, year) {
					//console.log(year.year + ' and ' + year.semester)
					try {
						if (year.year === 1 && year.semester === 1) {
							let output = `Here your ${year.year}st year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 1 && year.semester === 2) {
							let output = `Here your ${year.year}st year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 2 && year.semester === 1) {
							let output = `Here your ${year.year}nd year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 2 && year.semester === 2) {
							let output = `Here your ${year.year}nd year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 3 && year.semester === 1) {
							let output = `Here your ${year.year}rd year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 3 && year.semester === 2) {
							let output = `Here your ${year.year}rd year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 4 && year.semester === 1) {
							let output = `Here your ${year.year}th year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results)
						} else if (year.year === 4 && year.semester === 2) {
							let output = `Here your ${year.year}th year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results)
						} else {
							agent.add("Invalid year or semester in try block!");
						}
					} catch (error) {
						if(indexNo === 'a@a.lk'){
							agent.add("Please sign in as a student to know your results!");
						} else if(agent.parameters.year <= 4 && agent.parameters.semester <= 2){
							agent.add("You haven't completed that exam yet or the results are not yet released!");
						}
						else{
							agent.add('Invalid year or semester!');
						}
					}
				})
		}

		
		async function degrees(agent){
			await Degree.findOne(
				{
					faculty: "all",
				},
				function (err, faculty) {
					//console.log(year.year + ' and ' + year.semester)
					try {
						agent.add("These are the degrees that we have.");
						agent.add(faculty.degrees);
					} catch (error) {
						agent.add('Please enter a valid answer!');
					}
				})
		}

		async function degreesWithFaculty(agent){
			await Degree.findOne(
				{
					faculty: agent.parameters.askedDegree,
				},
				function (err, faculty) {
					//console.log(year.year + ' and ' + year.semester)
					try {
						agent.add(faculty.degrees);
					} catch (error) {
						agent.add('Please enter a valid answer!');
					}
				})
		}

		let intentMap = new Map();

		intentMap.set("Default Fallback Intent", fallback);
		intentMap.set("snoopy", snoopy);
		intentMap.set("learn courses", learn);
		//fulfillment configuration about exam results
		intentMap.set("ExamResultsNoDetails", examResults);
		intentMap.set("ExamResultsWithYear", examResultsByYear);
		intentMap.set("ExamResultsWithYearAndSemester", examResultsByYearAndSemester);
		//fulfillment configuration about degrees
		intentMap.set("DegreesOfAllFaculties", degrees);
		intentMap.set("AskForDegreesWithFaculty", degreesWithFaculty);


		agent.handleRequest(intentMap);
	});
};
