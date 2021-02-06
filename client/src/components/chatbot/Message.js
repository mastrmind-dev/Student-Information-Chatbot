import React from "react";

const Message = (props) => {
	return (
		<div className="chatbox" style={{ marginTop: 10 }}>
			<div>
				{props.speaks === "chaty" && (
					<div className="row valign-wrapper">
						<div className="col s2">
							<a
								href="/"
								className="btn-floating btn-large waves-effect waves-light yellow"
								style={{ color: "white" }}
							>
								{props.speaks}
							</a>
						</div>
						<div
							className="col s10"
							style={{
								marginRight: 10,
								backgroundColor: "darkblue",
								padding: 5,
								borderRadius: 10,
								textAlign: "left",
								marginLeft: 15,
							}}
						>
							<span className="white-text">{props.text}</span>
						</div>
					</div>
				)}
			</div>
			<div>
				{props.speaks === "user" && (
					<div className="row valign-wrapper">
						<div
							className="col s10"
							style={{
								marginLeft:10,
								textAlign: "right",
								padding: 5,
								backgroundColor: "darkblue",
								borderRadius: 10,
							}}
						>
							<span className="white-text">{props.text}</span>
						</div>
						<div className="col s2" style={{ marginRight: 18 }}>
							<a
								href="/"
								className="btn-floating btn-large waves-effect waves-light"
								style={{ backgroundColor: "#5ecc0a" }}
							>
								{props.speaks}
							</a>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Message;
