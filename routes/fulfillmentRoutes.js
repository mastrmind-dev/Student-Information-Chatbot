const { WebhookClient } = require("dialogflow-fulfillment");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

var nodemailer = require("nodemailer");

app.use(bodyParser.json());

const mongoose = require("mongoose");
const Demand = mongoose.model("demand");
const Coupon = mongoose.model("coupon");
const Result = mongoose.model("result");
const Degree = mongoose.model("degree");
const Sport = mongoose.model("sport");
const Faculty = mongoose.model("faculty");
const Payment = mongoose.model("payment");
const Student = mongoose.model("student");

module.exports = (app) => {
	var indexNo,
		nameOfTheStudent,
		facultyOfTheStudent,
		degreeOfTheStudent,
		yearOfTheStudent;

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

		sliceString = (stringToSlice, numberOfSlicedCharacters) => {
			let str = stringToSlice;
			let newStr = str.slice(0, str.length - numberOfSlicedCharacters);
			return newStr;
		};

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
							agent.add(year.results);
						} else if (year.year === 1 && year.semester === 2) {
							let output = `Here your ${year.year}st year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results);
						} else if (year.year === 2 && year.semester === 1) {
							let output = `Here your ${year.year}nd year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results);
						} else if (year.year === 2 && year.semester === 2) {
							let output = `Here your ${year.year}nd year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results);
						} else if (year.year === 3 && year.semester === 1) {
							let output = `Here your ${year.year}rd year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results);
						} else if (year.year === 3 && year.semester === 2) {
							let output = `Here your ${year.year}rd year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results);
						} else if (year.year === 4 && year.semester === 1) {
							let output = `Here your ${year.year}th year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results);
						} else if (year.year === 4 && year.semester === 2) {
							let output = `Here your ${year.year}th year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results);
						} else {
							agent.add("Invalid year or semester in try block!");
						}
					} catch (error) {
						if (indexNo === "a@a.lk") {
							agent.add("Please sign in as a student to know your results!");
						} else if (
							agent.parameters.year <= 4 &&
							agent.parameters.semester <= 2
						) {
							agent.add(
								"You haven't completed that exam yet or the results are not yet released!"
							);
						} else {
							agent.add("Invalid year or semester!");
							console.log(`>>>>>>>> ${error}`);
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
					indexNo: indexNo,
				},
				function (err, year) {
					try {
						if (year.year === 1 && year.semester === 1) {
							let output = `Here your ${year.year}st year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results);
						} else if (year.year === 1 && year.semester === 2) {
							let output = `Here your ${year.year}st year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results);
						} else if (year.year === 2 && year.semester === 1) {
							let output = `Here your ${year.year}nd year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results);
						} else if (year.year === 2 && year.semester === 2) {
							let output = `Here your ${year.year}nd year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results);
						} else if (year.year === 3 && year.semester === 1) {
							let output = `Here your ${year.year}rd year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results);
						} else if (year.year === 3 && year.semester === 2) {
							let output = `Here your ${year.year}rd year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results);
						} else if (year.year === 4 && year.semester === 1) {
							let output = `Here your ${year.year}th year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results);
						} else if (year.year === 4 && year.semester === 2) {
							let output = `Here your ${year.year}th year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results);
						} else {
							agent.add("Invalid year or semester in try block!");
						}
					} catch (error) {
						if (indexNo === "a@a.lk") {
							agent.add("Please sign in as a student to know your results!");
						} else if (
							agent.parameters.year <= 4 &&
							agent.parameters.semester <= 2
						) {
							agent.add(
								"You haven't completed that exam yet or the results are not yet released!"
							);
						} else {
							agent.add("Invalid year or semester!");
						}
					}
				}
			);
		}

		async function examResultsByYearAndSemester(agent) {
			await Result.findOne(
				{
					year: agent.parameters.year,
					semester: agent.parameters.semester,
					indexNo: indexNo,
				},
				function (err, year) {
					//console.log(year.year + ' and ' + year.semester)
					try {
						if (year.year === 1 && year.semester === 1) {
							let output = `Here your ${year.year}st year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results);
						} else if (year.year === 1 && year.semester === 2) {
							let output = `Here your ${year.year}st year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results);
						} else if (year.year === 2 && year.semester === 1) {
							let output = `Here your ${year.year}nd year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results);
						} else if (year.year === 2 && year.semester === 2) {
							let output = `Here your ${year.year}nd year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results);
						} else if (year.year === 3 && year.semester === 1) {
							let output = `Here your ${year.year}rd year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results);
						} else if (year.year === 3 && year.semester === 2) {
							let output = `Here your ${year.year}rd year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results);
						} else if (year.year === 4 && year.semester === 1) {
							let output = `Here your ${year.year}th year ${year.semester}st semester results`;
							agent.add(output);
							agent.add(year.results);
						} else if (year.year === 4 && year.semester === 2) {
							let output = `Here your ${year.year}th year ${year.semester}nd semester results`;
							agent.add(output);
							agent.add(year.results);
						} else {
							agent.add("Invalid year or semester in try block!");
						}
					} catch (error) {
						if (indexNo === "a@a.lk") {
							agent.add("Please sign in as a student to know your results!");
						} else if (
							agent.parameters.year <= 4 &&
							agent.parameters.semester <= 2
						) {
							agent.add(
								"You haven't completed that exam yet or the results are not yet released!"
							);
						} else {
							agent.add("Invalid year or semester!");
						}
					}
				}
			);
		}

		async function degrees(agent) {
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
						console.log("Error in degrees!");
					}
				}
			);
		}

		async function degreesWithFaculty(agent) {
			await Degree.findOne(
				{
					faculty: agent.parameters.askedDegree,
				},
				function (err, faculty) {
					console.log(agent.parameters.askedDegree);
					try {
						agent.add(faculty.degrees);
					} catch (error) {
						console.log(
							agent.parameters.askedDegree +
								"          Error in degreeswithfaculty!"
						);
					}
				}
			);
		}

		async function sports(agent) {
			await Sport.findOne(
				{
					sports: "all",
				},
				function (err, sports) {
					//console.log(year.year + ' and ' + year.semester)
					try {
						agent.add(
							`We have ${sports.totalSports} sports for yet and willing to increase the number`
						);
						agent.add(
							`Also there is an annual INTRA UNIVERSITY GAMES FESTIVAL.`
						);
						agent.add(sports.sportsNames);
					} catch (error) {
						console.log("Error in sport!");
					}
				}
			);
		}

		async function facultyDetailsForEachFaculty(agent) {
			console.log(agent.parameters.faculty);
			await Faculty.findOne(
				{ faculty: agent.parameters.faculty },
				function (err, faculty) {
					console.log(faculty);
					try {
						agent.add(faculty.details);
					} catch (error) {
						console.log("error in facultyDetails function");
					}
				}
			);
		}

		async function payments(agent) {
			await Payment.findOne(
				{ index_number: sliceString(indexNo, 5) },
				function (err, index_number) {
					console.log(index_number)
					try {
						agent.add("Here is your payment statement.");
						agent.add(index_number.payment_details);
					} catch (error) {
						console.log(``);
						console.log(`An error occrured!`);
						console.log(`>>>>>>>> ${error}`);
						console.log(``);
					}
				}
			);
		}

		async function studentDetails() {
			console.log("executing studentDetails function...");
			if (!(indexNo === null || indexNo === "a@a.lk")) {
				await Student.findOne(
					{ index_number: sliceString(indexNo, 5) },
					function (err, index_number) {
						try {
							nameOfTheStudent = index_number.name;
							facultyOfTheStudent = index_number.faculty;
							degreeOfTheStudent = index_number.degree;
							yearOfTheStudent = index_number.year;

							console.log("Successfully executed studentDetails function...");
							console.log(``);
							console.log("Results-:");
							console.log(`>>>>>>>> name: ${nameOfTheStudent}`);
							console.log(`>>>>>>>> faculty: ${facultyOfTheStudent}`);
							console.log(`>>>>>>>> degree: ${degreeOfTheStudent}`);
							console.log(`>>>>>>>> year: ${yearOfTheStudent}`);
						} catch (error) {
							console.log(`An error occured...`);
							console.log(`>>>>>>>> ${error}`);
							console.log(``);
							console.log(`Results-:`);
							console.log(`>>>>>>>> name: ${nameOfTheStudent}`);
							console.log(`>>>>>>>> faculty: ${facultyOfTheStudent}`);
							console.log(`>>>>>>>> degree: ${degreeOfTheStudent}`);
							console.log(`>>>>>>>> year: ${yearOfTheStudent}`);
							console.log(``);
						}
					}
				);
			}
		}

		async function sendEmails(agent) {
			await studentDetails();
			console.log(``);
			try {
				console.log(`Meeting with ${agent.parameters.person[0].name}`);
				if (agent.parameters.person[0].name === null) {
					agent.add("Ask again mentioning whom you want to meet");
				} else if (agent.parameters.person[0].name === "chancellor") {
					console.log(`chancellor else if block is being executed...`);
					var transporter = nodemailer.createTransport({
						service: "gmail",
						auth: {
							user: "studentinformationbot@gmail.com",
							pass: "fuckearth",
						},
					});

					var mailOptions = {
						from: "studentinformationbot@gmail.com",
						to: "chancellor.v@yahoo.com",
						subject: "Request an appointment with Vice Chancellor",
						html: `<h2>Name </h2><p>${nameOfTheStudent}</p><br>
						<h2>Faculty </h2><p>${facultyOfTheStudent}</p><br>
						<h2>Degree </h2><p>${degreeOfTheStudent}</p><br>
						<h2>Year </h2><p>${yearOfTheStudent}</p><br>
						<h2>Reason for the appointment </h2><p style="text-transform:capitalize;">${
							agent.parameters.reason
						}</p><br>
						<h2>Requested date period </h2><p>From ${sliceString(
							agent.parameters.week.startDate,
							15
						)} To ${sliceString(agent.parameters.week.endDate, 15)}</p>`,
					};

					transporter.sendMail(mailOptions, function (error, info) {
						if (error) {
							console.log(error);
						} else {
							console.log("Email sent: " + info.response);
						}
					});
				} else if (
					agent.parameters.person[0].name === "dean" &&
					agent.parameters.Faculty === "it"
				) {
					var transporter = nodemailer.createTransport({
						service: "gmail",
						auth: {
							user: "studentinformationbot@gmail.com",
							pass: "fuckearth",
						},
					});

					var mailOptions = {
						from: "studentinformationbot@gmail.com",
						to: "dean.it@yahoo.com",
						subject: "Request an appointment with Dean of faculty of IT",
						html: `<h2>Name </h2><p>${nameOfTheStudent}</p><br>
						<h2>Faculty </h2><p>${facultyOfTheStudent}</p><br>
						<h2>Degree </h2><p>${degreeOfTheStudent}</p><br>
						<h2>Year </h2><p>${yearOfTheStudent}</p><br>
						<h2>Reason for the appointment </h2><p style="text-transform:capitalize;">${
							agent.parameters.reason
						}</p><br>
						<h2>Requested date period </h2><p>From ${sliceString(
							agent.parameters.week.startDate,
							15
						)} To ${sliceString(agent.parameters.week.endDate, 15)}</p>`,
					};

					transporter.sendMail(mailOptions, function (error, info) {
						if (error) {
							console.log(error);
						} else {
							console.log("Email sent: " + info.response);
						}
					});
				} else if (
					agent.parameters.person[0].name === "dean" &&
					agent.parameters.Faculty === "engineering"
				) {
					var transporter = nodemailer.createTransport({
						service: "gmail",
						auth: {
							user: "studentinformationbot@gmail.com",
							pass: "fuckearth",
						},
					});

					var mailOptions = {
						from: "studentinformationbot@gmail.com",
						to: "dean.engineer@yahoo.com",
						subject:
							"Request an appointment with Dean of faculty of engineering",
						html: `<h2>Name </h2><p>${nameOfTheStudent}</p><br>
						<h2>Faculty </h2><p>${facultyOfTheStudent}</p><br>
						<h2>Degree </h2><p>${degreeOfTheStudent}</p><br>
						<h2>Year </h2><p>${yearOfTheStudent}</p><br>
						<h2>Reason for the appointment </h2><p style="text-transform:capitalize;">${agent.parameters.reason}</p><br>
						<h2>Requested date period </h2><p>From ${agent.parameters.week.startDate} To ${agent.parameters.week.endDate}</p>`,
					};

					transporter.sendMail(mailOptions, function (error, info) {
						if (error) {
							console.log(error);
						} else {
							console.log("Email sent: " + info.response);
						}
					});
				} else if (
					agent.parameters.person[0].name === "dean" &&
					agent.parameters.Faculty === "it"
				) {
					var transporter = nodemailer.createTransport({
						service: "gmail",
						auth: {
							user: "studentinformationbot@gmail.com",
							pass: "fuckearth",
						},
					});

					var mailOptions = {
						from: "studentinformationbot@gmail.com",
						to: "dean.it@yahoo.com",
						subject: "Request an appointment with Dean of faculty of IT",
						html: `<h2>Name </h2><p>${nameOfTheStudent}</p><br>
						<h2>Faculty </h2><p>${facultyOfTheStudent}</p><br>
						<h2>Degree </h2><p>${degreeOfTheStudent}</p><br>
						<h2>Year </h2><p>${yearOfTheStudent}</p><br>
						<h2>Reason for the appointment </h2><p style="text-transform:capitalize;">${
							agent.parameters.reason
						}</p><br>
						<h2>Requested date period </h2><p>From ${sliceString(
							agent.parameters.week.startDate,
							15
						)} To ${sliceString(agent.parameters.week.endDate, 15)}</p>`,
					};

					transporter.sendMail(mailOptions, function (error, info) {
						if (error) {
							console.log(error);
						} else {
							console.log("Email sent: " + info.response);
						}
					});
				} else if (
					agent.parameters.person[0].name === "dean" &&
					agent.parameters.Faculty === "art"
				) {
					var transporter = nodemailer.createTransport({
						service: "gmail",
						auth: {
							user: "studentinformationbot@gmail.com",
							pass: "fuckearth",
						},
					});

					var mailOptions = {
						from: "studentinformationbot@gmail.com",
						to: "deanart.art@yahoo.com",
						subject: "Request an appointment with Dean of faculty of art",
						html: `<h2>Name </h2><p>${nameOfTheStudent}</p><br>
						<h2>Faculty </h2><p>${facultyOfTheStudent}</p><br>
						<h2>Degree </h2><p>${degreeOfTheStudent}</p><br>
						<h2>Year </h2><p>${yearOfTheStudent}</p><br>
						<h2>Reason for the appointment </h2><p style="text-transform:capitalize;">${
							agent.parameters.reason
						}</p><br>
						<h2>Requested date period </h2><p>From ${sliceString(
							agent.parameters.week.startDate,
							15
						)} To ${sliceString(agent.parameters.week.endDate, 15)}</p>`,
					};

					transporter.sendMail(mailOptions, function (error, info) {
						if (error) {
							console.log(error);
						} else {
							console.log("Email sent: " + info.response);
						}
					});
				}
			} catch (error) {
				console.log(`an error occured!`);
				console.log(`>>>>>>> ${error}`);
			}
		}

		let intentMap = new Map();

		intentMap.set("Default Fallback Intent", fallback);
		intentMap.set("snoopy", snoopy);
		intentMap.set("learn courses", learn);
		//fulfillment configuration for exam results
		intentMap.set("ExamResultsNoDetails", examResults);
		intentMap.set("ExamResultsWithYear", examResultsByYear);
		intentMap.set(
			"ExamResultsWithYearAndSemester",
			examResultsByYearAndSemester
		);
		//fulfillment configuration for degrees
		intentMap.set("DegreesOfAllFaculties", degrees);
		intentMap.set("AskForDegreesWithFaculty", degreesWithFaculty);
		//fulfillment configuration for sports
		intentMap.set("Sports", sports);
		//fulfillment configuration for faculty details
		intentMap.set("EachFacultyDetails", facultyDetailsForEachFaculty);
		//fulfillment configuration for sending emails
		intentMap.set("SendEmailsForAppointment", sendEmails);
		//fulfillment configuration for payments
		intentMap.set("payments", payments);

		agent.handleRequest(intentMap);
	});
};
