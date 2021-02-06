import React from "react";

const Message = (props) => {
	return (
		<div className="chatbox" style={{ marginTop: 10 }}>
			<div>
				{props.speaks === "chaty" && (
					<div className="row">
						<div className="col s2 left">
							<a
								href="/"
								className="btn-floating btn-large waves-effect waves-light yellow"
								style={{ color: "white" }}
							>
								{props.speaks}
							</a>
						</div>
						<div
							className="col left"
							style={{
								marginRight: 10,
								backgroundColor: "darkblue",
								padding: 5,
								borderRadius: 10,
								textAlign: "left",
								marginLeft: 15,
								maxWidth: "75%",
							}}
						>
							<span className="white-text">{props.text}</span>
						</div>
					</div>
				)}
			</div>
			<div>
				{props.speaks === "user" && (
					<div className="row">
						<div className="col s2 right" style={{ marginRight: 18 }}>
							<a
								href="/"
								className="btn-floating btn-large waves-effect waves-light"
								style={{ backgroundColor: "#5ecc0a" }}
							>
								{props.speaks}
							</a>
						</div>
						<div
							className="col right"
							style={{
								marginLeft: 10,
								textAlign: "right",
								padding: 5,
								backgroundColor: "darkblue",
								borderRadius: 10,
								maxWidth: "75%",
							}}
						>
							<span className="white-text">{props.text}</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Message;
