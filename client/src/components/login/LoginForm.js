import React, { useState, useEffect } from "react";
import fire from "./fire";
import FireBaseLogin from "./FireBaseLogin";
import "./LoginForm.css";
import axios from "axios/index";

const Login = (props) => {
	const [user, setUser] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [hasAccount] = useState(false);

	const test = (indexNo) => {
		console.log("Test is executed!");
		axios.post("/api/indexNo", {
			indexNo: indexNo,
		});
	};

	const clearInputs = () => {
		setEmail("");
		setPassword("");
	};

	const clearErrors = () => {
		setEmailError("");
		setPasswordError("");
	};

	const handleLogin = () => {
		clearErrors();
		fire
			.auth()
			.signInWithEmailAndPassword(email + "@a.lk", password)
			.catch((err) => {
				switch (err.code) {
					case "auth/invalid-email":
					case "auth/user-disabled":
					case "auth/user-not-found":
						setEmailError("Invalid Username!");
						break;
					case "auth/wrong-password":
						setPasswordError("Incorrect Password!");
						break;
				}
			});
	};
	//To sign up new users
	/**const handleSignup = () => {
		clearErrors();
		fire
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.catch((err) => {
				switch (err.code) {
					case "auth/email-already-in-use":
					case "auth/invalid-email":
						setEmailError(err.message);
						break;
					case "auth/weak-password":
						setPasswordError(err.message);
						break;
				}
			});
	}; */

	const guestSignIn = () => {
		clearErrors();
		fire
			.auth()
			.signInWithEmailAndPassword("a@a.lk", "084348")
			.catch((err) => {
				switch (err.code) {
					case "auth/invalid-email":
					case "auth/user-disabled":
					case "auth/user-not-found":
						setEmailError(err.message);
						break;
					case "auth/wrong-password":
						setPasswordError(err.message);
						break;
				}
			});
	};

	const handleLogOut = () => {
		fire.auth().signOut();
	};

	const authListener = () => {
		fire.auth().onAuthStateChanged((user) => {
			if (user) {
				clearInputs();
				setUser(user);
			} else {
				setUser("");
			}
		});
	};

	useEffect(() => {
		authListener();
	});

	return (
		<div>
			<div className="Login">
				{user ? (
					(props.isThereUser(true),
					props.userEmail(user.email),
					console.log(user.email),
					test(user.email))
				) : (
					<FireBaseLogin
						email={email}
						setEmail={setEmail}
						password={password}
						setPassword={setPassword}
						handleLogin={handleLogin}
						//handleSignup={handleSignup}
						hasAccount={hasAccount}
						//						setHasAccount={setHasAccount}
						guestSignIn={guestSignIn}
						emailError={emailError}
						passwordError={passwordError}
					/>
				)}
			</div>
			<div className="logout">
				{props.logout === true
					? handleLogOut()
					: console.log("logout not executed")}
			</div>
		</div>
	);
};

export default Login;
