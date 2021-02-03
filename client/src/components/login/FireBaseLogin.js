import React from "react";

const FireBaseLogin = (props) => {
	return (
		<section className="login">
			<div className="loginContainer">
				<label>Username</label>
				<input
					type="text"
					autoFocus
					required
					value={props.email}
					onChange={(e) => props.setEmail(e.target.value)}
				/>
				<p className="errorMessage">{props.emailError}</p>

				<label>Password</label>
				<input
					type="password"
					required
					value={props.password}
					onChange={(e) => props.setPassword(e.target.value)}
				/>
				<p className="errorMessage">{props.passwordError}</p>
				<div className="btnContainer">
					{props.hasAccount ? (
						<></>
					) : (
						<>
							<button onClick={props.handleLogin}>Sign In</button>
							<p>
								Sign in as a guest user ?{" "}
								<span onClick={() => props.guestSignIn(!props.hasAccount)}>
									Guest
								</span>
							</p>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default FireBaseLogin;
