import React, { Component } from "react";
import QuickReply from "./QuickReply";

class QuickReplies extends Component {
	constructor(props) {
		super(props);
		this._handleClick = this._handleClick.bind(this);
	}

	_handleClick(event, payload, text) {
		this.props.replyClick(event, payload, text);
	}

	renderQuickReply(reply, i){
		return <QuickReply key={i} click={this._handleClick} reply={reply} />;
	}

	renderQuickReplies(quickReplies) {
		if (quickReplies) {
			return quickReplies.map((reply, i) => {
				return this.renderQuickReply(reply, i);
			});
		} else{
			return null;
		}
	}

	render() {
		return (
			<div className="col s12 m8 offset-m2 16 offset-13">
				<div className="">
					<div className="row" style={{marginTop:10}}>
						<div className="col s2 left">
							<a className="btn-floating btn-large waves-effect waves-light blue" style={{marginLeft:11}}>
								{this.props.speaks}
							</a>
						</div>
						{/*quick replies button into one line*/}
						<div id="quick-replies"
							className="col left"
							style={{
								marginTop:'19px',
								marginLeft:"23px",
								backgroundColor: "darkblue",
								padding: 5,
								borderTopRightRadius: 10,
								borderBottomRightRadius: 10,
								borderTopLeftRadius: 0,
								borderBottomLeftRadius: 10,
								textAlign: "left",
								maxWidth: "75%",
							}}>
							{this.props.text && <p style={{color:'white'}}>{this.props.text.stringValue}</p>}
							{this.renderQuickReplies(this.props.payload)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default QuickReplies;
