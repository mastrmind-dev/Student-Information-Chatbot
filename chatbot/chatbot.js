"use strict";

const dialogflow = require("@google-cloud/dialogflow");
const config = require("../config/keys");
const structjson = require("./structJson");
const mongoose = require("mongoose");

const projectID = config.googleProjectID;

const credentials = {
	client_email: config.googleClientEmail,
	private_key: config.googlePrivateKey,
};

const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });
const Registration = mongoose.model("collection1");

module.exports = {	
	textQuery: async function (text, userID, parameters = {}) {
		const sessionPath = sessionClient.projectAgentSessionPath(
			config.googleProjectID,
			config.dialogFlowSessionID + userID
		);
		let self = module.exports;
		const request = {
			session: sessionPath,
			queryInput: {
				text: {
					// The query to send to the dialogflow agent
					text: text,
					// The language used by the client (en-US)
					languageCode: config.dialogFlowSessionLanguageCode,
				},
			},

			queryParams: {
				payLoad: {
					data: parameters,
				},
			},
		};

		let responses = await sessionClient.detectIntent(request);
		responses = await self.handleAction(responses);
		return responses;
	},

	eventQuery: async function (event, userID, parameters = {}) {
		let self = module.exports;
		const sessionPath = sessionClient.projectAgentSessionPath(
			config.googleProjectID,
			config.dialogFlowSessionID + userID
		);
		const request = {
			session: sessionPath,
			queryInput: {
				event: {
					// The query to send to the dialogflow agent
					name: event,
					parameters: structjson.jsonToStructProto(parameters),
					// The language used by the client (en-US)
					languageCode: config.dialogFlowSessionLanguageCode,
				},
			},
		};

		let responses = await sessionClient.detectIntent(request);
		responses = await self.handleAction(responses);
		return responses;
	},

	handleAction: function (responses) {
		let self = module.exports;
		let queryResult = responses[0].queryResult;

		switch (queryResult.action) {
			case "recommendedcourses-yes":
				if (queryResult.allRequiredParamsPresent) {
					self.saveRegistration(queryResult.parameters.fields);
				}
				break;
		}

		return responses;
	},

	saveRegistration: async function (fields) {
		const collection1 = new Registration({
			name: fields.name.stringValue,
			address: fields.address.stringValue,
			phone: fields.phone.stringValue,
			email: fields.email.stringValue,
			dateSent: Date.now(),
		});
		try {
			let reg = await collection1.save();
			console.log(reg);
		} catch (err) {
			console.log(err);
		}
	},
};
