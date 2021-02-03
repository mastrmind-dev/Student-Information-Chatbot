import React from "react";

const Card = (props) => {
	return (
		<div style={{ width: 270, paddingRight: 30 }}>
			<div className="card ">
				<div className="card-image" style={{width:240}}>
					<img src={props.payload.fields.image.stringValue} alt={props.payload.fields.header.stringValue} />
					<span className="card-title">{props.payload.fields.header.stringValue}</span>
				</div>
				<div className="card-content">
					{props.payload.fields.description.stringValue}
                    <p><a>{props.payload.fields.price.stringValue}</a></p>
				</div>
				<div className="card-action">
					<a target="_blank" rel="noopener noreferrer" href={props.payload.fields.link.stringValue}>Get Now</a>
				</div>
			</div>
		</div>
	);
};

export default Card;