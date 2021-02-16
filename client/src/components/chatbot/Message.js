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
								className="btn-floating btn-large waves-effect waves-light blue"
								style={{ color: "white", zIndex:1 }}
							>
								{props.speaks}
							</a>
						</div>
						<div
							className="col left"
							style={{
								marginTop: '19px',
								marginRight: 10,
								backgroundColor: "darkblue",
								padding: 5,
								borderTopRightRadius: 10,
								borderBottomRightRadius: 10,
								borderTopLeftRadius: 0,
								borderBottomLeftRadius: 10,
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
								marginTop: '20px',
								marginLeft: 10,
								textAlign: "right",
								padding: 5,
								backgroundColor: "darkblue",
								borderTopRightRadius: 0,
								borderBottomRightRadius: 10,
								borderTopLeftRadius: 10,
								borderBottomLeftRadius: 10,
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
