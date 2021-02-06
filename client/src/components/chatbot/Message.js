import React from "react";

const Message = (props) => {
	return (
		<div className="white">
			<div className="" style={{marginTop:10}}>
				<div className="row valign-wrapper">
					{props.speaks === "chaty" && (
						<div className="col s2">
							<a
								href="/"
								className="btn-floating btn-large waves-effect waves-light yellow"
								style={{color:"white"}}
							>
								{props.speaks}
							</a>
						</div>
					)}
					{props.speaks === "chaty" ? (
						<div className="col s10" style={{marginRight:10, backgroundColor:"darkblue", padding:5, borderRadius:10, textAlign: "left", marginLeft:15 }}>
							<span className="white-text">{props.text}</span>
						</div>
					) : (
						<div className="col s10 center" style={{marginLeft:'10px', textAlign: "right", padding:5, backgroundColor:"darkblue", borderRadius:10}}>
							<span className="white-text">{props.text}</span>
						</div>
					)}

					{props.speaks === "user" && (
						<div className="col s2" style={{marginRight:18}}>
							<a
								href="/"
								className="btn-floating btn-large waves-effect waves-light"
								style={{backgroundColor:'#5ecc0a'}}
							>
								{props.speaks}
							</a>
						</div>
					)}
				</div>
			</div>
		</div>	
	);
};

export default Message;
