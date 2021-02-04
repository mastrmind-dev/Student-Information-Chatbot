import React, { Component } from "react";
import axios from "axios/index";
import Cookies from "universal-cookie";
import { v4 as uuid } from "uuid";
import { withRouter } from "react-router-dom";
import IdleTimer from "react-idle-timer";

import Card from "./Card";
import Message from "./Message";
import QuickReplies from "./QuickReplies";
import Login from "../login/LoginForm";
import IdleTimeOutModal from "../autoLogout/IdleModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose, faComments } from "@fortawesome/free-solid-svg-icons";

const cookies = new Cookies();

class Chatbot extends Component {
	messageEnd;
	constructor(props) {
		super(props);

		this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
		this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);
		this.refreshPage = this.refreshPage.bind(this)

		this.idleTimer = null;
		this.handleOnAction = this.handleOnAction.bind(this);
		this.handleOnActive = this.handleOnActive.bind(this);
		this.handleOnIdle = this.handleOnIdle.bind(this);

		this.state = {
			messages: [],
			showBot: false,
			shopWelcomeSent: false,
			isLogin: false,
			clickLogoutButton: false,
			userEmail: "",
			idle: false,
			showModal: false,
		};

		var timer;

		if (cookies.get("userID") === undefined) {
			cookies.set("userID", this.state.userEmail, { path: "/" });
		}
		console.log(cookies.get("userID"));
	}

	async df_text_query(queryText) {
		let says = {
			speaks: "user",
			msg: {
				text: {
					text: queryText,
				},
			},
		};
		this.setState({ messages: [...this.state.messages, says] });
		try {
			const res = await axios.post("/api/df_text_query", {
				text: queryText,
				userId: cookies.get("userID"),
			});
			console.log(this.state.userEmail);
			for (let msg of res.data.fulfillmentMessages) {
				says = {
					speaks: "chaty",
					msg: msg,
				};
				this.setState({ messages: [...this.state.messages, says] });
			}
		} catch (e) {
			says = {
				speaks: "chaty",
				msg: {
					text: {
						text:
							"I'm having a problme. Need to terminate now. Will be back later.",
					},
				},
			};
			this.setState({ messages: [...this.state.messages, says] });
			setTimeout(() => {
				this.setState({ showBot: false });
			}, 2000);
		}
	}

	async df_event_query(eventName) {
		const res = await axios.post("/api/df_event_query", {
			event: eventName,
			userId: cookies.get("userID"),
		});

		for (let msg of res.data.fulfillmentMessages) {
			let says = {
				speaks: "chaty",
				msg: msg,
			};

			this.setState({ messages: [...this.state.messages, says] });
		}
	}

	async componentDidMount() {
		this.logoutWhenClosing();
		this.df_event_query("Welcome");
		if (window.location.pathname === "/shop" && !this.state.shopWelcomeSent) {
			await this.resolveAfterXSeconds(2);
			this.df_event_query("WELCOME_SHOP");
			this.setState({ shopWelcomeSent: true });
		}
		this.props.history.listen(() => {
			console.log("Listening");
			if (
				this.props.history.location.pathname === "/shop" &&
				!this.state.shopWelcomeSent
			) {
				this.df_event_query("WELCOME_SHOP");
				this.setState({ shopWelcomeSent: true });
			}
		});
	}

	resolveAfterXSeconds(x) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(x);
			}, x * 1000);
		});
	}

	componentDidUpdate() {
		if (this.state.isLogin) {
			this.messageEnd.scrollIntoView({ behavior: "smooth" });
		}
	}

	Show = (event) => {
		event.preventDefault();
		event.stopPropagation();
		this.setState({ showBot: true });
	};

	Hide = (event) => {
		event.preventDefault();
		event.stopPropagation();
		this.setState({ showBot: false });
	};

	_handleQuickReplyPayload(event, payload, text) {
		event.preventDefault();
		event.stopPropagation();

		switch (payload) {
			case "recommend_yes":
				this.df_event_query("SHOW_RECOMMENDATIONS");
				break;
			case "training_masterclass":
				this.df_event_query("MASTERCLASS");
				break;
			default:
				this.df_text_query(text);
				break;
		}
	}

	renderCards(cards) {
		return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
	}

	renderOneMessage(message, i) {
		if (message.msg && message.msg.text && message.msg.text.text) {
			return (
				<Message key={i} speaks={message.speaks} text={message.msg.text.text} />
			);
		} else if (
			message.msg &&
			message.msg.payload &&
			message.msg.payload.fields &&
			message.msg.payload.fields.cards
		) {
			return (
				<div key={i}>
					<div className="card-panel grey lighten-5 z-depth-1 valign-wrapper">
						<div style={{ overflow: "hidden" }}>
							<div className="col s2">
								<a
									href="/"
									className="btn-floating btn-large waves-effect waves-light lightblue"
								>
									{message.speaks}
								</a>
							</div>
							<div
								style={{
									height: "auto",
									width: "auto",
									overflow: "auto",
								}}
								className="valign-wrapper"
							>
								{this.renderCards(
									message.msg.payload.fields.cards.listValue.values
								)}
							</div>
						</div>
					</div>
				</div>
			);
		} else if (
			message.msg &&
			message.msg.payload &&
			message.msg.payload.fields &&
			message.msg.payload.fields.quick_replies
		) {
			return (
				<QuickReplies
					text={
						message.msg.payload.fields.text
							? message.msg.payload.fields.text
							: null
					}
					key={i}
					replyClick={this._handleQuickReplyPayload}
					speaks={message.speaks}
					payload={message.msg.payload.fields.quick_replies.listValue.values}
				/>
			);
		}
	}

	renderMessages(returnedMessages) {
		if (returnedMessages) {
			return returnedMessages.map((message, i) => {
				return this.renderOneMessage(message, i);
			});
		} else {
			return null;
		}
	}

	_handleInputKeyPress(e) {
		if (e.key === "Enter") {
			this.df_text_query(e.target.value);
			e.target.value = "";
		}
	}

	myCallBack = (dataFromLogin) => {
		if (dataFromLogin) {
			this.setState({ isLogin: dataFromLogin });
		}
	};

	resetLogout = () => {
		this.setState({ clickLogoutButton: false });
	};

	userNameCallBack = (userEmailFromChild) => {
		console.log(userEmailFromChild);
		this.setState({ userEmail: userEmailFromChild });
	};

	async refreshPage() {
		await this.setState({
			clickLogoutButton: true,
			isLogin: false,
		});
		window.location.reload(false);
	};

	handleOnAction(event) {
		console.log("ssomeee");
	}

	handleOnActive(event) {
		console.log("ssomeee");
	}

	handleOnIdle() {
		this.setState({ showModal: true });
		console.log("idel");
	}

	handleStay = (userWantsStay) => {
		this.setState({ showModal: userWantsStay });
	};

	handleLogout = (userWantsLogout) => {
		if (!userWantsLogout) {
			this.setState({ showModal: false });
			this.refreshPage();
		}
	};

	logoutWhenClosing() {
		//window.addEventListener("beforeunload", (ev) => {
		//	ev.preventDefault();
		//	this.refreshPage();
		//});
	}

	render() {
		if (this.state.showModal) {
			return (
				<div>
					<IdleTimeOutModal
						showModal={this.state.showModal}
						handleLogout={this.handleLogout}
						handleStay={this.handleStay}
					/>
					<div
						ref={(el) => {
							this.messageEnd = el;
						}}
						style={{ float: "left", clear: "both" }}
					></div>
				</div>
			);
		} else if (this.state.showBot && this.state.isLogin) {
			return (
				<div
					style={{
						backgroundColor: "whitesmoke",
						height: 500,
						borderTopLeftRadius: 0,
						borderTopRightRadius: 50,
						borderBottomLeftRadius: 50,
						borderBottomRightRadius: 0,
						width: 400,
						position: "fixed",
						bottom: 30,
						right: 15,
						border: "1px solid lightgrey",
					}}
					className="z-depth-3"
				>
					{this.logoutWhenClosing()}
					<IdleTimer
						ref={(ref) => {
							this.idleTimer = ref;
						}}
						timeout={10000000}
						onActive={this.handleOnActive}
						onIdle={this.handleOnIdle}
						onAction={this.handleOnAction}
						debounce={250}
					/>
					<nav style={{ borderTopLeftRadius: 0, borderTopRightRadius: 50, backgroundColor: '#2dbaed' }}>
						<div className="nav-wrapper">
							<a className="brand-logo" style={{ marginLeft: "3%", fontFamily:"fantasy" }}>
								Chaty
							</a>
							<ul id="nav-mobile" className="right hide-on-med-and-down">
								<li>
									<button
										style={{
											width: "200%",
											position: "relative",
											right: 70,
											border: "1px solid lightgrey",
											borderTopRightRadius: 13,
											borderBottomLeftRadius: 13,
											backgroundColor: "#6a52e3"
										}}
										onClick={this.refreshPage}
									>
										Logout
									</button>
								</li>
								<li>
									<a
										href="/"
										onClick={this.Hide}
										style={{ fontSize: 25, marginRight: 15 }}
									>
										<FontAwesomeIcon icon={faWindowClose} />
									</a>
								</li>
							</ul>
						</div>
					</nav>
					<div
						id="chatbot"
						style={{ height: 388, width: "100%", overflow: "auto" }}
					>
						{this.renderMessages(this.state.messages)}
						<div
							ref={(el) => {
								this.messageEnd = el;
							}}
							style={{ clear: "both" }}
						></div>
						<div
							className="col s12"
							style={{
								margin: 0,
								width: "100%",
								position: "absolute",
								bottom: "0",
								backgroundColor: "#603bbb",
								borderBottomLeftRadius: 50,
							}}
						>
							<input style={{color : "white", width : '95%', marginLeft : 20}}
								placeholder="type a message: "
								type="text"
								onKeyPress={this._handleInputKeyPress}
								autoFocus
							/>
						</div>
					</div>
				</div>
			);
		} else if (
			this.state.showBot &&
			this.state.isLogin == false &&
			this.state.clickLogoutButton == false
		) {
			return (
				<div
					style={{
						height: 500,
						borderTopLeftRadius: 0,
						borderTopRightRadius: 50,
						borderBottomLeftRadius: 50,
						borderBottomRightRadius: 0,
						width: 400,
						position: "fixed",
						bottom: 30,
						right: 15,
						border: "1px solid lightgrey",
					}}
					className="z-depth-3"
				>
					<nav style={{ borderTopLeftRadius: 0, borderTopRightRadius: 50, backgroundColor: '#2dbaed' }}>
						<div className="nav-wrapper">
							<a className="brand-logo" style={{ marginLeft: "3%", fontFamily:"fantasy" }}>
								Chaty
							</a>
							<ul id="nav-mobile" className="right hide-on-med-and-down">
								<li>
									<a
										href="/"
										onClick={this.Hide}
										style={{ fontSize: 25, marginRight: 15 }}
									>
										<FontAwesomeIcon icon={faWindowClose} />
									</a>
								</li>
							</ul>
						</div>
					</nav>
					<Login
						isThereUser={this.myCallBack}
						userEmail={this.userNameCallBack}
					/>
				</div>
			);
		} else if (this.state.clickLogoutButton) {
			return (
				<div>
					<Login logout={true} />
					{this.resetLogout()}
				</div>
			);
		} else {
			return (
				<div>
					<div
						style={{
							position: "fixed",
							bottom: 30,
							right: 50,
							color: "red",
						}}
					>
						<ul
							id="nav-mobile"
							className="right btn-floating btn-large waves-effect waves-light sky-blue z-depth-3"
						>
							<li>
								<a
									href="/"
									style={{ color: "white", fontSize: "25px" }}
									onClick={this.Show}
								>
									<FontAwesomeIcon icon={faComments} />
								</a>
							</li>
						</ul>
					</div>
					<div
						ref={(el) => {
							this.messageEnd = el;
						}}
						style={{ float: "left", clear: "both" }}
					></div>
				</div>
			);
		}
	}
}

export default withRouter(Chatbot);
