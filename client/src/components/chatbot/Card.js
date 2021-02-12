import React from "react";

const Card = (props) => {
	return (
		<div style={{ width: 270, padding:20 }}>
			<div className="card" style={{margin:0}}>
				<div className="card-image" style={{width:200, height: 150, overflow:"hidden"}}>
					<img src={props.payload.fields.image.stringValue} alt={props.payload.fields.header.stringValue} />
					{/**<span className="card-title" style={{color:'darkorange'}}></span>*/}
				</div>
				<div className="card-content" style={{width:200, height: 120, overflow:"hidden", padding:10}}>
					{props.payload.fields.description.stringValue}
                    <p><a>{props.payload.fields.price.stringValue}</a></p>
					<p style={{color:'blue', marginLeft:'20px', fontStyle:'italic'}}>{props.payload.fields.header.stringValue}</p>
				</div>
				<div className="card-action">
					<a target="_blank" rel="noopener noreferrer" href={props.payload.fields.link.stringValue}>See Him</a>
				</div>
			</div>
		</div>
	);
};

export default Card;