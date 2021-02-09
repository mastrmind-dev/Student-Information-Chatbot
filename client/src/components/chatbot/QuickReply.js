import React from "react";

const QuickReply = (props) => {
	if(props.reply.structValue.fields.payload){
        return (
            <a href="" className="waves-effect waves-light btn-small white-text" style={{background: "rgb(2,0,36)",
            background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(27,153,201,1) 83%, rgba(0,212,255,1) 100%)'}}
            onClick ={(event)=>
                props.click(
                    event,
                    props.reply.structValue.fields.payload.stringValue,
                    props.reply.structValue.fields.text.stringValue,
                    )
            }
            >
                {props.reply.structValue.fields.text.stringValue}
            </a>
        );
    } else{
        return (
            <a href={props.reply.structValue.fields.link.stringValue} target="_blank" className="waves-effect waves-light btn-small white-text" style={{background: "rgb(2,0,36)",
                background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(27,153,201,1) 83%, rgba(0,212,255,1) 100%)'}}>
                {props.reply.structValue.fields.text.stringValue}
            </a>
        );
    }
};

export default QuickReply;
